import { Arrendatario } from "../models/Arrendatario.js";
import { Propietario_Propiedad } from "../models/Contrato.js";
import { Propiedad } from "../models/Propiedad.js";
import { Propietario } from "../models/Propietario.js";

export const getRelaciones = async (req, res) => {
    try {

        const relaciones = await Propietario_Propiedad.findAll({
            include: [Propietario, Propiedad]
        });

        res.json(relaciones);

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

export const getRelacionById = async (req, res) => {
    try {
        const id = req.params.id;

        const relacion = await Propietario_Propiedad.findByPk(id)
        res.json(relacion);

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

export const asociarPropiedad = async (req, res) => {
    try {
        const { propiedadId, propietarioId } = req.body;
        
        const propietario = await Propietario.findByPk(propietarioId)
        if(!propietario){
            return res.json("No existe el id de propietario")
        }

        const propiedad = await Propiedad.findByPk(propiedadId)
        if(!propiedad){
            return res.json("No existe el id de propiedad")
        }

        const relacion = await Propietario_Propiedad.create({
            PropiedadId: propiedadId, PropietarioId: propietarioId
        })
        res.json(relacion)

    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

export const deleteRelacion = async(req, res) => {
    try {
        const id = req.params.id;

        const relacion = await Propietario_Propiedad.findByPk(id)
        if(!relacion){
            return res.json("No existe el id de la relacion");
        }
        
        res.json(relacion);
        await relacion.destroy();
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

export const updateRelacion = async (req, res) => {
    try {
        const { id, propiedadId, propietarioId } = req.body;

        const relacion = await Propietario_Propiedad.findByPk(id)
        const propiedad = await Propiedad.findByPk(propiedadId)
        const propietario = await Propietario.findByPk(propietarioId)
        

        if(!relacion){
            return res.json("No existe el id de relacion")
        }
        if (!propietario) {
            return res.json("No existe el id de propietario");
        }
        if (!propiedad) {
            return res.json("No existe el id de propiedad");
        }

        const relacionNew = await Propietario_Propiedad.upsert({
            id: id, PropiedadId: propiedadId, PropietarioId: propietarioId
        })

        res.json(relacionNew)

    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
import { Propietario } from "../models/Propietario.js";
import { Propiedad } from "../models/Propiedad.js";
import { Propietario_Propiedad } from "../models/Contrato.js";

export const getPropietarios = async (req, res) => {
    try {
        const propietarios = await Propietario.findAll({
            include: {
                model: Propiedad
            }
        });

        res.json(propietarios);

    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

export const getPropietarioById = async (req, res) => {
    try {
        //const id_Arrendatario = req.params.id_Arrendatario;
        const id = req.params.id;

        const propietario = await Propietario.findOne({
            where: {
                id: id
            },
        })
        res.json(propietario);

    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

export const insertPropietario = async(req, res) => {
    try {
        const {rfc, nombre, apellido} = req.body;

        const propietario = await Propietario.create({
            RFC: rfc, Nombre: nombre, Apellido: apellido
        })

        res.json(propietario)

    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

export const deletePropietario = async(req, res) => {
    try {
        const id = req.params.id;

        const propietario = await Propietario.findOne({
            where: {
                id: id
            }
        })
        if(!propietario){
            return res.json("No existe el id del propietario");
        }
        // Propietario_Propiedad.destroy({
        //     where: {
        //         PropietarioId: id
        //     }
        // })
        res.json(propietario);
        await propietario.destroy();
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

export const updatePropietario = async (req, res) => {
    try {
        const { id, rfc, nombre, apellido } = req.body;
        const propietario = await Propietario.findOne({
            where:{
                id: id
            }
        })

        if(!propietario){
            return res.json("No existe el id de propietario")
        }
        const propietarioNew = await Propietario.upsert({
            id: id, RFC: rfc, Nombre: nombre, Apellido: apellido
        })
        res.json(propietarioNew)

    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

export const asociarPropiedad = async (req, res) => {
    try {
        const { PropiedadId, PropietarioId } = req.body;
        
        const propietario = await Propietario.findByPk(PropietarioId)
        if(!propietario){
            return res.json("No existe el id de propietario")
        }

        const propiedad = await Propiedad.findByPk(PropiedadId)
        if(!propiedad){
            return res.json("No existe el id de propiedad")
        }

        const relacion = await Propietario_Propiedad.create({
            PropiedadId: PropiedadId, PropietarioId: PropietarioId
        })
        res.json(relacion)

    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
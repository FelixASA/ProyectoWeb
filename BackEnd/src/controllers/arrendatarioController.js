import { Arrendatario } from "../models/Arrendatario.js";
import { Propiedad } from "../models/Propiedad.js";

export const getArrendatarios = async (req, res) => {
    try {

        const arrendatarios = await Arrendatario.findAll({
            include: Propiedad
        });

        res.json(arrendatarios);

    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

export const getArrendatarioById = async (req, res) => {
    try {
        //const id_Arrendatario = req.params.id_Arrendatario;
        const id = req.params.id;

        const arrendatario = await Arrendatario.findByPk(id)
        res.json(arrendatario);

    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

export const insertArrendatario = async(req, res) => {
    try {
        const {rfc, nombre, apellido} = req.body;

        const arrendatario = await Arrendatario.create({
            RFC: rfc, Nombre: nombre, Apellido: apellido
        })

        res.json(arrendatario)

    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

export const deleteArrendatario = async(req, res) => {
    try {
        const id = req.params.id;

        const arrendatario = await Arrendatario.findOne({
            where: {
                id: id
            }
        })
        if(!arrendatario){
            return res.json("No existe el id del arrendatario");
        }
        
        res.json(arrendatario);
        await arrendatario.destroy();
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

export const updateArrendatario = async (req, res) => {
    try {
        const { id, rfc, nombre, apellido } = req.body;

        const arrendatario = await Arrendatario.findByPk(id)
        const propiedades = await Propiedad.findAll({
            where: {
                ArrendatarioId: id
            },
        })

        if(!arrendatario){
            return res.json("No existe el id de arrendatario")
        }
        
        if (!propiedades) {
            return res.json("No existe el id de propiedad");
        }

        const arrendatarioNew = await Arrendatario.upsert({
            id: id, RFC: rfc, Nombre: nombre, Apellido: apellido
        })


        res.json(arrendatarioNew)

    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
import { Propietario } from "../models/Propietario.js";
import { Propiedad } from "../models/Propiedad.js";

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

// export const getArrendatariosByID = async (req, res) => {
//     try {
//         //const id_Arrendatario = req.params.id_Arrendatario;
//     } catch (e) {
//         res.status(500).json({message: e.message});
//     }
// }

export const getPropietariosByRFC = async (req, res) => {
    try {
        //const id_Arrendatario = req.params.id_Arrendatario;
        const rfc = req.params.rfc;

        const propietario = await Propietario.findOne({
            where: {
                RFC: rfc
            },
            include: [{
                model: Propiedad,
                as: 'propiedades'
            }]
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

    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
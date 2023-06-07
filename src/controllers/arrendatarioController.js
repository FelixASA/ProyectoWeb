import { Arrendatario } from "../models/Arrendatario.js";
import { Propiedad } from "../models/Propiedad.js";

export const getArrendatarios = async (req, res) => {
    try {

        const arrendatarios = await Arrendatario.findAll({
            include: [{
                model: Propiedad,
                as: 'propiedades'
            }]
        });

        res.json(arrendatarios);

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

export const getArrendatariosByRFC = async (req, res) => {
    try {
        //const id_Arrendatario = req.params.id_Arrendatario;
        const rfc = req.params.rfc;

        const arrendatario = await Arrendatario.findOne({
            where: {
                RFC: rfc
            },
            include: [{
                model: Propiedad,
                as: 'propiedades'
            }]
        })

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
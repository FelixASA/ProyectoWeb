import { Propietario_Propiedad } from "../models/Contrato.js";
import { Propiedad } from "../models/Propiedad.js";
import { Propietario } from "../models/Propietario.js";

export const getPropiedades = async (req, res) => {
    try {

        const propiedades = await Propiedad.findAll({
            include: Propietario
        });

        res.json(propiedades);

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

export const getPropiedadById = async (req, res) => {
    try {
        //const id_Arrendatario = req.params.id_Arrendatario;
        const rfc = req.params.rfc;

        const propiedad = await Propiedad.findOne({
            where: {
                RFC: rfc
            },
            include: {
                model: Propietario,
                as: 'Propietario'
            }
        })
        res.json(propiedad);

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

export const insertPropiedad = async (req, res) => {
    try {
        const { clave, descripcion, arrendatarioId , idPropietarios} = req.body;

        const propiedad = await Propiedad.create({
            clave_catastral: clave, descripcion: descripcion, ArrendatarioId: arrendatarioId
        })

        if(idPropietarios.length != 0){
            //array = []
            idPropietarios.forEach(async idPropietario => {
                const pro_pro = await Propietario_Propiedad.create({PropietarioId: idPropietario, PropiedadId: propiedad.get('id')})
                //array.push(pro_pro)
            });
        }

        res.json(propiedad)

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

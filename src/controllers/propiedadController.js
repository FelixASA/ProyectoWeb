import { Propietario_Propiedad } from "../models/Contrato.js";
import { Propiedad } from "../models/Propiedad.js";
import { Propietario } from "../models/Propietario.js";
import * as ArrendatarioObj from "../controllers/arrendatarioController.js";
import { Arrendatario } from "../models/Arrendatario.js";

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
        const { id } = req.body;

        const propiedad = await Propiedad.findOne({
            where: {
                id: id
            }
        })
        res.json(propiedad);

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

export const insertPropiedad = async (req, res) => {
    try {
        const { clave, descripcion, arrendatarioId } = req.body;

        const arrendatario = await Arrendatario.findByPk(arrendatarioId);

        if (!arrendatario) {
            return res.json("No existe el Id de arrendatario")
        }
        const propiedad = await Propiedad.create({
            clave_catastral: clave, descripcion: descripcion, ArrendatarioId: arrendatarioId
        })

        res.json(propiedad)
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

export const deletePropiedad = async (req, res) => {
    try {
        const id = req.params.id;

        const propiedad = await Propiedad.findOne({
            where: {
                id: id
            }
        })
        if (!propiedad) {
            return res.json("No existe el Id de la propiedad")
        }
        // const destruidos = await Propietario_Propiedad.destroy({
        //     where: {
        //         PropiedadId: id
        //     }
        // })
        res.json(propiedad)
        await propiedad.destroy()

    } catch (e) {
        res.status(500).json({ message: e.message });
    }

}

export const updatePropiedad = async (req, res) => {
    try {
        const { id, clave, descripcion, arrendatarioId} = req.body;

        const propiedad = await Propiedad.findOne({
            where: {
                id: id
            },
        })

        if (!propiedad) {
            return res.json("No existe el id de propiedad");
        }
        const arrendatario = await ArrendatarioObj.getArrendatarioById(arrendatarioId);

        if (!arrendatario) {
            return res.json("No existe el Id de arrendatario")
        }

        const propiedadNueva = await Propiedad.upsert({
            id: id, clave_catastral: clave, descripcion: descripcion, ArrendatarioId: arrendatarioId
        })

        // const relacionNueva = await actualizarRelacionesPorId(propiedadNueva)

        res.json(propiedadNueva, relacionNueva)
    } catch (e) {
        res.status(500).json({ message: e.message });
    }

}

const actualizarRelacionesPorId = async (req, res) => {
    const { id, arrendatarioId } = req.body;

    const contratos = await Propietario_Propiedad.findAll({
        where: {
            PropiedadId: id
        }
    })
    const contratosNew = []
    contratos.forEach(async relacion =>{
        contratosNew.push(await Propietario_Propiedad.upsert({
            id: relacion.body.id, PropiedadId: arrendatarioId 
        }))
    })

    res.json(contratosNew)
}
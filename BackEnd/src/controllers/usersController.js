import { Users } from "../models/Users.js";

export const getUsers = async (req, res) => {
    try {
        const usuarios = await Usuarios.findAll();

        res.json(usuarios);

    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

export const getUsersById = async (req, res) => {
    try {
        const id = req.params.id;

        const usuario = await Users.findByPk(id)
        res.json(usuario);

    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

export const insertUser = async(req, res) => {
    try {
        const {nombre, email, pass} = req.body;

        const user = await User.create({
            nombre: nombre, email: email, pass: pass
        })

        res.json(user)

    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

export const deleteUser = async(req, res) => {
    try {
        const id = req.params.id;

        const usuario = await Users.findByPk(id)
        if(!usuario){
            return res.json("No existe el id del usuario");
        }
        
        res.json(usuario);
        await usuario.destroy();
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
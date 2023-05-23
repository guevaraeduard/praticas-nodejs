import { Request, Response } from "express";
import Usuario from "../models/usuario";

export const getUsuarios = async (req: Request, res: Response) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
};

export const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).json({
      msg: "No existe este usuario",
    });
  }
};

export const postUsuario = async (req: Request, res: Response) => {
  const { body } = req;

  try {

    const existe = await Usuario.findOne({
        where:{
            email: body.email
        }
    })

    if(existe){
        return res.status(400).json({
            msg: 'Este correo ya existe'
        })
    }
    const usuario = new Usuario(body);
    await usuario.save()

    res.json(usuario);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export const putUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {

    const usuario = await Usuario.findByPk(id);

    if(!usuario){
        return res.status(400).json({
            msg: 'No existe un usaurio con este id'
        })
    }


    await usuario.update(body)

    res.json(usuario);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  const usuario = await Usuario.findByPk(id);

    if(!usuario){
        return res.status(400).json({
            msg: 'No existe un usaurio con este id'
        })
    }
    await usuario.update({estado: false})
   // await usuario.destroy();

  res.json({
    msg: "deleteUsuarios",
    id,
  });
};

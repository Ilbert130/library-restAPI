import { Request, Response } from "express"
import UserModel from "../models/user";
import bcryptjs from "bcryptjs";


//GET
export const usersGet = async(req:Request, res:Response):Promise<void> => {

    try {
        const { limit = 5, since = 0 } = req.query;
        const query = { state: true };

        const [ total, users] = await Promise.all([
            UserModel.countDocuments(query),
            UserModel.find(query)
                .skip(Number(since))
                .limit(Number(limit))
        ]);

        res.json({
            total,
            users
        });

    } catch (error) {
        
        res.json({
            msg: 'Error',
            error
        });
    }
}

//GET: id
export const userGet = async(req:Request, res:Response) => {

    try {

        const {id} = req.params;
        const usuario = await UserModel.findById(id);

        res.json({
            usuario
        });
        
    } catch (error) {
        
    }
}




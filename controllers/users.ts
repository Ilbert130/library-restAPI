import { Request, Response } from "express"
import { User } from "../models";
import bcryptjs from "bcryptjs";


//GET
export const usersGet = async(req:Request, res:Response):Promise<void> => {

    try {
        const { limit = 5, since = 0 } = req.query;
        const query = { state: true };

        const [ total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
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
        const usuario = await User.findById(id);

        res.json({
            usuario
        });
        
    } catch (error) {
        
    }
}




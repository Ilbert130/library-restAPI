import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/user";


interface IId {
    id:string
}

//Validating the JWT
export const validateJWT = async(req:Request, res:Response, next:Function) => {

    //Getting the JWT from the header of the request
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'It does not have any token in the request'
        });
    }

    try {

        //The verify function is to verify the jwt. It verifies if it's valid and return the payload
        const {id} = jwt.verify(token, process.env.SECRETORPRIVATEKEY || '') as IId;
        
        const user = await UserModel.findById(id);

        //verifying if user exist
        if(!user || !user.state){
            return res.status(401).json({
                msg: 'Token is not valid'
            });
        }

        //Getting the user data to validate the role
        req.body.user = {
            id:user.id,
            role: user.role
        }

        next();
        
    } catch (error) {
        res.status(401).json({
            msg: 'Token is not valid',
            error
        });
    }
}
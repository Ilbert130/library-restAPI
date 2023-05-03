import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/user";


interface IUid {
    id:string
}

//Validating the JWT
export const validateJWT = async(req:Request, res:Response, next:Function) => {

    //Getting the JWT from the header of the request
    const token = req.header('x-token');
    let idResult:IUid = {
        id: ''
    }

    if(!token){
        return res.status(401).json({
            msg: 'It does not have any token in the request'
        });
    }

    try {

        //The verify function is to verify the jwt. It verifies if it's valid and return the payload
        let resul = jwt.verify(token, 'SECRETORPRIVATEKEY=Esto03sMyPub1cK3y23@913@155DE');
        console.log(resul);
        
        const user = await UserModel.findOne({_id:idResult.id});

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
            msg: 'Token is not valid'
        });
    }
}
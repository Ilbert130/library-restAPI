import { Request, Response } from "express";
import UserModel from "../models/user";
import bcryptjs from 'bcryptjs';
import { generateJWT } from "../helpers/generate-jwt";



//GET
export const renewToken = async(req:Request, res:Response) => {

    try {

        const {id} = req.body.user;
        const [user, token] = await Promise.all([
            UserModel.findById(id),
            generateJWT(id)
        ]) 

        res.json({
            user,
            token
        });
        
    } catch (error) {
        
        res.json({
            msg: 'Error',
            error
        });
    }
}

//POST
export const login = async(req:Request, res:Response) => {

    const {email, password} = req.body;

    try {

        //Verifying if the email exist
        const user = await UserModel.findOne({email});
        if(!user) {
            return res.status(400).json({
                msg: 'User / Password invalid - email'
            });
        }

        //Verifying if the user is active
        if(!user.state) {
            return res.status(400).json({
                msg: 'User / Password invalid - state: false'
            });
        }

        //Verifying the token and password
        const [token, validPassword] = await Promise.all([
            generateJWT(user.id),
            bcryptjs.compare(password, user.password)
        ]);

        if(!validPassword){
            return res.status(400).json({
                msg: 'User / Password invalid - password'
            });
        }

        res.json({
            user,
            token
        });
        
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            msg: 'Talk with the admin'
        });
    }
}
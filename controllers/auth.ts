import { Request, Response } from "express";
import UserModel from "../models/user";
import bcryptjs from 'bcryptjs';
import { generateJWT } from "../helpers/generate-jwt";





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

        // const [ total, users] = await Promise.all([
        //     UserModel.countDocuments(query),
        //     UserModel.find(query)
        //         .skip(Number(since))
        //         .limit(Number(limit))
        // ]);

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
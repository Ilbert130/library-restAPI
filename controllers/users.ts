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
            UserModel.find(query).populate('role', 'role')
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

//GET: By id
export const userGet = async(req:Request, res:Response) => {

    try {

        const {id} = req.params;
        const user = await UserModel.findById(id).populate('role', 'role');

        res.json({
            user
        });
        
    } catch (error) {

        res.json({
            msg: 'Error',
            error
        });
    }
}

//POST
export const userPost = async(req:Request, res:Response) => {

    try {
        
        //Creating the instance for the new user
        const {name, email, password, role} = req.body;
        const user = new UserModel({name, email, password, role});

        //encrypting the password
        const salt = await bcryptjs.genSalt();
        user.password = await bcryptjs.hash(password, salt);

        //Saving the user in the db
        await user.save();

        res.json({
            user
        });

    } catch (error) {
        
        res.json({
            msg: 'Error',
            error
        });
    }
}

//PUT
export const userPut = async(req:Request, res:Response) => {

    try {

        const {id} = req.params;
        const {_id, password, email, ...rest} = req.body;

        if(password){
            const salt = await bcryptjs.genSalt();
            rest.password = await bcryptjs.hash(password, salt);
        }

        const user = await UserModel.findByIdAndUpdate(id, rest, {new:true});

        res.json({
            user
        });
        
    } catch (error) {

        res.json({
            msg: 'Error',
            error
        });
    }
}


//DELETE
export const userDelete = async(req:Request, res:Response) => {

    try {

        const {id} = req.params;

        const user = await UserModel.findByIdAndUpdate(id, {state:false}, {new:true});

        res.json({
            user
        });
        
    } catch (error) {

        res.json({
            msg: 'Error',
            error
        });
    }
}


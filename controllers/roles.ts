import { Request, Response } from "express";
import RoleModel from "../models/role";



//GET:
export const rolesGet = async(req:Request, res:Response) => {

    try {
        
        const {limit = 5, since = 0} = req.query;
        const query = {state:true};

        const [total, roles] = await Promise.all([
            RoleModel.countDocuments(query),
            RoleModel.find(query)
                .skip(+since)
                .limit(+limit)
        ]);

        res.json({
            total,
            roles
        });

    } catch (error) {
        
        res.json({
            msg: 'Error',
            error
        });
    }
}

//GET: By id
export const roleGet = async(req:Request, res:Response) => {

    try {

        const {id} = req.params;
        const role = await RoleModel.findById(id);

        res.json({
            role
        });
        
    } catch (error) {
        
        res.json({
            msg: 'Error',
            error
        });
    }
}


//POST
export const rolePost = async(req:Request, res:Response) => {

    try {
        
        const {role} = req.body;
        const roleSave = new RoleModel({role});

        await roleSave.save();

        res.json({
            role: roleSave
        });

    } catch (error) {

        res.json({
            msg: 'Error',
            error
        });
    }
}

//PUT
export const rolePut = async(req:Request, res:Response) => {

    try {
        
        const {id} = req.params;
        const {role} = req.body;

        const roleUpdate = await RoleModel.findByIdAndUpdate(id, role, {new:true});

        res.json({
            role: roleUpdate
        });

    } catch (error) {
        
        res.json({
            msg: 'Error',
            error
        });
    }
}

//DELETE
export const roleDelete = async(req:Request, res:Response) => {

    try {
        
        const {id} = req.params;

        const roleDelete = await RoleModel.findByIdAndUpdate(id, {state:false}, {new:true});

        res.json({
            role: roleDelete
        });

    } catch (error) {
        
        res.json({
            msg: 'Error',
            error
        });
    }
}

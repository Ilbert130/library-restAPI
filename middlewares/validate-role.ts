import { Request, Response } from "express"
import RoleModel from "../models/role";

interface RoleHas {
    hasRoles:boolean;
}


//Middleware to validate the user's role
export const roleVerification = (...roles:string[]) => {

    //This function return a middleware
    return async(req:Request, res:Response, next:Function) => {

        try {
            const rolesHas:RoleHas = {
                hasRoles:false
            };
    
            //verifying if the req has the user's information
            if(!req.body.user){
                return res.status(500).json({
                    msg: 'It is necesary to validate the token at first and then validate the role'
                });
            }
    
            //verifying roles
            const roleIds:string[] = [...req.body.user.role];
    
            for(let i = 0; i < roleIds.length; i++){
    
                const id = roleIds[i].toString();
                const role = await RoleModel.findById(id);
                rolesHas.hasRoles = roles.includes(role?.role || '');
    
                if(rolesHas.hasRoles){
                    break;
                }
            }
    
            if(!rolesHas.hasRoles){
                return res.status(401).json({
                    msg: `This service require one of these roles ${roles}`
                });
            }
    
            next();

        } catch (error) {
            res.status(401).json({
                error
            });
        }
    }
}
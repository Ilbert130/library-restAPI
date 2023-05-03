import jwt from "jsonwebtoken";

//Generate JWT
export const generateJWT = (id:string):Promise<unknown> => {
    
    //retorning a promise
    return new Promise((resolve, reject) => {

        const payload:Object = {id};

        //creating the JWT with the method sign
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY || '', {
            expiresIn: '4h'
        }, (err, token) => {

            if(err){
                console.log(err);
                reject('The token could not be generated');
            }else{
                resolve(token);
            }
        });
    });
}
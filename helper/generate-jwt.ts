import jwt from "jsonwebtoken";

//Generate JWT
export const generateJWT = (uid:string) => {
    
    //retorning a promise
    return new Promise((resolve, reject) => {

        const payload = {uid};

        //creating the JWT with the method sign
        jwt.sign(payload, process.env.SECRETORPRIVATEKY || '', {
            expiresIn: '4'
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
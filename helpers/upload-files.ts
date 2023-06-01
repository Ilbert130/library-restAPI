import { v4 as uuid } from "uuid";
import path from "path";
import fileUpload, { UploadedFile } from "express-fileupload";


export const uploadFile = (files:fileUpload.FileArray|any, validExtensions:string[] = ['png', 'jpg', 'jpeg', 'gif', 'img'], folders:string) => {

    //Creating a Promise
    return new Promise((resolve, reject) => {
        //Get file
        const file = files.file as UploadedFile;

        //Get extensions
        const cutName = file.name.split('.');
        const extension =cutName[cutName.length - 1];

        //validate extension
        if(!validExtensions.includes(extension)){
            return reject(`The extension ${extension} isn't allow - ${validExtensions}`);
        }

        //Assigning a name to the file
        const nameFile = uuid() + '.' + extension;

        //creating the path
        // const uploadPath = path.join(__dirname, '../uploads/', folders, nameFile);
        const uploadPath = `../dist/uploads/${folders}/${nameFile}`;

        //moving the file to the path
        file.mv(uploadPath, (err:any) => {
            if (err) {
                reject(err);
            }

            resolve(nameFile);
        });
    });
}
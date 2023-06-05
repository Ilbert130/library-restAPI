import { Request, Response } from "express";
import BookModel from "../models/book";
import ServiceModel from "../models/service";
import { serviceState } from "../utilities/serviceState";



//GET
export const GetAllService = async(req:Request, res:Response) => { 
    try {
        const { limit = 5, since = 0} = req.query;
        const query = {state:true};

        const [total, services] = await Promise.all([
            ServiceModel.countDocuments(query),
            ServiceModel.find(query).populate('user',['name', 'email']).populate('book', ['name','edition'])
                .skip(+since)
                .limit(+limit)
        ]);

        res.json({
            total,
            services
        });

    } catch (error) {
        res.json({
            msg: 'Error',
            error
        });
    }
}

//POST
export const createService = async(req:Request, res:Response) => {

    try {
        let service;
        const {user, book} = req.body;
        const getBook = await BookModel.findOne({_id:book});
        const amount:number = getBook?.amount || 0;

        if(amount===0)
            return servicePending(res, service, user, book);
        

        service = new ServiceModel({
            user,
            book,
            requestState: serviceState.Lent,
            requestSubmitedDate: getDate(),
            requestAprovedDate: getDate(),
            bookReturnDate: getDate(true)
        });

        await Promise.all([
            BookModel.findByIdAndUpdate(book, {amount: amount - 1}),
            service.save()
        ]);

        return res.json({
            service
        });
        
    } catch (error) {
        
        res.json({
            msg: 'Error',
            error
        });
    }
}


//PUT: Request Pending
export const submitAgainService = async(req:Request, res:Response) => {

    try {

        const {id} = req.params;
        let service = await ServiceModel.findById(id);
        const getBook = await BookModel.findOne({id:service?.book});
        const amount:number = getBook?.amount || 0;
        const user:string = service?.user.toString() || '';
        const book:string = service?.book.toString() || '';

        if(amount===0)
            return servicePending(res, service, user, book);
        
        const serviceUpdate = {
            requestState: serviceState.Lent,
            requestSubmitedDate: getDate(),
            requestAprovedDate: getDate(),
            bookReturnDate: getDate(true)
        }

        const [bookUpdate, serviceUp] = await Promise.all([
            BookModel.findByIdAndUpdate({amount: amount - 1}),
            ServiceModel.findByIdAndUpdate(id, serviceUpdate, {new:true})
        ]);

        return res.json({
            service:serviceUp
        });
        
    } catch (error) {
        res.json({
            msg: 'Error',
            error
        });
    }
}


//PUT: Request Returned
export const bookReturnedStatus = async(req:Request, res:Response) => { 

    try {

        const {id} = req.params;
        const service = await ServiceModel.findByIdAndUpdate(id, {requestState: serviceState.Returned, userReturnBookDate: getDate()}, {new:true});
        const book = await BookModel.findOne({id:service?.book});
        const amount:number = book?.amount || 0;
        await BookModel.findByIdAndUpdate(service?.book, {amount:amount+1});

        return res.json({
            service
        });
        
    } catch (error) {
        res.json({
            msg: 'Error',
            error
        });
    }
}


//DELETE 
export const serviceDelete = async(req:Request, res:Response) => {
    try {
        const {id} = req.params;
        const service = await ServiceModel.findByIdAndUpdate(id, {state:false}, {new:true});

        res.json({
            service
        });
        
    } catch (error) {
        res.json({
            msg: 'Error',
            error
        });
    }
 }

//Private method
const servicePending = async(res:Response, service:any, user:string, book:string) => {

    service = new ServiceModel({
        user, 
        book, 
        requestState: serviceState.Pending,
        requestSubmitedDate: getDate(),
    })

    await service.save();

    return res.json({
        service
    });
}

//Private method
const getDate = (bookReturn:boolean = false):string => {

    const dateTimeNow = new Date();

    if(bookReturn){
        const dateNow = dateTimeNow.getDate();
        dateTimeNow.setDate(dateNow + 3);
    }

    var day = dateTimeNow.getDate();
    var month = dateTimeNow.getMonth() + 1; // Los meses comienzan desde 0, por lo que se suma 1
    var year = dateTimeNow.getFullYear();
    var hours = dateTimeNow.getHours();
    var minutes = dateTimeNow.getMinutes();
    var seconds = dateTimeNow.getSeconds();

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
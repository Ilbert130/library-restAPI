import { Ref, prop } from "@typegoose/typegoose";
import { User } from "./user";
import { Book } from "./book";


export class Service {

    @prop({ref:()=> User, required:true})
    public user: Ref<User>;

    @prop({ref:()=> Book, required:true})
    public book: Ref<Book>;

    @prop({required:true})
    public requestState:boolean;

    @prop({required:true})
    public requestStartDate: string;

    @prop()
    public requestAprovedDate?: string;

    @prop({required:true})
    public bookReturnDate: string;

    @prop({default:true})
    public state:boolean;
}
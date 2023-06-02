import { Ref, getModelForClass, prop } from "@typegoose/typegoose";
import { User } from "./user";
import { Book } from "./book";


export class Service {

    @prop({ref:()=> User, required:true})
    public user: Ref<User>;

    @prop({ref:()=> Book, required:true})
    public book: Ref<Book>;

    @prop({required:true})
    public requestState:string;

    @prop({required:true})
    public requestSubmitedDate: string;

    @prop()
    public requestAprovedDate?: string;

    @prop()
    public bookReturnDate?: string;

    @prop()
    public userReturnBookDate?: string;

    @prop({default:true})
    public state:boolean;
}

const ServiceModel = getModelForClass(Service);
export default ServiceModel;
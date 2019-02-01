import { Filters } from "./filter";

export class Groups{
    item:number;
    name:string;
    firstDebtAge:number;
    lastDebtAge:number
    dateCreated:Date;
    createdBy:string;
    accountsQuantity:number;
    parameters:string;
    fixedFiltersList:Array<Filters>;
    dinamicFiltersList:Array<Filters>;
    basicPriority:number;
    specialPriority:number;
    ejecution:number;
}

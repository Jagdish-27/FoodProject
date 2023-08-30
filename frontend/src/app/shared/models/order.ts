import { LatLng } from "leaflet";
import { CartItem } from "./CartItem";

export class Order{
    id!:number;
    items!:CartItem[];
    totalPrice!:number;
    name!:string;
    address!:string;
    // addressLatLng?:string;
    paymentId!:string;
    createdAt!:string;
    status!:string;
    addressLatLng?: LatLng;
}
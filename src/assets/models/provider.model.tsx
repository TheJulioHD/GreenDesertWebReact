import { IProduct } from "./product.model";

export interface IProvider{
   
    name: string;

    
    company: string;

    
    address: string;
    
  
    email: string;

    
    phonenumber: string;
    
   
    status: string;

    //porduct
    nameproduct: string;
    
    
    description: string;

    
    brand: string;
    
    
    image: string;
    //end 

    //inventory
    quantity: number;
    
    
    spot: string;
    //end

    product: IProduct;
}
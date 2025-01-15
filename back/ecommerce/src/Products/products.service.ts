import { Injectable } from '@nestjs/common';


@Injectable ()


export class ProductsService {
    getProducts(){
        return "Gett all Products";
    }
}
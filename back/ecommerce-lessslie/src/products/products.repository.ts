import { Injectable } from '@nestjs/common';
import { IProducts } from './products.interface';

@Injectable()
export class ProductsRepository {
  private products: IProducts[] = [
    {
      id_producto: 1,
      name_product: 'Ventilador',
      description: 'Ventilador de pie',
      price: 5000,
      stock: 10,
      imgUrl: 'https://example.com/images/ventilador.jpg',
    },
    {
      id_producto: 2,
      name_product: 'Aire Acondicionado',
      description: 'Aire acondicionado portátil',
      price: 25000,
      stock: 5,
      imgUrl: 'https://example.com/images/aire_acondicionado.jpg',
    },
    {
      id_producto: 3,
      name_product: 'Calefactor',
      description: 'Calefactor eléctrico de 2000W',
      price: 7000,
      stock: 15,
      imgUrl: 'https://example.com/images/calentador.jpg',
    },
    {
      id_producto: 4,
      name_product: 'Humidificador',
      description: 'Humidificador de aire con filtro',
      price: 3000,
      stock: 20,
      imgUrl: 'https://example.com/images/humidificador.jpg',
    },
    {
      id_producto: 5,
      name_product: 'Purificador de Aire',
      description: 'Purificador de aire con filtro HEPA',
      price: 12000,
      stock: 8,
      imgUrl: 'https://example.com/images/purificador.jpg',
    },
  ];

  async getProducts(page:string, limit:string): Promise<IProducts[]> {
    const pageInt = page ? Number(page) : 1;
    const limitInt = limit ? Number(limit) : 5;
    const startIndex = (pageInt - 1) * limitInt;
    const endIndex = pageInt * limitInt;
    return this.products.slice(startIndex, endIndex);
    }

  async getProduct(id: string): Promise<IProducts> {
    const product = this.products.find(
      (product) => product.id_producto === Number(id),
    );
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return product;
  }

  async addProduct(product: IProducts): Promise<IProducts> {
    this.products.push(product);
    return product;
  }

  async upDateProduct(id: string, product: IProducts): Promise<number> {
    this.products = this.products.map((prevProduct) => {
      if (prevProduct.id_producto === Number(id)) return product;
      return prevProduct;
    });
    return product.id_producto;
  }

  async deleteProduct(id: string): Promise<number> {
    this.products = this.products.filter(
      (product) => product.id_producto !== Number(id),
    );
    return Number(id);
  }
}

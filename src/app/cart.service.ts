import { Injectable } from '@angular/core';
import { IProduct} from './catalog/product.model';
import  { ILineItem } from './catalog/line-item';

//inyecta con root en cualquier parte de la aplicacion
@Injectable({
  providedIn: 'root'
})

//el servicios singleton se crea una vez y se comparte en toda la aplicacion
export class CartService {
  //cart:IProduct [] = [];
  private cart: ILineItem[] = [];


  constructor() { }
//explicar el metodo getTotalPrice que retorna el precio total de los productos en el carrito
  getTotalPrice() {
    return (
      Math.round(
        this.cart.reduce<number>((prev, cur) => {
          return (
            prev + cur.qty * (cur.product.price * (1 - cur.product.discount))
          );
        }, 0) * 100
      ) / 100
    );
  }
//explicar el metodo findLineItem que recibe un producto y retorna un objeto de tipo ILineItem
  findLineItem(product: IProduct) {
    return this.cart.find((li) => li.product.id === product.id);
  }

  //explicar el metodo add que recibe un producto y lo agrega al carrito de compras
  add(product: IProduct) {
    let lineItem = this.findLineItem(product);
    if (lineItem !== undefined) {
      lineItem.qty++;
    } else {
      lineItem = { product: product, qty: 1 };
      this.cart.push(lineItem);
    }
    console.log('added ' + product.name + ' to cart');
    console.log('Total price: $ '+ this.getTotalPrice());
  }
}




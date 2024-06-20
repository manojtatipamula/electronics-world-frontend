import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface CartItem {
  id: string; // Or appropriate ID type for your products
  selectedQuantity: number;
  image: string;
  name : string;
  price: string;
  stock: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartManagementService {
  cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  $cartItems: Observable<CartItem[]> = this.cartItemsSubject.asObservable();
  totalQuantitySubject = new BehaviorSubject<Number>(0);
  $totalQuantity: Observable<Number> = this.totalQuantitySubject.asObservable();


  constructor() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      console.log("Current local storage for cartItem is there so emitting-------->")
      this.cartItemsSubject.next(JSON.parse(storedCart));
      this.getCartTotalQuantity()
    } else {
      console.log("Current local storage for cartItem empty")
    }
  }

  addToCart(product: any): void { // Simplified, no need for observable
    console.log("adding to cart in cart service")
    console.log("This is product arg", product)
    if (product.selectedQuantity > 0) {
      const existingItem = this.cartItemsSubject.getValue().find(item => item.id === product.id);
      console.log("existing item in cart service addToCart", this.cartItemsSubject.getValue())
      if (existingItem) {
        console.log("Existing item found in addtoCart service , so not emitting but will update local storage")
        existingItem.selectedQuantity = product.selectedQuantity;
      } else {
        console.log("Existing item not found in addtoCart service , so emtting and updating local storage")
        const cartItem = {
          id: product.id,
          selectedQuantity: product.selectedQuantity,
          image: product.image,
          name : product.name,
          price: product.price,
          stock: product.stock,
          description: product.description
        }
        this.cartItemsSubject.next([...this.cartItemsSubject.getValue(), cartItem]);
      }
      this.updateLocalStorage(); // Update local storage here
    } else {
      console.log("Selected quantity is 0 so not doing anything , no local storage , no emit")
      this.removeProductFromCart(product)
    }

    console.log("CartService: Add to cart finished, updating counts")
    const result = this.getCartTotalQuantity()
    console.log(result)

  }
  getCartTotalQuantity(): number {
    const result = this.cartItemsSubject.getValue().reduce((sum, item) => sum + item.selectedQuantity, 0);
    this.totalQuantitySubject.next(result)
    return result
  }
  updateLocalStorage(): void { // Consider asynchronous operation
    // Implement your logic to update local storage with the current cart items
    console.log("Updating local storage------->", this.cartItemsSubject.getValue())
    localStorage.setItem('cart', JSON.stringify(this.cartItemsSubject.getValue()));
  }

  removeProductFromCart(product: any) {
    console.log("But trying to remove from the cart" ,  this.cartItemsSubject.getValue())
    const updatedCartItems = this.cartItemsSubject.getValue().filter(item => item.id !== product.id);
    console.log("these are updated cart items after removal", updatedCartItems)
    this.cartItemsSubject.next([...updatedCartItems])
    this.updateLocalStorage()
    const result = this.getCartTotalQuantity()
    console.log("CartService: Removal finished, updating counts", result)
  }
  getCartItems() {
    const result = this.cartItemsSubject.getValue()
    this.cartItemsSubject.next(result)
    return result
  }
  updateProductQuantity(product: any) {
    if(product.selectedQuantity > 0){
      const existingItem = this.cartItemsSubject.getValue().find(item => item.id === product.id);
      console.log("existing item in cart service updateProductQuantity", this.cartItemsSubject.getValue())
      if (existingItem) {
        console.log("Existing item found in updateProductQuantity service , so not emitting but will update local storage")
        existingItem.selectedQuantity = product.selectedQuantity;
      }
    }
    this.updateLocalStorage(); 
    this.getCartTotalQuantity()
  }

  clearLocalStorage(){
    localStorage.removeItem('cart')
    this.cartItemsSubject.next([])
    this.totalQuantitySubject.next(0)
  }
  resetCartItemsAndCounter(){
    this.cartItemsSubject.next([])
    this.totalQuantitySubject.next(0)
  }



}

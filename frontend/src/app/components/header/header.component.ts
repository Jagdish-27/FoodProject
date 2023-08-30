import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cartQuantity: number = 0;
  user!:User;
  constructor(
     foodService: FoodService,
     cartService: CartService,
    private userService:UserService,
  ) {
    cartService
    .getCartObservable()
    .subscribe((newCart) => [(this.cartQuantity = newCart.totalCount)]);

    userService.userObservable?.subscribe((newUser)=>{
      this.user = newUser;
    })
  }

  
  ngOnInit(): void {
    
  }

  logout(){
    this.userService.logout();
  }

  get isAuth(){
    return this.user.token
  }
}

import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit{
  constructor(private orderService:OrderService){}
  ngOnInit(): void {
    this.orderService.getOrders().subscribe((data)=>{
      console.log(data);
    })
  }

}

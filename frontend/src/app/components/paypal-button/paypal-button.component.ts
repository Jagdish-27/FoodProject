import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/order';
import Swal from 'sweetalert2';

//window.paypal

declare var paypal: any;

@Component({
  selector: 'paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.scss'],
})
export class PaypalButtonComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private router: Router,
    private cartService: CartService
  ) {}

  @Input() order!: Order;

  @ViewChild('paypal', {static: true}) paypalElement!:ElementRef;

  ngOnInit(): void {
    const self = this;
    paypal.Buttons({
      createOrder: (date: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: self.order.totalPrice,
              },
            },
          ],
        });
      },

      onApprove: async (data: any, actions: any) => {
        const payment = await actions.order.capture();
        this.order.paymentId = payment.id;
        self.orderService.pay(this.order).subscribe({
          next: (orderId) => {
            this.cartService.clearCart();
            this.router.navigateByUrl('/track/' + orderId);

            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Payment Saved Successfully',
            });
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Opps something went wrong',
              text: 'Payment Save Failed',
            })

            console.log(error);
          }
        });
      },
      onError:(err:any)=>{
        Swal.fire({
          icon:'error',
          title:'Error',
          text: 'Payment Save Failed'
        })
      }
    }).render(this.paypalElement.nativeElement);
  }
}

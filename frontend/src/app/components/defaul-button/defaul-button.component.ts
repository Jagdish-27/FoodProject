import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'defaul-button',
  templateUrl: './defaul-button.component.html',
  styleUrls: ['./defaul-button.component.scss']
})
export class DefaulButtonComponent {

  @Input() type: 'submit' | 'button' = 'submit';
  @Input() text:string = 'Submit';
  @Input() bgColor = '#e72929';
  @Input() color = 'white';
  @Input() fontSizeRem = '1.3';
  @Input() widthRem = 12;
  @Output() onClick = new EventEmitter();
}

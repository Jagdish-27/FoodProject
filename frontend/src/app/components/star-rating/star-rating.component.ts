import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent {
  @Input() stars!: number;

  @Input() size: number = 0;

  get styles() {
    return {
      'width.rem': this.size,
      'height.rem': this.size,
      'marginRight.rem': this.size / 6,
    };
  }

  getStarImage(current: number): string {
    const previousHalf = current - 0.5;
    const imageName =
      this.stars >= current
        ? 'star-icon'
        : this.stars >= previousHalf
        ? 'star-half-yellow-icon'
        : 'star-empty-icon';
    return `assets/icons/stars/${imageName}.svg`
  }
}

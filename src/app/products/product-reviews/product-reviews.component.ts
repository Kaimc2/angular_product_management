import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Review } from '../product';
import { FirestoreService } from '../../shared/services/firestore.service';
import Notiflix from 'notiflix';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrl: './product-reviews.component.scss',
})
export class ProductReviewsComponent {
  @Input() review: Review | undefined;
  @Output() refect = new EventEmitter<string>();

  private firebase = inject(FirestoreService);
  private auth = inject(AuthService);

  mouseOver = false;

  setMouseOver(state: boolean) {
    this.mouseOver = state;
  }

  removeReview() {
    Notiflix.Confirm.show(
      'Confirmation',
      'Are you sure you want to remove this review?',
      'Yes',
      'No',
      () => {
        this.firebase
          .removeReview(String(this.review?.id))
          .then(() => {
            this.refect.emit(this.review?.productId);
            Notiflix.Notify.success('Review removed successfully.');
          })
          .catch((err) => console.error(err));
      },
      () => {},
      { okButtonBackground: '#ef4444', titleColor: '#ef4444' }
    );
  }

  isRated(rating: number) {
    return rating <= Number(this.review?.ratings)
      ? 'fill-yellow-500'
      : 'fill-white';
  }

  ownReview() {
    return this.review?.username == this.auth.getAuthLocal().displayName;
  }
}

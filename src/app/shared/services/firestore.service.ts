import { Injectable, inject } from '@angular/core';
import {
  DocumentData,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Product, Review } from '../../products/product';
import Notiflix from 'notiflix';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private firestore = inject(Firestore);
  private router = inject(Router);

  // Products Actions
  getProducts() {
    return collectionData(query(collection(this.firestore, 'products')), {
      idField: 'id',
    }).pipe(map((items) => items as Product[]));
  }

  async getProduct(id: string) {
    const docRef = doc(this.firestore, 'products', id);
    const docSnap = await getDoc(docRef);

    // Get reviews related to the product
    let reviews: Review[] | DocumentData = [];
    const reviewsQuery = query(
      collection(this.firestore, 'reviews'),
      where('productId', '==', id)
    );
    const reviewsSnap = getDocs(reviewsQuery);
    (await reviewsSnap).forEach((review) =>
      reviews.push({ id: review.id, ...review.data() })
    );

    if (docSnap.exists()) {
      return {
        ...docSnap.data(),
        id: id,
        reviews: reviews as Review[],
      } as Product;
    } else {
      console.log('Document not found!');
      this.router.navigate(['/not-found']);
      return undefined;
    }
  }

  getUserProducts(userId: string) {
    return collectionData(
      query(
        collection(this.firestore, 'products'),
        where('ownerId', '==', userId)
      ),
      { idField: 'id' }
    ).pipe(map((items) => items as Product[]));
  }

  async createProduct(data: Product) {
    await addDoc(collection(this.firestore, 'products'), {
      ...data,
    })
      .then(() => this.router.navigate(['/dashboard']))
      .catch((err) => console.log(err));
  }

  async updateProduct(id: string, data: Product) {
    await updateDoc(doc(this.firestore, 'products', id), {
      ...data,
    })
      .then(() => {
        this.router.navigate(['dashboard']);
        Notiflix.Notify.success('Product update successfully.');
      })
      .catch((err) => console.log(err));
  }

  async removeProduct(id: string) {
    await deleteDoc(doc(this.firestore, 'products', id))
      .then(() => this.router.navigate(['/dashboard']))
      .catch((err) => console.log(err));
  }

  // Reviews Actions
  async createReview(data: Review) {
    await addDoc(collection(this.firestore, 'reviews'), { ...data });
  }

  async removeReview(id: string) {
    await deleteDoc(doc(this.firestore, 'reviews', id));
  }
}

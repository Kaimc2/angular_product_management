import {
  Injectable,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  query,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Product } from '../../products/product';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private firestore = inject(Firestore);
  private router = inject(Router);

  private productsResult$ = collectionData(
    query(collection(this.firestore, 'products')),
    {
      idField: 'id',
    }
  ).pipe(map((items) => items as Product[]));
  private productsResult = toSignal(this.productsResult$);
  products = this.productsResult as WritableSignal<Product[]>;

  getProducts() {
    return collectionData(query(collection(this.firestore, 'products')), {
      idField: 'id',
    }).pipe(map((items) => items as Product[]));
  }

  async getProduct(id: string) {
    const docRef = doc(this.firestore, 'products', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as Product;
    } else {
      console.log('Document not found!');
      this.router.navigate(['/not-found']);
      return undefined;
    }
  }

  async createProduct(data: Product) {
    await addDoc(collection(this.firestore, 'products'), {
      ...data,
    })
      .then(() => this.router.navigate(['/products']))
      .catch((err) => console.log(err));
  }

  async removeProduct(id: string) {
    await deleteDoc(doc(this.firestore, 'products', id))
      .then(() => this.router.navigate(['/products']))
      .catch((err) => console.log(err));
  }
}

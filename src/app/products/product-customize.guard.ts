import { CanDeactivateFn } from '@angular/router';
import { ProductCreateComponent } from './product-create/product-create.component';

export const productCustomizeGuard: CanDeactivateFn<ProductCreateComponent> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  if (component.productForm.dirty) {
    const productName =
      component.productForm.get('name')?.value || 'New Product';
    return confirm(`Navigate away and lose all changes?`);
  }
  return true;
};

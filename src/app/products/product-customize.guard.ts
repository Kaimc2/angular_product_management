import { CanDeactivateFn } from '@angular/router';
import { ProductCreateComponent } from './product-create/product-create.component';
import Notiflix from 'notiflix';
import { ProductEditComponent } from './product-edit/product-edit.component';

export const productCustomizeGuard: CanDeactivateFn<
  ProductCreateComponent | ProductEditComponent
> = async (component, currentRoute, currentState, nextState) => {
  if (
    (!component.formSubmitted || !component.productForm.valid) &&
    component.productForm.dirty
  ) {
    const confirmation = new Promise<boolean>((resolve) =>
      Notiflix.Confirm.show(
        'Confirmation',
        'Navigate away and lose all the changes?',
        'Yes',
        'No',
        () => resolve(true),
        () => resolve(false),
        { okButtonBackground: '#ef4444', titleColor: '#ef4444' }
      )
    );

    const userConfirm = await confirmation;

    return userConfirm;
  }
  return true;
};

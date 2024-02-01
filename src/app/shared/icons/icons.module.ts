import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AccountIcon } from './account-icon';
import { ProductsIcon } from './products-icon';
import { LogoIcon } from './logo-icon';
import { Bar3Icon } from './bar3-icon';
import { SearchIcon } from './search-icon';
import { CartIcon } from './cart-icon';
import { CloseIcon } from './close-icon';
import { EditIcon } from './edit-icon';
import { DeleteIcon } from './delete-icon';
import { StarIcon } from './star-icon';
import { RemoveIcon } from './remove-icon';

@NgModule({
  imports: [CommonModule],
  declarations: [
    AccountIcon,
    ProductsIcon,
    LogoIcon,
    Bar3Icon,
    SearchIcon,
    CartIcon,
    CloseIcon,
    EditIcon,
    DeleteIcon,
    StarIcon,
    RemoveIcon,
  ],
  exports: [
    AccountIcon,
    ProductsIcon,
    LogoIcon,
    Bar3Icon,
    SearchIcon,
    CartIcon,
    CloseIcon,
    EditIcon,
    DeleteIcon,
    StarIcon,
    RemoveIcon,
  ],
})
export class IconModule {}

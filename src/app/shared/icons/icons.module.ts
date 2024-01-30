import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AccountIcon } from './account-icon';
import { ProductsIcon } from './products-icon';
import { LogoIcon } from './logo-icon';
import { Bar3Icon } from './bar3-icon';
import { SearchIcon } from './search-icon';

@NgModule({
  imports: [CommonModule],
  declarations: [AccountIcon, ProductsIcon, LogoIcon, Bar3Icon, SearchIcon],
  exports: [AccountIcon, ProductsIcon, LogoIcon, Bar3Icon, SearchIcon],
})
export class IconModule {}

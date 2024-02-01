import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { IconModule } from './icons/icons.module';
import { ResponsiveNavbarComponent } from './navbar/responsive/responsive.component';

@NgModule({
  imports: [CommonModule, RouterModule, IconModule],
  declarations: [NavbarComponent, ResponsiveNavbarComponent],
  exports: [NavbarComponent, ResponsiveNavbarComponent, IconModule],
})
export class SharedModule {}

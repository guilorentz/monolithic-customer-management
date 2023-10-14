import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductListComponent } from './components/product-list/product-list.component';

@NgModule({
  declarations: [ProductListComponent, ProductAddComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [ProductListComponent, ProductAddComponent],
})
export class ProductModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderAddComponent } from './components/order-add/order-add.component';

@NgModule({
  declarations: [
    OrderListComponent,
    OrderAddComponent
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
})
export class OrderModule {}

import { Order } from './../../store/model/order';
import { loadProducts } from './../../../product/store/product/product.actions';
import { loadCustomers } from './../../../customer/store/customer/customer.actions';
import { addOrder, updateOrder } from './../../store/order/order.actions';
import { getProducts } from './../../../product/store/product/product.selectors';
import { getCustomers } from './../../../customer/store/customer/customer.selectors';
import { Product } from './../../../product/store/model/product';
import { Customer } from './../../../customer/store/model/customer';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { getOrder } from '../../store/order/order.selectors';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.scss'],
})
export class OrderAddComponent implements OnInit {
  title = 'Adicionar pedido';
  isEdit: boolean = false;
  dialogData: any;
  customers!: Customer[];
  products!: Product[];
  private customersSubscription!: Subscription;
  private productsSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private ref: MatDialogRef<OrderAddComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.dialogData = this.data;
    this.title = this.dialogData.title;
    this.loadCustomersAndProducts();
    this.store.select(getOrder).subscribe((res) => {});
  }

  orderForm = this.fb.group({
    id: [0, Validators.required],
    customer: ['', Validators.required],
    products: [[], Validators.required],
    totalItens: [0, Validators.required],
    totalValue: [0],
  });

  //   this.orderForm
  //     .get('selectedProducts')!
  //     .valueChanges.subscribe((selectedProducts) => {
  //       this.selectedProducts = selectedProducts;
  //       this.totalItems = selectedProducts.length;
  //       this.totalValue = selectedProducts.reduce(
  //         (total: any, product: any) => total + product.price,
  //         0
  //       );
  //     });
  // }

  loadCustomersAndProducts() {
    this.store.dispatch(loadCustomers());
    this.store.dispatch(loadProducts());
    this.customersSubscription = this.store
      .select(getCustomers)
      .subscribe((customers) => {
        this.customers = customers;
      });

    this.productsSubscription = this.store
      .select(getProducts)
      .subscribe((products) => {
        this.products = products;
      });
  }

  saveOrder() {
    if (this.orderForm.valid) {
      const _order: Order = {
        id: this.orderForm.value.id as number,
        customer: this.orderForm.value.customer as string,
        products: this.orderForm.value.products as unknown as string[],
        totalItens: this.orderForm.value.totalItens as number,
        totalValue: this.orderForm.value.totalValue as number,
      };
      if (_order.id === 0) {
        this.store.dispatch(addOrder({ order: _order }));
      } else {
        this.store.dispatch(updateOrder({ order: _order }));
      }
      this.closePopUp();
    }
  }

  closePopUp() {
    this.ref.close();
  }

  ngOnDestroy() {
    this.customersSubscription.unsubscribe();
    this.productsSubscription.unsubscribe();
  }
}

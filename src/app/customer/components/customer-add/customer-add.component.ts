import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Customer } from '../../store/model/customer';
import {
  addCustomer,
  updateCustomer,
} from '../../store/customer/customer.actions';
import { getCustomer } from '../../store/customer/customer.selectors';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss'],
})
export class CustomerAddComponent implements OnInit {
  title = 'Adicionar cliente';
  isEdit: boolean = false;
  dialogData: any;

  constructor(
    private fb: FormBuilder,
    private ref: MatDialogRef<CustomerAddComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.dialogData = this.data;
    this.title = this.dialogData.title;
    this.store.select(getCustomer).subscribe((res) => {
      this.customerForm.setValue({
        id: res.id,
        name: res.name,
        phone: res.phone,
        email: res.email,
        address: res.address,
        type: res.type,
      });
    });
  }

  customerForm = this.fb.group({
    id: [0, Validators.required],
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    type: ['PF', Validators.required],
  });

  saveCustomer() {
    if (this.customerForm.valid) {
      const _customer: Customer = {
        id: this.customerForm.value.id as number,
        name: this.customerForm.value.name as string,
        phone: this.customerForm.value.phone as string,
        email: this.customerForm.value.email as string,
        address: this.customerForm.value.address as string,
        type: this.customerForm.value.type as string,
      };
      if (_customer.id === 0) {
        this.store.dispatch(addCustomer({ customer: _customer }));
      } else {
        this.store.dispatch(updateCustomer({ customer: _customer }));
      }
      this.closePopUp();
    }
  }

  closePopUp() {
    this.ref.close();
  }
}

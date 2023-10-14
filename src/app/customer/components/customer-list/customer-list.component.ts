import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerAddComponent } from '../customer-add/customer-add.component';
import { Store } from '@ngrx/store';
import { Customer } from '../../store/model/customer';
import { getCustomers } from '../../store/customer/customer.selectors';
import {
  deleteCustomer,
  getCustomer,
  loadCustomers,
  openPopUp,
} from '../../store/customer/customer.actions';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  customers!: Customer[];
  dataSource: any;
  displayedColumns: string[] = [
    'id',
    'name',
    'phone',
    'email',
    'address',
    'type',
    'actions',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadCustomers());
    this.store.select(getCustomers).subscribe((data) => {
      this.customers = data;
      this.dataSource = new MatTableDataSource<Customer>(this.customers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  addCustomer() {
    this.openPopup(0, 'Adicionar Cliente');
  }

  updateCustomer(code: number) {
    this.openPopup(code, 'Editar Cliente');
    this.store.dispatch(getCustomer({ id: code }));
  }

  deleteCustomer(code: number) {
    if (confirm('Você deseja remover o cliente?')) {
      this.store.dispatch(deleteCustomer({ id: code }));
    }
  }

  openPopup(id: number, title: string) {
    this.store.dispatch(openPopUp());
    this.dialog.open(CustomerAddComponent, {
      width: '50%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        id: id,
        title: title,
      },
    });
  }
}

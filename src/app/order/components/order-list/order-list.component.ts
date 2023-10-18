import { MatPaginator } from '@angular/material/paginator';
import { Order } from './../../store/model/order';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  deleteOrder,
  getOrder,
  loadOrders,
  openPopUp,
} from '../../store/order/order.actions';
import { getOrders } from '../../store/order/order.selectors';
import { MatTableDataSource } from '@angular/material/table';
import { OrderAddComponent } from '../order-add/order-add.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orders!: Order[];
  dataSource: any;
  displayedColumns: string[] = [
    'id',
    'customer',
    'totalItens',
    'totalValue',
    'actions',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadOrders());
    this.store.select(getOrders).subscribe((data) => {
      this.orders = data;
      this.dataSource = new MatTableDataSource<Order>(this.orders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  addOrder() {
    this.openPopup(0, 'Adicionar Pedido');
  }

  updateOrder(code: number) {
    this.openPopup(code, 'Editar Pedido');
    this.store.dispatch(getOrder({ id: code }));
  }

  deleteOrder(code: number) {
    if (confirm('Você deseja remover o pedido?')) {
      this.store.dispatch(deleteOrder({ id: code }));
    }
  }

  openPopup(id: number, title: string) {
    this.store.dispatch(openPopUp());
    this.dialog.open(OrderAddComponent, {
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

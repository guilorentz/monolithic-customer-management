import { openPopUp } from './../../../product/store/product/product.actions';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  deleteProduct,
  getProduct,
  loadProducts,
} from '../../store/product/product.actions';
import { getProducts } from '../../store/product/product.selectors';
import { MatTableDataSource } from '@angular/material/table';
import { ProductAddComponent } from '../product-add/product-add.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Product } from '../../store/model/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products!: Product[];
  dataSource: any;
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'price',
    'actions',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
    this.store.select(getProducts).subscribe((data) => {
      this.products = data;
      this.dataSource = new MatTableDataSource<Product>(this.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  addProduct() {
    this.openPopup(0, 'Adicionar Produto');
  }

  updateProduct(code: number) {
    this.openPopup(code, 'Editar Produto');
    this.store.dispatch(getProduct({ id: code }));
  }

  deleteProduct(code: number) {
    if (confirm('Você deseja remover o produto?')) {
      this.store.dispatch(deleteProduct({ id: code }));
    }
  }

  openPopup(id: number, title: string) {
    this.store.dispatch(openPopUp());
    this.dialog.open(ProductAddComponent, {
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

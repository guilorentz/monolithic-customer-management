import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addProduct, updateProduct } from '../../store/product/product.actions';
import { Product } from '../../store/model/product';
import { getProduct } from '../../store/product/product.selectors';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent {
  title = 'Adicionar produto';
  isEdit: boolean = false;
  dialogData: any;

  constructor(
    private fb: FormBuilder,
    private ref: MatDialogRef<ProductAddComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.dialogData = this.data;
    this.title = this.dialogData.title;
    this.store.select(getProduct).subscribe((res) => {
      this.productForm.setValue({
        id: res.id,
        name: res.name,
        description: res.description,
        price: res.price,
      });
    });
  }

  productForm = this.fb.group({
    id: [0, Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, Validators.required],
  });

  saveProduct() {
    if (this.productForm.valid) {
      const _product: Product = {
        id: this.productForm.value.id as number,
        name: this.productForm.value.name as string,
        description: this.productForm.value.description as string,
        price: this.productForm.value.price as number,
      };
      if (_product.id === 0) {
        this.store.dispatch(addProduct({ product: _product }));
      } else {
        this.store.dispatch(updateProduct({ product: _product }));
      }
      this.closePopUp();
    }
  }

  closePopUp() {
    this.ref.close();
  }
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../product.service';
import {
  addProduct,
  addProductSuccess,
  deleteProduct,
  deleteProductSuccess,
  getProduct,
  getProductSuccess,
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess,
  updateProduct,
  updateProductSuccess,
} from './product.actions';
import { showAlert } from '../../../common/app.actions';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private service: ProductService) {}

  _loadProducts = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      exhaustMap((action) => {
        return this.service.getAllProducts().pipe(
          map((data) => {
            return loadProductsSuccess({ products: data });
          }),
          catchError((_error) =>
            of(loadProductsFailure({ error: _error.message }))
          )
        );
      })
    )
  );

  _getProduct = createEffect(() =>
    this.actions$.pipe(
      ofType(getProduct),
      exhaustMap((action) => {
        return this.service.getProductById(action.id).pipe(
          map((data) => {
            return getProductSuccess({ product: data });
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: `Ocorreu um erro: ${_error.message}`,
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _addProduct = createEffect(() =>
    this.actions$.pipe(
      ofType(addProduct),
      switchMap((action) => {
        return this.service.createProduct(action.product).pipe(
          switchMap((data) => {
            return of(
              addProductSuccess({ product: action.product }),
              showAlert({
                message: 'Produto adicionado com sucesso.',
                resultType: 'pass',
              })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Ocorreu um erro ao tentar adicionar um produto.',
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _updateProduct = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProduct),
      switchMap((action) => {
        return this.service.updateProduct(action.product).pipe(
          switchMap((data) => {
            return of(
              updateProductSuccess({ product: action.product }),
              showAlert({
                message: 'Produto atualizado com sucesso.',
                resultType: 'pass',
              })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message:
                  'Ocorreu um erro ao tentar atualizar os dados de um produto.',
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _deleteProduct = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct),
      switchMap((action) => {
        return this.service.deleteProduct(action.id).pipe(
          switchMap((data) => {
            return of(
              deleteProductSuccess({ id: action.id }),
              showAlert({
                message: 'Produto removido com sucesso.',
                resultType: 'pass',
              })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Ocorreu um erro ao tentar remover o produto.',
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OrderService } from '../../order.service';
import {
  addOrder,
  addOrderSuccess,
  deleteOrder,
  deleteOrderSuccess,
  getOrder,
  getOrderSuccess,
  loadOrders,
  loadOrdersFailure,
  loadOrdersSuccess,
  updateOrder,
  updateOrderSuccess,
} from './order.actions';
import { showAlert } from '../../../common/app.actions';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';

@Injectable()
export class OrderEffects {
  constructor(private actions$: Actions, private service: OrderService) {}

  _loadOrders = createEffect(() =>
    this.actions$.pipe(
      ofType(loadOrders),
      exhaustMap((action) => {
        return this.service.getAllOrders().pipe(
          map((data) => {
            return loadOrdersSuccess({ orders: data });
          }),
          catchError((_error) =>
            of(loadOrdersFailure({ error: _error.message }))
          )
        );
      })
    )
  );

  _getOrder = createEffect(() =>
    this.actions$.pipe(
      ofType(getOrder),
      exhaustMap((action) => {
        return this.service.getOrderById(action.id).pipe(
          map((data) => {
            return getOrderSuccess({ order: data });
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

  _addOrder = createEffect(() =>
    this.actions$.pipe(
      ofType(addOrder),
      switchMap((action) => {
        return this.service.createOrder(action.order).pipe(
          switchMap((data) => {
            return of(
              addOrderSuccess({ order: action.order }),
              showAlert({
                message: 'Pedido adicionado com sucesso.',
                resultType: 'pass',
              })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Ocorreu um erro ao tentar adicionar um pedido.',
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _updateOrder = createEffect(() =>
    this.actions$.pipe(
      ofType(updateOrder),
      switchMap((action) => {
        return this.service.updateOrder(action.order).pipe(
          switchMap((data) => {
            return of(
              updateOrderSuccess({ order: action.order }),
              showAlert({
                message: 'Pedido atualizado com sucesso.',
                resultType: 'pass',
              })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message:
                  'Ocorreu um erro ao tentar atualizar os dados de um pedido.',
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _deleteOrder = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteOrder),
      switchMap((action) => {
        return this.service.deleteOrder(action.id).pipe(
          switchMap((data) => {
            return of(
              deleteOrderSuccess({ id: action.id }),
              showAlert({
                message: 'Pedido removido com sucesso.',
                resultType: 'pass',
              })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Ocorreu um erro ao tentar remover o pedido.',
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );
}

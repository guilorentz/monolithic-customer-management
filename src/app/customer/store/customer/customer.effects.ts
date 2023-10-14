import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CustomerService } from '../../customer.service';
import {
  addCustomer,
  addCustomerSuccess,
  deleteCustomer,
  deleteCustomerSuccess,
  getCustomer,
  getCustomerSuccess,
  loadCustomers,
  loadCustomersFailure,
  loadCustomersSuccess,
  updateCustomer,
  updateCustomerSuccess,
} from './customer.actions';
import { showAlert } from '../../../common/app.actions';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';

@Injectable()
export class CustomerEffects {
  constructor(private actions$: Actions, private service: CustomerService) {}

  _loadCustomers = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCustomers),
      exhaustMap((action) => {
        return this.service.getAllCustomers().pipe(
          map((data) => {
            return loadCustomersSuccess({ customers: data });
          }),
          catchError((_error) =>
            of(loadCustomersFailure({ error: _error.message }))
          )
        );
      })
    )
  );

  _getCustomer = createEffect(() =>
    this.actions$.pipe(
      ofType(getCustomer),
      exhaustMap((action) => {
        return this.service.getCustomerById(action.id).pipe(
          map((data) => {
            return getCustomerSuccess({ customer: data });
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

  _addCustomer = createEffect(() =>
    this.actions$.pipe(
      ofType(addCustomer),
      switchMap((action) => {
        return this.service.createCustomer(action.customer).pipe(
          switchMap((data) => {
            return of(
              addCustomerSuccess({ customer: action.customer }),
              showAlert({
                message: 'Cliente adicionado com sucesso.',
                resultType: 'pass',
              })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Ocorreu um erro ao tentar adicionar um cliente.',
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _updateCustomer = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCustomer),
      switchMap((action) => {
        return this.service.updateCustomer(action.customer).pipe(
          switchMap((data) => {
            return of(
              updateCustomerSuccess({ customer: action.customer }),
              showAlert({
                message: 'Cliente atualizado com sucesso.',
                resultType: 'pass',
              })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message:
                  'Ocorreu um erro ao tentar atualizar os dados de um cliente.',
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _deleteCustomer = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCustomer),
      switchMap((action) => {
        return this.service.deleteCustomer(action.id).pipe(
          switchMap((data) => {
            return of(
              deleteCustomerSuccess({ id: action.id }),
              showAlert({
                message: 'Cliente removido com sucesso.',
                resultType: 'pass',
              })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Ocorreu um erro ao tentar remover o cliente.',
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );
}

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { emptyAction, showAlert } from './app.actions';
import { exhaustMap, map } from 'rxjs';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private snackBar: MatSnackBar) {}

  _showAlert = createEffect(() =>
    this.actions$.pipe(
      ofType(showAlert),
      exhaustMap((action) => {
        return this.showSnackBarAlert(action.message, action.resultType)
          .afterDismissed()
          .pipe(
            map(() => {
              return emptyAction();
            })
          );
      })
    )
  );

  showSnackBarAlert(message: string, resultType: string = 'fail') {
    let _class = resultType == 'pass' ? 'green-snack-bar' : 'red-snack-bar';
    return this.snackBar.open(message, 'OK', {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 2000,
      panelClass: [_class],
    });
  }
}

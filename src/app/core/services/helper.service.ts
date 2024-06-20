import { Injectable, inject } from '@angular/core';
import {
  MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { UIConstants } from '../constants/UIConstants';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  private snackbar = inject(MatSnackBar)
  constructor() { }
  openSnackBar(message: string, SNACK_BAR_TIMEOUT_MS = UIConstants.SNACK_BAR_TIMEOUT_MS ) {
    this.snackbar.open(`${message}`, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: SNACK_BAR_TIMEOUT_MS
    });
  }
}

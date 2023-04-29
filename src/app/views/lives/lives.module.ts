import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivesRoutingModule } from './lives-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from 'ngx-flexible-layout';
import { HomeComponent } from './home/home.component';
import { LiveListComponent } from './home/live-list/live-list.component';
import { LiveFormDialogComponent } from './home/live-form-dialog/live-form-dialog.component';
import { LocalDateTimePipe } from 'src/app/shared/pipe/local-date-time.pipe';
import { AppComponent } from 'src/app/app.component';
import { LiveEditDialogComponent } from './home/live-edit-dialog/live-edit-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { ConfirmDialogComponent } from './home/confirm-dialog/confirm-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    HomeComponent,
    LiveListComponent,
    LiveFormDialogComponent,
    LocalDateTimePipe,
    LiveEditDialogComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    LivesRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatGridListModule,
    FlexLayoutModule,
    MatChipsModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatMenuModule,
    MatSnackBarModule,
  ],
  providers: [LocalDateTimePipe],
  bootstrap: [AppComponent],
})
export class LivesModule {}

import { Component, Input, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Live } from 'src/app/shared/model/live.model';
import { LiveService } from 'src/app/shared/service/live.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-live-edit-dialog',
  templateUrl: './live-edit-dialog.component.html',
  styleUrls: ['./live-edit-dialog.component.css'],
})
export class LiveEditDialogComponent {
  @Input() public editedLive: Live; // Esta linha cria um objeto Live
  public liveForm: FormGroup; // Esta linha cria um objeto FormGroup

  constructor(
    private fb: FormBuilder, // Esta linha cria um objeto FormBuilder
    private rest: LiveService, // Esta linha cria um objeto LiveService
    public dialogRef: MatDialogRef<LiveEditDialogComponent>, // Esta linha cria um objeto MatDialogRef
    @Inject(MAT_DIALOG_DATA) public data: { live: Live } // Esta linha cria um objeto MAT_DIALOG_DATA
  ) {
    if (data && data.live) {
      // Esta linha verifica se o objeto data e o atributo live existem
      this.editedLive = data.live; // Esta linha atribui o valor do atributo live do objeto data ao atributo live do componente
    }
  }

  ngOnInit(): void {
    this.liveForm = this.fb.group({
      id: new FormControl(this.data.live.id),
      liveName: new FormControl(this.data.live.liveName, Validators.required),
      channelName: new FormControl(
        this.data.live.channelName,
        Validators.required
      ),
      liveLink: new FormControl(this.data.live.liveLink, Validators.required),
      liveDate: new FormControl(this.data.live.liveDate, Validators.required),
      liveTime: new FormControl(this.data.live.liveTime, Validators.required),
    });
  }

  cancel(): void {
    this.dialogRef.close();
    this.liveForm.reset();
  }

  saveChanges() {
    this.editedLive = { ...this.editedLive, ...this.liveForm.value };

    let newDate: moment.Moment = moment
      .utc(this.liveForm.value.liveDate)
      .local();
    this.editedLive.liveDate =
      newDate.format('YYYY-MM-DD') + 'T' + this.liveForm.value.liveTime;

    console.log('editedLive:', this.editedLive);
    this.rest.updateLive(this.editedLive).subscribe(
      () => {
        console.log('Live atualizada com sucesso');
        this.dialogRef.close();
        this.liveForm.reset();
        window.location.reload();
      },
      (error) => {
        console.log('Erro ao atualizar live', error);
      }
    );
  }
}

import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { Live } from 'src/app/shared/model/live.model';
import { LiveService } from 'src/app/shared/service/live.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-live-form-dialog',
  templateUrl: './live-form-dialog.component.html',
  styleUrls: ['./live-form-dialog.component.css'],
})
export class LiveFormDialogComponent {
  @Input() public live: Live;
  public liveForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rest: LiveService,
    public dialogRef: MatDialogRef<LiveFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { live: Live }
  ) {
    if (data && data.live) {
      // Esta linha verifica se o objeto data e o atributo live existem
      this.live = data.live; // Esta linha atribui o valor do atributo live do objeto data ao atributo live do componente
    }
  }

  ngOnInit(): void {
    this.liveForm = this.fb.group({
      liveName: ['', [Validators.required]],
      channelName: ['', [Validators.required]],
      liveLink: ['https://www.youtube.com/embed/', [Validators.required]],
      liveDate: ['', [Validators.required]],
      liveTime: ['', [Validators.required]],
    });

    if (this.live) {
      this.fillFormWithLiveData();
    }
  }

  fillFormWithLiveData() {
    this.liveForm.patchValue({
      liveName: this.live.liveName,
      channelName: this.live.channelName,
      liveLink: this.live.liveLink,
      liveDate: moment.utc(this.live.liveDate).local().format('YYYY-MM-DD'),
      liveTime: moment.utc(this.live.liveDate).local().format('HH:mm'),
    });
  }

  saveLive() {
    let newDate: moment.Moment = moment
      .utc(this.liveForm.value.liveDate)
      .local();
    this.liveForm.value.liveDate =
      newDate.format('YYYY-MM-DD') + 'T' + this.liveForm.value.liveTime;
    if (this.live) {
      this.live = { ...this.live, ...this.liveForm.value };
      this.rest.updateLive(this.live).subscribe((result) => {
        this.dialogRef.close();
        this.liveForm.reset();
        window.location.reload();
      });
    } else {
      this.rest.postLives(this.liveForm.value).subscribe((result) => {
        this.dialogRef.close();
        this.liveForm.reset();
        window.location.reload();
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
    this.liveForm.reset();
  }
}

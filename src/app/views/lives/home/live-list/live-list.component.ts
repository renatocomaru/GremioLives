import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Live } from 'src/app/shared/model/live.model';
import { LiveService } from 'src/app/shared/service/live.service';
import { MatDialog } from '@angular/material/dialog';
import { LiveEditDialogComponent } from '../live-edit-dialog/live-edit-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-live-list',
  templateUrl: './live-list.component.html',
  styleUrls: ['./live-list.component.css'],
})
export class LiveListComponent implements OnInit {
  livesPrevious: Live[];
  livesNext: Live[];
  next: boolean = false;
  previous: boolean = false;

  constructor(
    public liveService: LiveService,
    public sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getLives();
  }

  getLives() {
    this.liveService
      .getLivesWithFlag({ flag: 'previous' })
      .subscribe((data) => {
        this.livesPrevious = data.content;
        console.log(this.livesPrevious);
        this.livesPrevious.forEach((live) => {
          live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
            live.liveLink + '?origin=' + window.location.origin
          );
        });
        this.previous = true;
      });

    this.liveService.getLivesWithFlag({ flag: 'next' }).subscribe((data) => {
      this.livesNext = data.content;
      console.log(this.livesNext);
      this.livesNext.forEach((live) => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
          live.liveLink + '?origin=' + window.location.origin
        );
      });
      this.next = true;
    });
  }

  editLive(live: Live): void {
    const dialogRef = this.dialog.open(LiveEditDialogComponent, {
      minWidth: '400px',
      data: { live: live },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  // Método para deletar live
  deleteLive(live: Live): void {
    console.log(live.id);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Tem certeza de que deseja deletar a live "${live.liveName}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.liveService.deleteLive(live.id).subscribe(
          () => {
            // Atualiza a lista de lives
            this.snackBar.open('Live deletada com sucesso', 'Fechar', {
              duration: 3000,
            });
            // Atualiza a lista de lives após deleção
            this.getLives();
            window.location.reload();
          },
          (error) => {
            // Erro ao deletar live
            this.snackBar.open(
              'Erro ao deletar live. Por favor, tente novamente.',
              'Fechar',
              {
                duration: 3000,
              }
            );
          }
        );
      }
    });
    this.snackBar.open('Live deletada com sucesso', 'Fechar', {
      duration: 3000,
    });
  }

  // Método para compartilhar live
  shareLive(live: Live): void {
    // Implemente a lógica de compartilhamento de live aqui.
    this.snackBar.open('Link da live copiado', 'Fechar', {
      duration: 3000,
    });
  }
}

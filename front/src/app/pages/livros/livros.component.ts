import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { firstValueFrom, of, switchMap, tap } from 'rxjs';
import { Livro, LivrosService } from 'src/app/services/livro.service';
import { LoginService } from 'src/app/services/login.service';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.scss'],
})
export class LivrosComponent implements OnInit {

  constructor(private livrosService: LivrosService, private loginService: LoginService, private overlayservice: OverlayService) { }

  displayedColumns: string[] = ['nome', 'author', 'criadoPor', 'acoes'];
  dataSource = new MatTableDataSource<Livro>();

  @ViewChild('paginator') paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  livroForm: Livro = Object.create({})

  formulario: boolean = false;
  modoEdicao = false;
  btnSalvarTxt = 'Salvar'
  async ngOnInit(): Promise<void> {
    this.livroForm = Object.create({})
    await this.getLivros();
  }

  async getLivros() {
    await firstValueFrom(
      this.livrosService.getAllLivro().pipe(
        tap((data) => {
          this.dataSource.data = data;
        })
      )
    );
  }


  enviar() {
    if (this.modoEdicao === false) {
      this.livrosService.enviar(this.livroForm)
        .pipe(tap(async () => {
          await this.restartScreen();
        })).subscribe();
    } else {
      this.livrosService.update(this.livroForm)
        .pipe(tap(async () => {
          await this.restartScreen().then(async ()=>{
            await this.overlayservice.showToast("Registro alterado com sucesso")
          });
        }))
        .subscribe();
    }
  }

  async restartScreen() {
    this.voltar();
    await this.ngOnInit()
  }

  update(object: Livro) {
    this.livroForm = object;
    this.modoEdicao = true;
    this.formulario = true;
    this.btnSalvarTxt = 'Atualizar';

  }

  deletar(object: Livro) {
    this.overlayservice
      .showDialog(DeleteDialogComponent, object)
      .afterClosed()
      .pipe(
        switchMap(object => {
          if (!object) return of();
          return this.livrosService.deletar(object.id)
            .pipe(tap(()=>{
              this.restartScreen();
            }));
        })
      ).subscribe()
  }

  novo() {
    this.formulario = true;
    this.btnSalvarTxt = 'Salvar'
  }

  voltar() {
    this.formulario = false;
    this.modoEdicao = false;
    this.ngOnInit();
  }

  logout() {
    this.loginService.logout();
  }
}


@Component({
  template: `
    <mat-dialog-actions style="display: flex; flex-direction: column;" align="end">
      <div>
        <h2 mat-dialog-title>Deseja excluir "{{data.nome}}" ?</h2>
      </div>
      <div>
        <button mat-button mat-dialog-close cdkFocusInitial color="primary">Cancelar</button>
        <button mat-button [mat-dialog-close]="data"  color="warn">Excluir</button>
      </div>
    </mat-dialog-actions>
  `,
  standalone:true,
  imports:[
    MatDialogModule,
    MatButtonModule
  ]
})
class DeleteDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Livro,
  ) { }


  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { DelDialogComponent } from 'src/app/shared/del-dialog/del-dialog.component';
import { VeiculoDialogComponent } from 'src/app/shared/veiculo-dialog/veiculo-dialog.component';

export interface VeiculoCadastrado {
  id: number;
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: number;
}

const VEICULO_DATA: VeiculoCadastrado[] = [
  {id: 1, placa: 'MKZ-2246', chassi: '9BCRHFKSKP0157761', renavam: '05548472874', modelo: 'Onix', marca:'Chevrolet', ano: 2020},
  {id: 2, placa: 'LGK-7568', chassi: '9BFBJJRDUF2154878', renavam: '87585231451', modelo: 'Toro', marca:'Fiat', ano: 2019},
  {id: 3, placa: 'RPP-4468', chassi: '9BRHE21JX24060831', renavam: '96887652531', modelo: 'Duster', marca:'Renault', ano: 2020},
  {id: 4, placa: 'LPK-3547', chassi: '9BCKRERFJC3325465', renavam: '55487662543', modelo: 'Onix', marca:'Chevrolet', ano: 2022},
  {id: 5, placa: 'MJJ-3556', chassi: '9BRJFDEERE8879675', renavam: '68875132546', modelo: 'Argo', marca:'Fiat', ano: 2016},
  {id: 6, placa: 'MKZ-2246', chassi: '9BFFRGUDDI6874561', renavam: '96368542471', modelo: 'Fiesta', marca:'Ford', ano: 2015},
  {id: 7, placa: 'LLF-6897', chassi: '9BTFRJDWWF6577542', renavam: '21448702546', modelo: 'Corolla', marca:'Toyota', ano: 2018},
  {id: 8, placa: 'LRQ-6635', chassi: '9BRFFHDISI6963321', renavam: '66597874513', modelo: 'Kwid', marca:'Renault', ano: 2016},
  {id: 9, placa: 'MKZ-2246', chassi: '9BHRJJDOSO6674548', renavam: '12645856312', modelo: 'HR-V', marca:'Honda', ano: 2021}
];


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['id', 'placa', 'chassi', 'renavam', 'modelo', 'marca', 'ano', 'acao'];
  dataSource = VEICULO_DATA;

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar) {}

  ngOnInit(): void {
    
  }

  openDialog(veiculo: VeiculoCadastrado | null): void {
    const dialogRef = this.dialog.open(VeiculoDialogComponent, {
      width: '250px',
      data: veiculo === null ? {
        id: null,
        placa: "",
        chassi: "",
        renavam: "",
        modelo: "",
        marca: "",
        ano: "",
      } : {
        id: veiculo.id,
        placa: veiculo.placa,
        chassi: veiculo.chassi,
        renavam: veiculo.renavam,
        modelo: veiculo.modelo,
        marca: veiculo.marca,
        ano: veiculo.ano
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        if(this.dataSource.map(p => p.id).includes(result.id)){
          this.dataSource[result.id - 1] = result;
          this.table.renderRows();
          this.snackBar.open(`Veículo ${result.modelo} foi alterado
          .`, "X", {
            duration: 2000,
          });
        } else {
          this.dataSource.push(result);
          this.table.renderRows();
          this.snackBar.open(`Veículo ${result.modelo} foi adicionado.`, "X", {
            duration: 2000,
          });
        }        
      }
    });

  }

  openDelDialog(veiculo: VeiculoCadastrado, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DelDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.dataSource = this.dataSource.filter(p => p.id !== veiculo.id);
        this.snackBar.open(`Veículo ${veiculo.modelo} foi deletado.`, "X", {
          duration: 2000,
        });
      }
    });
  }

}
  
  

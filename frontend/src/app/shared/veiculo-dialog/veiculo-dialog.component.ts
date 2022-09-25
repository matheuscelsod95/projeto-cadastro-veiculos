import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VeiculoCadastrado } from 'src/app/models/VeiculoCadastrado';


@Component({
  selector: 'app-veiculo-dialog',
  templateUrl: './veiculo-dialog.component.html',
  styleUrls: ['./veiculo-dialog.component.css']
})
export class VeiculoDialogComponent implements OnInit {
  veiculo!: VeiculoCadastrado;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: VeiculoCadastrado,
    public dialogRef: MatDialogRef<VeiculoDialogComponent>
  ) {}

  ngOnInit(): void {
    if(this.data.id != null){
    this.isChange = true;
    } else
    { this.isChange = false }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}

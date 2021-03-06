import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {AddEditPiezaCatalogoComponent} from '../../../catalogo/add-edit-pieza-catalogo/add-edit-pieza-catalogo.component';
import {AlertDeletePiezaComponent} from '../../../catalogo/alert-delete-pieza/alert-delete-pieza.component';
import {AddEditConjuntoComponent} from './add-edit-conjunto/add-edit-conjunto.component';
import {SetsService} from '../../../../services/sets/sets.service';
import {SetMuseum} from '../../../../classes/set';

@Component({
  selector: 'app-admin-conjuntos',
  templateUrl: './admin-conjuntos.component.html',
  styleUrls: ['./admin-conjuntos.component.scss']
})
export class AdminConjuntosComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'descripcion', 'option'];
  dataSource: MatTableDataSource<SetMuseum>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, public router: Router,
              public _setsService: SetsService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._setsService.listSets()
      .subscribe(
        (sets: Array<SetMuseum>) => {
          console.log(sets);
          this.dataSource = new MatTableDataSource<SetMuseum>(sets);
          this.dataSource.paginator = this.paginator;
        }
      );
  }

  openModal(type, info?) {
    let dialogRef;
    if (type === 'new') {
      dialogRef = this.dialog.open(AddEditConjuntoComponent, {
        width: '40vw',
        data: {
          type: 'new'
        }
      });
    } else {
      dialogRef = this.dialog.open(AddEditConjuntoComponent, {
        width: '40vw',
        data: {
          type: 'edit',
          info: info
        }
      });
    }

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  deleteItem(info) {
    const dialogRef = this.dialog.open(AlertDeletePiezaComponent, {
      data: {
        info: {
          num_inventario: 12345,
          prefijo: 'el',
          tipo: 'conjunto'
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];

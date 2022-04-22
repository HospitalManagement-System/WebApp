import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EditDailogeComponent } from '../dailoge/edit-dailoge/edit-dailoge.component';
import { DailogeService } from 'src/app/Services/dailoge.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/appointment';

@Component({
  selector: 'app-nursedashboardgrid',
  templateUrl: './nursedashboardgrid.component.html',
  styleUrls: ['./nursedashboardgrid.component.css'],
})
export class NursedashboardgridComponent implements OnInit {
  displayedColumns = ['id', 'name', 'physician', 'diagnosis', 'edit'];
  dataSource1!: MatTableDataSource<Product>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {}) sort!: MatSort;

  pastVisit: string = 'PastVisit';
  constructor(
    public dialogService: MatDialog,
    public appoiService: DailogeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getdata();
  }
  getdata() {
    this.appoiService.getAppointmentData().subscribe((data) => {
      this.dataSource1 = new MatTableDataSource(data);
      this.dataSource1.paginator = this.paginator;
      console.log(this.dataSource1);
    });
  }
  startEdit(data: any[]) {
    const dialogRef = this.dialogService.open(EditDailogeComponent, {
      data: { data },
    });
    dialogRef.afterClosed();
  }
  applyFilter(filterValue: any) {
    let itemvalue = filterValue.target.value;
    this.dataSource1.filter = itemvalue.trim().toLowerCase();
    this.dataSource1.paginator = this.paginator;
  }
  onDelete(rowid: number) {
    this.appoiService.deletePostapp(rowid);
    this.getdata();
  }
  OnVisit(data: any) {
    console.log(data);
    let id = data['id'];
    console.log(id);
    this.appoiService.UpdateStatus(id, data).subscribe(r=>{
      this.getdata()  
    });
    
   
  }
}

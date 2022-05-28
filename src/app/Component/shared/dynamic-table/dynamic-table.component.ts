import {
  Component,
  ViewChild,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  OnInit,
  DoCheck,
  ChangeDetectorRef,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css'],
})
export class DynamicTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort, {}) sort !: MatSort;
 
  @Input() displayedColumns?: string[];
  @Input() receivedData: any;
  @Input() tableTitle?: string;
  @Input() columns: any[] = [];
  @Input() metaCount?: number;

  @Output() clickedItem = new EventEmitter();
  @Output() pageEvent = new EventEmitter<PageEvent>();
  @Output() filterEvent = new EventEmitter();

  dataSource !: MatTableDataSource<any>;

  pageIndex = 1;
  pageSize = 5;
  length = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.columns !== undefined || this.columns !== null) {
      console.log(this.receivedData);
      this.dataSource =new MatTableDataSource(this.receivedData);
      this.displayedColumns = this.columns.map((x) => x.columnDef);
      this.dataSource.paginator = this.paginator; 
  }
}

  ngOnChanges() {
    if (this.columns !== undefined || this.columns !== null) {
      console.log(this.receivedData);
      this.dataSource = new MatTableDataSource(this.receivedData);
console.log("vamsi"+this.paginator)
      this.displayedColumns = this.columns.map((x) => x.columnDef);
      this.dataSource.paginator = this.paginator;

      // this.dataSource.paginator.pageSize = this.pageSize;
      this.dataSource.paginator.pageIndex = this.pageIndex;

      this.dataSource.paginator.length = this.receivedData.length;
    }
  }

  applyFilter(filterValue:any) {
    filterValue = filterValue.target.value.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // applyFilter(filterValue: any) {

  //   let itemvalue = filterValue.target.value;  

  //   this.dataSource1.filter = itemvalue.trim().toLowerCase();

  //   this.dataSource1.paginator = this.paginator;



  // }
  updateProductsTable(event: PageEvent) {
    this.pageSize = event.pageSize;
   console.log(this.pageSize);
   if (this.columns !== undefined || this.columns !== null) {
   
    this.dataSource =new MatTableDataSource(this.receivedData);
  
    this.displayedColumns = this.columns.map((x) => x.columnDef);
   
    this.dataSource.paginator = this.paginator;

    this.dataSource.paginator.pageIndex = this.pageIndex;

    this.dataSource.paginator.length = this.receivedData.length;
    
    this.pageEvent.emit(event);
  }
  }

  viewItem(guid: any,columnDef:string) {
    this.clickedItem.emit({guid:guid,columnDef:columnDef});
  };
   filtertem(search: any) {
     console.log(search);
    this.filterEvent.emit(search);
  }
}

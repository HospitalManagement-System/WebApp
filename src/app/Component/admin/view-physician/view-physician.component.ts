import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { data } from '../../../models/data';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-physician',
  templateUrl: './view-physician.component.html',
  styleUrls: ['./view-physician.component.css'],
})
export class ViewPhysicianComponent implements OnInit {
  productSearchForm?: FormGroup;
  showProgress = false;
  showTableResults = false;

  results = data;
  allResults = data;
  fakeData: any;

  //row: any;

  //test
  value?: string = 'Hemanth';
  columns: any[] = [
    {
      columnDef: 'productName',
      header: 'Product Name',
      dataName: (row: { name: any }) => `${row.name}`,
    },
    {
      columnDef: 'productDescription',
      header: 'Description',
      dataName: (row: { description: any }) => `${row.description}`,
    },
    {
      columnDef: 'detailBtn',
      header: 'View/Edit',
      dataName: (row: { guid: any }) => `${row.guid}`,
    },
  ];
  pageIndex = 1;
  pageSize = 25;
  metaCount?: number;

  constructor(private userService: AdminService) {
    this.fakeData = data;
  }

  ngOnInit() {
    this.productSearchForm = new FormGroup({
      productSearchBox: new FormControl('', {
        validators: [Validators.required],
      }),
    });
  }

  onSubmit() {
    this.getProductsSearched(this.productSearchForm?.value.productSearchBox);
  }

  getProductsSearched(searchTerm: any) {
    alert(searchTerm)
    this.allResults = this.fakeData;
  }

  

  tabClick(tab: any) {
    if ((tab.index = 1)) {
      this.getAllProducts(this.pageIndex, this.pageSize);
    }
  }

  // Functions used by data-table component
  updatePagination(event: any) {
    const correctedIndex = event.pageIndex + 1;
    this.getAllProducts(correctedIndex, event.pageSize);
  }
  getAllProducts(pageIndex: number, pageSize: number) {
    // this.productSearchForm.reset(); // clear search field for better UX

    this.allResults = this.fakeData;
    this.metaCount = this.results.length;
    // console.log(this.metaCount);
    // console.log(this.results)
  }
  viewItem(guid: any) {
    alert(guid);
  let da=  this.fakeData.find((i: { guid: any; })=>i.guid==guid)
  alert(da.name);
  }
}

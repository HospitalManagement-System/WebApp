import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
// import { HospitalUser } from 'src/app/models/admin.model';
// import { Admi_Hospital_DATA } from 'src/app/models/AdminData';
import { HospitalUser } from 'src/app/models/HospitalUser';
import { AdminUsersService } from 'src/app/Services/Admin/admin-users.service';

@Component({
  selector: 'app-admin-hospital',
  templateUrl: './admin-hospital.component.html',
  styleUrls: ['./admin-hospital.component.css'],
})
export class AdminHospitalComponent {
  Hospital_DATA: HospitalUser[] = [];
  HospitalUserdataSource: MatTableDataSource<HospitalUser>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private serive: AdminUsersService) {
    // this.Hospital_DATA = Admi_Hospital_DATA;
    // this.HospitalUserdataSource = new MatTableDataSource(this.Hospital_DATA);
    this.HospitalUserdataSource = new MatTableDataSource(this.Hospital_DATA);
  }
  ngOnInit(): void {
    // var Get = localStorage.getItem('currentUser');
    // if (typeof Get === 'string') {
    //   var id = JSON.parse(Get).id;
    //   alert(id);
    // }
    this.serive.GetAdminHospitalUsers().subscribe((res) => {
      this.Hospital_DATA.push(...res);
      this.HospitalUserdataSource._updateChangeSubscription();
    });
  }

  //'id',
  displayedthreeColumns: string[] = [
    'firstName',
    'role',
    'specialization',
    'email',
    'contact',
    'isLocked',
    'isActive',
  ];

  HospitalapplyFilter(event: Event) {
    // alert(event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.HospitalUserdataSource.filter = filterValue.trim().toLowerCase();

    if (this.HospitalUserdataSource.paginator) {
      this.HospitalUserdataSource.paginator.firstPage();
    }
  }

  updateLockStatus(element: any) {
    //var Status = (element.activate = !element.activate);
    var Id = element.userId;
    var Status = !element.isLocked;
    this.serive
      .AdminLockHospitalUsers(Id, Status, 'Locked')
      .then((response) => response.text())
      .then((result) =>
        result === 'Success'
          ? this.refreshTableSorce()
          : alert('Please try again')
      )
      .catch((error) => console.log('error', error));
  }

  updateActiveStatus(element: any) {
    //var Status = (element.activate = !element.activate);
    var Id = element.userId;
    var Status = !element.isActive;
    this.serive
      .AdminLockHospitalUsers(Id, Status, 'Active')
      .then((response) => response.text())
      .then((result) =>
        result === 'Success'
          ? this.refreshTableSorce()
          : alert('Please try again')
      )
      .catch((error) => console.log('error', error));
  }

  refreshTableSorce() {
    window.location.reload();
  }

  ngAfterViewInit(): void {
    //Patient
    this.HospitalUserdataSource.paginator = this.paginator;
    this.HospitalUserdataSource.sort = this.sort;
    //throw new Error('Method not implemented.');
  }
}

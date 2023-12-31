import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { CartService } from 'src/app/cart/services/cart.service';
import { ProductService } from 'src/app/products/services/product.service';

@Component({
  selector: 'app-searchbyimage',
  templateUrl: './searchbyimage.component.html',
  styleUrls: ['./searchbyimage.component.css'],
})
export class SearchbyimageComponent {
  constructor(
    private http: HttpClient,
    private toast: NgToastService,
    private service: ProductService,
    private service2: CartService
  ) {}
  SearchProduct: any = [];
  // selectedfile: any;
  // onChangeFile(event: any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     if (file.type === 'image/png' || file.type === 'image/jpeg') {
  //       const formData = new FormData();
  //       formData.set('file', file);
  //       console.log(formData);
  //       console.log(file);
  //       this.http
  //         .post(
  //           'http://18.159.111.193/api/Product/recommendByImage?PageNumber=1&PageSize=10&FieldsToExclude=Features',
  //           formData
  //         )
  //         .subscribe((res) => {
  //           console.log(res);
  //           //Edit here
  //         });
  //     } else {
  //       this.toast.error({
  //         detail: 'ERROR',
  //         summary: 'Please elect only jpeg or png files',
  //         duration: 5000,
  //       });
  //     }
  //   }
  // }
  name: string = '';
  file: any;
  getName(name: string) {}
  getFile(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }
  submitData() {
    let fd = new FormData();
    fd.append('imageFile', this.file);

    this.http
      .post(
        'http://18.159.111.193/api/Product/recommendByImage?PageNumber=1&PageSize=6&FieldsToExclude=Features',
        fd
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.SearchProduct = res;
          //Edit here
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // uploadFile(file: File) {
  //   const formData = new FormData();
  //   formData.append('file', file);

  //   const url = 'http://18.159.111.193/api/Product/recommendByImage?PageNumber=1&PageSize=10&FieldsToExclude=Features';

  //   return this.http.post(url, formData);
  // }

  // onFileSelected(event:any) {
  //   const file = event.target.files[0];
  //   this.uploadFile(file).subscribe(
  //     (response) => {
  //       console.log(response);
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }
  addingToChart(event: any) {
    this.service2.addToChart(event);
  }

  loggedin() {
    return localStorage.getItem('login');
  }
}

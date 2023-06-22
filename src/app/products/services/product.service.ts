import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentInterface } from '../types/comment.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  amountFromDetais!: number;
  reviews: any = [];
  productId: any = '';
  getAllProducts() {
    return this.http.get(
      'http://18.159.111.193/api/Product?PageNumber=1&PageSize=30&FieldsToExclude=Features'
    );
  }
  getAllProductsByPages(pageNum: string) {
    return this.http.get(
      'http://18.159.111.193/api/Product?PageNumber=' +
        pageNum +
        '&PageSize=30&FieldsToExclude=Features'
    );
  }
  getProductCtegories() {
    return this.http.get(
      'http://18.159.111.193/api/ProductCategory/ProductCategories?PageNumber=1&PageSize=50'
    );
  }
  getProductByCtegories(keyward: string) {
    return this.http.get(
      'http://18.159.111.193/api/Product?PageNumber=1&PageSize=20&FieldsToExclude=Features&ProductCategoryIds=' +
        keyward
    );
  }

  getProductById(id: any) {
    return this.http.get(
      'http://18.159.111.193/api/Product/' + id + '?FieldsToExclude=Features'
    );
  }
  // getRateProductById(id: any) {
  //   return this.http.get(
  //     'http://18.159.111.193/api/Rating/' + id
  //   );
  // }

  getMostPopular() {
    return this.http.get(
      'http://18.159.111.193/api/Product?PageNumber=2&PageSize=6&FieldsToExclude=Features%2CDescription&orderBy=-VoteCount'
    );
  }

  getProductReviews(id: any) {
    return this.http.get(
      'http://18.159.111.193/api/Review?productId=' +
        id +
        '&PageNumber=1&PageSize=10&orderBy=-'
    );
  }

  createproductReviews(
    user: string = 'A1YSN09LPZDZST',
    prodId: string,
    reviewTxt: string
  ): Observable<CommentInterface> {
    return this.http.post<any>('http://18.159.111.193/api/Review', {
      userId: user,
      productId: prodId,
      reviewText: reviewTxt,
    });
  }
}

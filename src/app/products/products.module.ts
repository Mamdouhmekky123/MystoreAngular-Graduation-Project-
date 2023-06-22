import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductlistComponent } from './components/productlist/productlist.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { SingleproductComponent } from './components/singleproduct/singleproduct.component';
import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { CommentsModule } from '../comments/comments.module';
import { RatingComponent } from './components/rating/rating.component';
import { NgbModule, NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { CommentaryComponent } from './components/commentary/commentary.component';
import { SinglecommentComponent } from './components/singlecomment/singlecomment.component';
import { SearchbyimageComponent } from './components/searchbyimage/searchbyimage.component';

@NgModule({
  declarations: [
    ProductlistComponent,
    ProductdetailsComponent,
    SingleproductComponent,
    SearchComponent,
    RatingComponent,
    CommentaryComponent,
    SinglecommentComponent,
    SearchbyimageComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    CommentsModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  exports: [
    ProductlistComponent,
    ProductdetailsComponent,
    SingleproductComponent,
    SearchComponent,
    RatingComponent,
    CommentaryComponent,
    SinglecommentComponent,
  ],
})
export class ProductsModule {}

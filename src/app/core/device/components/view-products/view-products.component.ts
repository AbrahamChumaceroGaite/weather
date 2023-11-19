import { Table } from 'primeng/table';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { product } from 'src/app/models/product';
import { category } from 'src/app/models/category';
import { LazyLoadEvent } from 'primeng/api';
import { ShareDataService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css'],
})
export class ViewProductsComponent {
  @ViewChild('dt') dt!: Table;
 selectedCategory : any;
  productData!: product[];
  categories: category[] = [];
  filterValue: string = '';
  totalRecords = 0;
  loading = false;
  constructor(private ShareDataService: ShareDataService ) {  
   }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.ShareDataService.getCategoryList().subscribe((data: category[]) => {
      this.categories = data;     
      this.selectedCategory = this.categories[0].id;       
      this.filterDataProduct(this.selectedCategory);
    })
  }

  getProducts(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      this.ShareDataService.getProductList(this.selectedCategory, event).subscribe((data: any) => {
        this.productData = data.items;
        this.totalRecords = data.totalRecords
        this.loading = false;
      }, (err) => {
        this.loading = false;
      });
    }, 2000);
  }

  filterDataProduct(event: any) {
    this.loading = true;
    this.selectedCategory = event;
    this.reloadTable();
  }

  filterByName() {
    this.loading = true;
    if (this.filterValue) {
      this.dt.filterGlobal(this.filterValue, 'contains');
    } else {
      this.dt.filterGlobal(null, 'contains'); // Restablecer el filtro global
    }
  }

  reloadTable() {
    const lazyLoadEvent: LazyLoadEvent = {
      first: 0,
      rows: 10,
    };
    this.getProducts(lazyLoadEvent);
  }
}


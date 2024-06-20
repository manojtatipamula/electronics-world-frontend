import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import Fuse from 'fuse.js';
import { CartManagementService } from '../../core/services/cart-management.service';
import { APIConstants } from '../../core/constants/APIConstants';
import { ProductService } from '../../core/services/product.service';
import { HelperService } from '../../core/services/helper.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatButtonModule,
    RouterLink,
    RouterOutlet,
    MatCardModule,
    MatGridListModule,
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private cartManagementService = inject(CartManagementService)
  private breakpointObserver = inject(BreakpointObserver)
  private productService = inject(ProductService)
  private helperService = inject(HelperService)
  cols = 5
  categoriesFormControl = new FormControl('');
  searchTermControl = new FormControl('')

  categoriesList: string[] = APIConstants.PRODUCT_CATEGORIES

  products: any = [];
  productsStash: any = []

  fuse: any;
  fuseOptions = {
    keys: ['name'], // Search by product name
    threshold: 0.3 // Adjust threshold for fuzzy matching (0-1)
  };

  constructor() {
    this.registerDependencies()
  }

  ngOnInit(): void {
    this.getProductInventoryFromBackend()
  }

  registerDependencies(){
    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.TabletPortrait,
      Breakpoints.TabletLandscape,
      Breakpoints.WebPortrait,
      Breakpoints.WebLandscape,
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.HandsetPortrait]) {
          this.cols = 1;
        } else if (result.breakpoints[Breakpoints.HandsetLandscape] || result.breakpoints[Breakpoints.TabletPortrait] || result.breakpoints[Breakpoints.TabletLandscape]) {
          this.cols = 2;
        } else {
          this.cols = 4;
        }
      }
    });
    this.searchTermControl.valueChanges.subscribe(searchTerm => {
      console.log("DashboardCompoent: searchterm" , [searchTerm])
      if(searchTerm){
       this.products =  this.fuse.search(searchTerm).map((result: any) => result.item)
      }else {
        console.log("DashboardCompoent: this.products" , this.products)
        console.log("DashboardCompoent: this.categoriesFormControl.value" , this.categoriesFormControl.value)
        if(!this.categoriesFormControl.value) {
          this.products = this.productsStash
        }else {
          this.applyCategory(this.categoriesFormControl.value)
        }
      }
    });
  }
  applyCategory(selectedCategories:any){
    if(selectedCategories.length > 0){
      this.products = this.productsStash.filter((product: any) => {
        const foundCategory = selectedCategories.find((sel: any) => { return sel === product.category })
        return foundCategory ? true : false
      })
    }
  }
  applyCategoryFilter(event: MatSelectChange) {
    console.log("DashboardCompoent: applyCategoryFilter ", event.value)
    if (event.value.length > 0) {
      this.applyCategory(event.value)
      console.log("DashboardCompoent products len", this.products.length)
      console.log("DashboardCompoent: stash len", this.productsStash.length)
    } else {
      this.products = this.productsStash
    }
    this.updateFuse()
  }
  resetProducts() {
    this.products = this.productsStash;
    this.categoriesFormControl.reset()
    this.searchTermControl.reset()
    this.updateFuse()
  }
  updateFuse() {
    this.fuse.setCollection(this.products);
  }

  getProductInventoryFromBackend(){
    this.productService.getProductInventory().subscribe({
      next: (response:any) => {
        this.productsStash = response.data.map((item:any)=>{
          item.selectedQuantity = 0
          return item
        })
        this.products = [... this.productsStash]
        this.fuse = new Fuse(this.products, this.fuseOptions);
      },
      error: (error:any) => {
        console.error('API error:', error);
        if (!error.status) {
          this.helperService.openSnackBar(`Internal Server Error!!`)
        }
        if (error && error.error && error.error.message) {
          this.helperService.openSnackBar(`${error.error.message}`)
        }
      },
      complete: () => {
        console.log('getProductInventory API call completed');
      },
    });
  }
  decreaseStock(product: any) {
    console.log("Decrease stock triggered for ", product.name)
    if (product.selectedQuantity <= 0) {
      return
    }
    product.selectedQuantity--

  }
  increaseStock(product: any) {
    console.log("Increase stock triggered", product.name)
    console.log(product.selectedQuantity)
    if (product.selectedQuantity < product.stock) {
      product.selectedQuantity++
    } else {
      console.error("Cant add stock , max is", product.stock)
    }
  }

  addToCart(product: any) {
    this.cartManagementService.addToCart(product)
  }
}

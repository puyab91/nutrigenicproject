import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResizeDetectionService } from '../../services/resize-detection.service';
import { OurShopService } from '../../services/our-shop/our-shop.service';
import { OurShopModel } from '../../models/our-shop/our-shop-model';

@Component({
    selector: 'app-ourshop',
    templateUrl: './ourshop.component.html',
    styleUrls: ['./ourshop.component.scss']
})
export class OurShopComponent {
    tabItems: any[] = [];
    selectedMasterTab: number | null = 1;
    ourShopsModel: OurShopModel[] = [];
    counter: number = 1;
    value: number = 4
    search: string = '';
    searchIcon = true;
    isTablet: boolean = false;
    isMobile: boolean = false;
    isDesktop: boolean = false;

    constructor(private router: Router,
        private sizedetection: ResizeDetectionService,
        private ourShopService: OurShopService) { }

    ngOnInit() {
        this.sizedetection.refreshSize();
        this.sizedetection.sizeCondition$.subscribe(data => {
            this.isDesktop = data.isDesktop;
            this.isTablet = data.isTablet;
            this.isMobile = data.isMobile;
        });

        this.tabItems = [
            { name: 'Snacks', id: 1 },
            { name: 'Health boost ingredients', id: 2 },
            { name: 'Fine Supplements', id: 3 },
            { name: 'Vitamins', id: 4 }
        ]

        this.ourShopService.getsnacks().subscribe((response: any) => {
            this.addToPageModel(response.body.data);
        });


    }

    shopCategoryChange(id: number) {
        if (id == 1)
            this.ourShopService.getsnacks().subscribe((response: any) => {
                console.log(response);
                this.addToPageModel(response.body.data);
            });
        else if (id == 2)
            this.ourShopService.getHealthBoostIngredients().subscribe((response: any) => {
                console.log(response);
                this.addToPageModel(response.body.data);
            });
        else if (id == 3)
            this.ourShopService.getFineSupplements().subscribe((response: any) => {
                console.log(response);
                this.addToPageModel(response.body.data);
            });
        else if (id == 4)
            this.ourShopService.getVitamins().subscribe((response: any) => {
                console.log(response);
                this.addToPageModel(response.body.data);
            });
    }

    addToPageModel(data: any[]) {
        this.ourShopsModel.splice(0);
        data.forEach(item => {
            var ourShopModel = new OurShopModel();
            ourShopModel.id = item.id;
            ourShopModel.name = item.name;
            ourShopModel.price = item.price;
            ourShopModel.quantity = item.quantity;
            ourShopModel.image_path = item.image_path;
            ourShopModel.image_path = item.description_image_path;

            this.ourShopsModel.push(ourShopModel);
        });
    }
    inputTextChange(event: any) {
        var x = event;
        if (this.search == '')
            this.searchIcon = true;
        else
            this.searchIcon = false;

    }
}
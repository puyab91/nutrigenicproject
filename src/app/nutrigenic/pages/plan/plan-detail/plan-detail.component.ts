import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Subscription, debounceTime, fromEvent } from 'rxjs';
import { ResizeDetectionService } from '../../../services/resize-detection.service';
import { ActivatedRoute } from '@angular/router';
import { MealModel } from 'src/app/nutrigenic/models/home/meal-model';
import { HomeService } from 'src/app/nutrigenic/services/home/home.service';
import { PlanOrderDetailModel } from 'src/app/nutrigenic/models/plan/plan-order-detail-model';

@Component({
    selector: 'app-plan',
    templateUrl: './plan-detail.component.html',
    styleUrls: ['./plan-detail.component.scss']
})
export class PlanDetailComponent {
    isTablet: boolean = false;
    isMobile: boolean = false;
    isDesktop: boolean = false;
    tabItems: any[] = [];
    selectedTab: number | null = 0;
    search: string = '';
    searchIcon = true;
    planOrderDetails: PlanOrderDetailModel = new PlanOrderDetailModel();
    mealsModel: MealModel[] = [];
    filteredMeals: MealModel[] = [];
    AddedMeals: MealModel[] = [];
    selectedMealsTrigger: boolean = false;
    amountTrigger: boolean = false;

    constructor(private route: ActivatedRoute,
        private sizedetection: ResizeDetectionService,
    private homeService: HomeService) {

        this.route.queryParams.subscribe((params: any) => {
            this.planOrderDetails.type = params.type
            this.planOrderDetails.weeks = params.weeks;
            this.planOrderDetails.mealPerDay = params.mealPerDay;
            this.planOrderDetails.dayPerWeek = params.dayPerWeek; 
            console.log(this.planOrderDetails);           
          });
    }

    ngOnInit() {
        this.sizedetection.refreshSize();
        this.sizedetection.sizeCondition$.subscribe(data => {
            this.isDesktop = data.isDesktop;
            this.isTablet = data.isTablet;
            this.isMobile = data.isMobile;
        });


          this.tabItems = [
            { name: 'Home', id: 0 },
            { name: 'Lean Gains', id: 1 },
            { name: 'Fat Loss', id: 2 },
            { name: 'Muscle Gain', id: 3 },
            { name: 'General Health', id: 4 },
            { name: 'Weight Loss', id: 8 },
        ]

        this.getMeals();

    }

    addToCart(id: number){
        this.mealsModel.filter((item:any) => item.id == id)[0].isAdded = true;
        this.filterAddedMeals();
    }

    getMeals() {
        this.homeService.getMeals().subscribe((response: any) => {
            response.body.data.forEach((item: any) => {
                var mealModel = new MealModel();
                mealModel.id = item.id;
                mealModel.name = item.name;
                mealModel.description = item.description;
                mealModel.type = item.type;
                mealModel.is_master_meal = item.is_master_meal;
                mealModel.photo_path = item.photo_path;
                mealModel.energyKcal = parseInt(item.nutrition.energyKcal);
                mealModel.protein = parseInt(item.nutrition.protein);
                mealModel.fat = parseInt(item.nutrition.fat);
                mealModel.availableCarbohydrate = parseInt(item.nutrition.availableCarbohydrate);
                mealModel.sugars = parseInt(item.nutrition.sugars);
                mealModel.sodium = parseInt(item.nutrition.sodium);
                mealModel.categoryId = item.categories.id;
                mealModel.categoryKey = item.categories.key_name;
                mealModel.categoryName = item.categories.name;
                mealModel.alergies = "Alergy 1\nAlergy 2\nAlergy 3\n";
                this.mealsModel.push(mealModel);
            });
            this.selectedTab = 0;
            this.filteredMeals = this.mealsModel;
        })
    }

    filterAddedMeals(){
        this.AddedMeals = this.filteredMeals.filter((item:any) => item.isAdded == true);
    }

    showCheckoutDetails(item:string){
        if(item == 'selectedMeals')
            this.selectedMealsTrigger = !this.selectedMealsTrigger;
            if(item == 'amount')
                this.amountTrigger = !this.amountTrigger;
    }

    shopCategoryChange(id: number) {
var x= id;
    }

    inputTextChange(event: any) {
        var x = event;
        if (this.search == '')
            this.searchIcon = true;
        else
            this.searchIcon = false;

    }
}
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Subscription, debounceTime, fromEvent } from 'rxjs';
import { UserProfileService } from '../../services/profile/user-profile.service';
import { ResizeDetectionService } from '../../services/resize-detection.service';
import { HomeService } from '../../services/home/home.service';
import { MealModel } from '../../models/home/meal-model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss', './home-mobile.component.scss', './home-tablet.component.scss']
})
export class HomeComponent {
    chefs: any[] = [];
    experts: any[] = [];
    masterPlanData: any[] = [];
    tabItems: any[] = [];
    menuItems = ['Home', 'About us', 'Privacy Policy', 'Terms & Conditions', 'FAQs'];
    selectedMasterTab: number | null = 0;
    mealsModel: MealModel[] = [];
    filteredMasterPlan: MealModel[] = [];
    comments: any = [];
    responsiveOptions: any[] = [];
    images: string[] = [];
    isTablet: boolean = false;
    isMobile: boolean = false;
    isDesktop: boolean = false;
    constructor(private sizedetection: ResizeDetectionService,
        private homeService: HomeService
    ) {
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

        this.chefs = [
            {
                id: 1, name: 'name', sureName: 'Surename', imgUrl: '../../../../assets/images/Dish-right.png'
            },
            {
                id: 2, name: 'name2', sureName: 'Surename2', imgUrl: '../../../../assets/images/Dish-right.png'
            }
        ];

        this.experts = [
            {
                id: 1, name: 'name', sureName: 'Surename', imgUrl: '../../../../assets/images/Dish-right.png'
            },
            {
                id: 2, name: 'name2', sureName: 'Surename2', imgUrl: '../../../../assets/images/Dish-right.png'
            }
        ]

        this.masterPlanData = [
            { title: 'Dark green vegtables', description: 'The best part is that green leafy vegetables can be enjoyed in many ways.', Energy: '220 kcal', fats: '4,3 gr', protein: '8,2 gr', carbs: '8,2 gr', sugar: '8,2 gr', salts: '4.3 gr', imgUrl: '../../../../assets/images/masterImage.png' },
            { title: 'Dark green vegtables', description: 'The best part is that green leafy vegetables can be enjoyed in many ways.', Energy: '220 kcal', fats: '4,3 gr', protein: '8,2 gr', carbs: '8,2 gr', sugar: '8,2 gr', salts: '4.3 gr', imgUrl: '../../../../assets/images/masterImage.png' },
            { title: 'Dark green vegtables', description: 'The best part is that green leafy vegetables can be enjoyed in many ways.', Energy: '220 kcal', fats: '4,3 gr', protein: '8,2 gr', carbs: '8,2 gr', sugar: '8,2 gr', salts: '4.3 gr', imgUrl: '../../../../assets/images/masterImage.png' },
            { title: 'Dark green vegtables', description: 'The best part is that green leafy vegetables can be enjoyed in many ways.', Energy: '220 kcal', fats: '4,3 gr', protein: '8,2 gr', carbs: '8,2 gr', sugar: '8,2 gr', salts: '4.3 gr', imgUrl: '../../../../assets/images/masterImage.png' },
            { title: 'Dark green vegtables', description: 'The best part is that green leafy vegetables can be enjoyed in many ways.', Energy: '220 kcal', fats: '4,3 gr', protein: '8,2 gr', carbs: '8,2 gr', sugar: '8,2 gr', salts: '4.3 gr', imgUrl: '../../../../assets/images/masterImage.png' },
            { title: 'Dark green vegtables', description: 'The best part is that green leafy vegetables can be enjoyed in many ways.', Energy: '220 kcal', fats: '4,3 gr', protein: '8,2 gr', carbs: '8,2 gr', sugar: '8,2 gr', salts: '4.3 gr', imgUrl: '../../../../assets/images/masterImage.png' },
            { title: 'Dark green vegtables', description: 'The best part is that green leafy vegetables can be enjoyed in many ways.', Energy: '220 kcal', fats: '4,3 gr', protein: '8,2 gr', carbs: '8,2 gr', sugar: '8,2 gr', salts: '4.3 gr', imgUrl: '../../../../assets/images/masterImage.png' },
            { title: 'Dark green vegtables', description: 'The best part is that green leafy vegetables can be enjoyed in many ways.', Energy: '220 kcal', fats: '4,3 gr', protein: '8,2 gr', carbs: '8,2 gr', sugar: '8,2 gr', salts: '4.3 gr', imgUrl: '../../../../assets/images/masterImage.png' },
            { title: 'Dark green vegtables', description: 'The best part is that green leafy vegetables can be enjoyed in many ways.', Energy: '220 kcal', fats: '4,3 gr', protein: '8,2 gr', carbs: '8,2 gr', sugar: '8,2 gr', salts: '4.3 gr', imgUrl: '../../../../assets/images/masterImage.png' },
            { title: 'Dark green vegtables', description: 'The best part is that green leafy vegetables can be enjoyed in many ways.', Energy: '220 kcal', fats: '4,3 gr', protein: '8,2 gr', carbs: '8,2 gr', sugar: '8,2 gr', salts: '4.3 gr', imgUrl: '../../../../assets/images/masterImage.png' },
            { title: 'Dark green vegtables', description: 'The best part is that green leafy vegetables can be enjoyed in many ways.', Energy: '220 kcal', fats: '4,3 gr', protein: '8,2 gr', carbs: '8,2 gr', sugar: '8,2 gr', salts: '4.3 gr', imgUrl: '../../../../assets/images/masterImage.png' },
            { title: 'Dark green vegtables', description: 'The best part is that green leafy vegetables can be enjoyed in many ways.', Energy: '220 kcal', fats: '4,3 gr', protein: '8,2 gr', carbs: '8,2 gr', sugar: '8,2 gr', salts: '4.3 gr', imgUrl: '../../../../assets/images/masterImage.png' },

        ];

        this.comments = [
            { stars: 5, time: '2 days ago', title: 'Best on the market', description: 'i love this product i love this product', user: 'worldTraveler' },
            { stars: 2, time: '2 days ago', title: 'Best on the market', description: 'i love this product i love this product', user: 'worldTraveler' },
            { stars: 1, time: '2 days ago', title: 'Best on the market', description: 'i love this product i love this product', user: 'worldTraveler' },
            { stars: 3, time: '2 days ago', title: 'Best on the market', description: 'i love this product i love this product', user: 'worldTraveler' },
            { stars: 2, time: '2 days ago', title: 'Best on the market', description: 'i love this product i love this product', user: 'worldTraveler' },
            { stars: 5, time: '2 days ago', title: 'Best on the market', description: 'i love this product i love this product', user: 'worldTraveler' },
            { stars: 5, time: '2 days ago', title: 'Best on the market', description: 'i love this product i love this product', user: 'worldTraveler' },
            { stars: 4, time: '2 days ago', title: 'Best on the market', description: 'i love this product i love this product', user: 'worldTraveler' },
            { stars: 5, time: '2 days ago', title: 'Best on the market', description: 'i love this product i love this product', user: 'worldTraveler' },
            { stars: 3, time: '2 days ago', title: 'Best on the market', description: 'i love this product i love this product', user: 'worldTraveler' },
            { stars: 5, time: '2 days ago', title: 'Best on the market', description: 'i love this product i love this product', user: 'worldTraveler' },
            { stars: 2, time: '2 days ago', title: 'Best on the market', description: 'i love this product i love this product', user: 'worldTraveler' },
            { stars: 5, time: '2 days ago', title: 'Best on the market', description: 'i love this product i love this product', user: 'worldTraveler' },
            { stars: 1, time: '2 days ago', title: 'Best on the market', description: 'i love this product i love this product', user: 'worldTraveler' },
            { stars: 5, time: '2 days ago', title: 'Best on the market', description: 'i love this product i love this product', user: 'worldTraveler' },
        ];

        this.images = [
            'assets/images/Ouichef.png',
            'assets/images/TH_Main.png',
            'assets/images/Salvo.png',
            'assets/images/clorence.png',
            'assets/images/Ouichef.png',
            'assets/images/TH_Main.png',
            'assets/images/Salvo.png',
            'assets/images/clorence.png',
            'assets/images/Ouichef.png',
            'assets/images/TH_Main.png',
            'assets/images/Salvo.png',
            'assets/images/clorence.png',
        ];
    }

    getMeals() {
        this.homeService.getMeals().subscribe((response: any) => {
            console.log(response);

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
                this.mealsModel.push(mealModel);
            });
            this.selectedMasterTab = 0;
            this.filteredMasterPlan = this.mealsModel;
        })
    }

    masterCategoryChange(id: number) {
        if (id == 0)
            this.filteredMasterPlan = this.mealsModel;
        else
            this.filteredMasterPlan = this.mealsModel.filter((item) => item.id == id);
    }
    onItemClick(item: any): void {
        this.selectedMasterTab = item.label;
    }


}

export class MealModel {
    id: number;
    name: string;
    description: string;
    type: string;
    yeald: number;
    energyKcal: number;
    protein: number;
    fat: number;
    sugars: number;
    availableCarbohydrate: number;
    sodium: number;
    is_master_meal: boolean;
    photo_path: string;
    categoryId: number;
    categoryKey: string;
    categoryName: string;

    constructor() {
        this.id = 0;
        this.name = '';
        this.description = '';
        this.type = '';
        this.yeald = 0;
        this.energyKcal = 0;
        this.protein = 0;
        this.fat = 0;
        this.sugars = 0;
        this.availableCarbohydrate = 0;
        this.sodium = 0;
        this.is_master_meal = false;
        this.categoryId = 0;
        this.photo_path = '';
        this.categoryKey = '';
        this.categoryName = '';
    }
}
export class PlanOrderDetailModel{
    type: string;    
    weeks: number;
    mealPerDay: number;
    dayPerWeek: number;
    
    constructor(){
        this.type = '';
        this.weeks = 0;
        this.mealPerDay = 0;
        this.dayPerWeek = 0;
    }
}
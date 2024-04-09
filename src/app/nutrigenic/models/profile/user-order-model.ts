export class UserOrderModel{
    id: number;
    order_type: string;
    order_num: string;
    total_amount: string;
    discount_amount: string;
    shipment_amount: string;
    expert_id: string;
    meals_per_day: string;
    days_per_week: string;
    weeks: string;
    address: string;
    city: string;
    zip: string;
    order_detail: any;

    constructor(){
        this.id = 0;
        this.order_type = '';
        this.order_num = '';
        this.total_amount = '';
        this.discount_amount = '';
        this.shipment_amount = '';
        this.expert_id = '';
        this.meals_per_day = '';
        this.days_per_week = '';
        this.weeks = '';
        this.address = '';
        this.city = '';
        this.zip = '';
        this.order_detail = [];
    }
} 
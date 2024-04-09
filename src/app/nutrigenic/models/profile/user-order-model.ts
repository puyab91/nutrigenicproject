export class UserOrderModel{
    id: number;
    order_type: string;
    order_num: string;
    total_amount: string;
    order_date: string;
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
    statusId: any;
    status: any;

    constructor(){
        this.id = 0;
        this.order_type = '';
        this.order_num = '';
        this.total_amount = ''
        this.order_date = '';
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

    GetDate(date: Date): string {
        const options: Intl.DateTimeFormatOptions = {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric'
        };
        const formattedDate = date.toLocaleDateString('en-GB', options);
    
        return formattedDate;
      }
} 
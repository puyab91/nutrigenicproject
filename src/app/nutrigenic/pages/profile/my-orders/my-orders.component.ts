import { Component, Input } from '@angular/core';
import { UserOrderModel } from 'src/app/nutrigenic/models/profile/user-order-model';
import { UserProfileService } from 'src/app/nutrigenic/services/profile/user-profile.service';
import { ResizeDetectionService } from 'src/app/nutrigenic/services/resize-detection.service';

@Component({
    selector: 'app-my-orders',
    templateUrl: './my-orders.component.html',
    styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent {
    userOrders: UserOrderModel[] = [];
    isTablet: boolean = false;
    isMobile: boolean = false;
    isDesktop: boolean = false;

    constructor(private userProfileService: UserProfileService,
        private sizedetection: ResizeDetectionService) {
  
    }

    ngOnInit(){
        this.sizedetection.refreshSize();
        this.sizedetection.sizeCondition$.subscribe(data => {
            this.isDesktop = data.isDesktop;
            this.isTablet = data.isTablet;
            this.isMobile = data.isMobile;

        });
        
        this.userProfileService.getUserOrders().subscribe((response: any) => {            
            response.body.data.forEach((item: any) => {
                var userOrder = new UserOrderModel();
                userOrder.id = item.id;
                userOrder.order_type = item.order_type;
                userOrder.order_num = item.order_num;
                userOrder.order_date = userOrder.GetDate(new Date(item.order_date));
                userOrder.total_amount = item.total_amount;
                userOrder.discount_amount = item.discount_amount;
                userOrder.shipment_amount = item.shipment_amount;
                userOrder.expert_id = item.expert_id;
                userOrder.meals_per_day = item.meals_per_day;
                userOrder.days_per_week = item.days_per_week;
                userOrder.weeks = item.weeks;
                userOrder.address = item.address;
                userOrder.city = item.city;
                userOrder.zip = item.zip;
                userOrder.order_detail = item.order_detail;

                this.userOrders.push(userOrder);
            });
        })
    }

}

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UserProfileService } from 'src/app/nutrigenic/services/profile/user-profile.service';

@Component({
    selector: 'app-my-orders',
    templateUrl: './my-orders.component.html',
    styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent {
    orders: any[] = [];
    constructor(private userProfileService: UserProfileService) {
        this.orders = [
            {
                title: 'Flexi',
                weeks: 7,
                days: 6,
                meals: 3,
                total: '£87.00,60'
            },
            {
                title: 'Flexi',
                weeks: 1,
                days: 2,
                meals: 5,
                total: '£87.00,60'
            },
            {
                title: 'Flexi',
                weeks: 5,
                days: 3,
                meals: 6,
                total: '£87.00,60'
            },
            {
                title: 'Flexi',
                weeks: 3,
                days: 3,
                meals: 3,
                total: '£87.00,60'
            },
            {
                title: 'Flexi',
                weeks: 3,
                days: 3,
                meals: 3,
                total: '£87.00,60'
            },
            
        ];
    }

    ngOnInit(){
        this.userProfileService.getUserOrders().subscribe((response: any) => {
            console.log(response);
        })
    }

}

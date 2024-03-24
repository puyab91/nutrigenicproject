import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
    menuItems: any[] = [];
    addButtons: any[] = [];
    selectedMenu:string = 'Profile';
    constructor() { 
        this.menuItems = [
            {
                text: 'Profile',
                img: '../../../../assets/images/user-profile.png'
            },
            {
                text: 'My Orders',
                img: '../../../../assets/images/shopping-cart-02.png'
            },
            {
                text: 'Expert',
                img: '../../../../assets/images/mentoring.png'
            },
            {
                text: 'My own meals',
                img: '../../../../assets/images/apple-01.png'
            },
            {
                text: 'Credit cards',
                img: '../../../../assets/images/credit-card.png'
            },
            {
                text: 'Account',
                img: '../../../../assets/images/user-account.png'
            }
        ]

        this.addButtons = [
            {
                id: 'weight',
                text: 'Add weight'
            },
            {
                id: 'BMC',
                text: 'Add BMC'
            },
            {
                id: 'pictures',
                text: 'Add pictures'
            },
            {
                id: 'blood',
                text: 'Add blood test'
            },
            {
                id: 'sports',
                text: 'Add sports'
            }            
        ]
        this.selectedMenu = 'Profile';
    }    

}

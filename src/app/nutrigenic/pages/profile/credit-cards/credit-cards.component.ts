import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UserCreditCard } from 'src/app/nutrigenic/models/profile/user-credit-card-model';
import { UserProfileService } from 'src/app/nutrigenic/services/profile/user-profile.service';
import { ResizeDetectionService } from 'src/app/nutrigenic/services/resize-detection.service';

@Component({
    selector: 'app-credit-cards',
    templateUrl: './credit-cards.component.html',
    styleUrls: ['./credit-cards.component.scss']
})
export class CreditCardsComponent {
    creditCards: UserCreditCard[] = []
    isTablet: boolean = false;
    isMobile: boolean = false;
    isDesktop: boolean = false;

    constructor(private userProfileService: UserProfileService,
        private sizedetection: ResizeDetectionService) {
      
    }

    ngOnInit() {
        this.sizedetection.refreshSize();
        this.sizedetection.sizeCondition$.subscribe(data => {
            this.isDesktop = data.isDesktop;
            this.isTablet = data.isTablet;
            this.isMobile = data.isMobile;

        });

        this.userProfileService.getUserCreditCards().subscribe((response: any) => {

            response.body.data.forEach((item: any) => {
                var creditCard = new UserCreditCard();
                creditCard.user_id = item.user_id;
                creditCard.type = item.type;
                creditCard.number = item.number;
                creditCard.expiration = item.expiration;
                creditCard.is_default = item.is_default;

                this.creditCards.push(creditCard);
            });


        });
    }
}

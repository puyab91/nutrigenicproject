import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ExpertModel } from 'src/app/nutrigenic/models/plan/expert-model';
import { UserProfileService } from 'src/app/nutrigenic/services/profile/user-profile.service';

@Component({
    selector: 'app-user-expert',
    templateUrl: './user-expert.component.html',
    styleUrls: ['./user-expert.component.scss']
})
export class UserExpertComponent {
    value: number = 4;
    popupVisibility: boolean = false;
    expertRate: number = 0;
    expertReview: string = '';
    expertModel: ExpertModel = new ExpertModel();
    constructor(private userProfileService: UserProfileService) {

    }

    ngOnInit() {
        this.userProfileService.getUserExpert().subscribe((response: any) => {
            this.expertModel.id = response.body.id;
            this.expertModel.first_name = response.body.first_name;
            this.expertModel.last_name = response.body.last_name;
            this.expertModel.profession = response.body.profession;
            this.expertModel.is_active = response.body.is_active;
            this.expertModel.photo_path = response.body.photo_path;
            this.expertModel.profession_name = response.body.profession_name;
            this.expertModel.average_star_review = response.body.average_star_review;
            this.expertModel.reviews = response.body.reviews;
            this.expertModel.user_management_count = response.body.user_management_count;
        })
    }

    addReviewPopup() {
        this.popupVisibility = !this.popupVisibility;
    }

    submitExpertReview() {
        debugger;
        this.userProfileService.submitExpertReview({
            'review': this.expertReview,
            'star': this.expertRate
        }, this.expertModel.id);
    }
}

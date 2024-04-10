import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ExpertModel } from 'src/app/nutrigenic/models/plan/expert-model';
import { ExpertNoteModel } from 'src/app/nutrigenic/models/profile/expert-note-model';
import { UserProfileService } from 'src/app/nutrigenic/services/profile/user-profile.service';

@Component({
    selector: 'app-user-expert',
    templateUrl: './user-expert.component.html',
    styleUrls: ['./user-expert.component.scss']
})
export class UserExpertComponent {
    value: number = 4;
    popupVisibility: boolean = false;
    expertReview: string = '';
    selectedRateStar: number = 0;
    expertModel: ExpertModel = new ExpertModel();
    expertNotes: ExpertNoteModel[] = [];
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

            this.userProfileService.getExpertNotes(this.expertModel.id).subscribe((response: any) => {
                response.body.data.forEach((item: any) => {
                    var expertNote = new ExpertNoteModel();
                    expertNote.id = item.id;
                    expertNote.note = item.note;
                    expertNote.created_at = expertNote.GetDate(new Date(item.created_at));
                    expertNote.seen_at = item.seen_at;
                    expertNote.expert = item.expert;
                    expertNote.user = item.user;

                    this.expertNotes.push(expertNote);
                });
            });
        })
    }

    addReviewPopup() {
        this.popupVisibility = !this.popupVisibility;
    }

    submitExpertReview() {
        this.userProfileService.submitExpertReview({
            'review': this.expertReview,
            'star': this.selectedRateStar
        }, this.expertModel.id);
    }

    resetRateStar(){
        this.selectedRateStar = 0;
    }
}

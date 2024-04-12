import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import notiflix from 'notiflix';
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
    reviewPopupVisibility: boolean = false;
    expertReview: string = '';
    selectedRateStar: number = 0;
    expertModel: ExpertModel = new ExpertModel();
    expertNotes: ExpertNoteModel[] = [];
    connectExpertPopUpVisibility: boolean = false;
    constructor(private userProfileService: UserProfileService,
        private cdr: ChangeDetectorRef
    ) {

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
        this.reviewPopupVisibility = !this.reviewPopupVisibility;
        this.handleBlurFilter();
    }

    submitExpertReview() {
        this.userProfileService.submitExpertReview({
            'review': this.expertReview,
            'star': this.selectedRateStar
        }, this.expertModel.id);
    }

    resetRateStar() {
        this.selectedRateStar = 0;
        this.handleBlurFilter();
    }

    changeExpert() {
        if (this.expertModel.id == 0)
            notiflix.Notify.failure('User is not connected to expert', {
                position: 'right-top',
                timeout: 3000
            });
        else{
            this.connectExpertPopUpVisibility = !this.connectExpertPopUpVisibility
        this.handleBlurFilter();
        }
    }

    afterChangeExpert() {
        this.cdr.detectChanges();
    }

    onDialogHide() {
        this.handleBlurFilter();
    }

    handleBlurFilter() {
        if (this.connectExpertPopUpVisibility || this.reviewPopupVisibility) {
            document.getElementsByClassName('layoutHomeClass')[0]?.classList.add('p-dialog-blur');
            document.getElementById('layoutHome')?.classList.add('p-dialog-blur');
            document.getElementById('layoutHeader')?.classList.add('p-dialog-blur');
        }
        else {
            document.getElementsByClassName('layoutHomeClass')[0]?.classList.remove('p-dialog-blur');
            document.getElementById('layoutHome')?.classList.remove('p-dialog-blur');
            document.getElementById('layoutHeader')?.classList.remove('p-dialog-blur');
        }
    }
}

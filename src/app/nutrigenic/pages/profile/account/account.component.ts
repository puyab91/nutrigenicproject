import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import notiflix from 'notiflix';
import { MenuItem } from 'primeng/api';
import { UserProfileModel } from 'src/app/nutrigenic/models/profile/user-profile-model';
import { UserProfileService } from 'src/app/nutrigenic/services/profile/user-profile.service';
import { ResizeDetectionService } from 'src/app/nutrigenic/services/resize-detection.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent {
    userProfile: UserProfileModel = new UserProfileModel();;
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
                
        this.userProfileService.getUserProfile().subscribe({
            next: this.handleGetUserProfileResponse.bind(this),
            error: this.handleError.bind(this)
        });
    }
    handleGetUserProfileResponse(response: any) {
        this.userProfile.id = response.body.id;
        this.userProfile.first_name = response.body.first_name;
        this.userProfile.last_name = response.body.last_name;
        this.userProfile.email = response.body.email;
        this.userProfile.phone_number = response.body.phone_number;
        this.userProfile.birth_date = response.body.birth_date;
        this.userProfile.is_active = response.body.is_active;
        this.userProfile.gender = response.body.gender;
        this.userProfile.weight = response.body.weight;
        this.userProfile.height = response.body.height;
        this.userProfile.imc = response.body.imc;
        this.userProfile.photo_path = response.body.photo_path;
        this.userProfile.has_to_upload_photo = response.body.has_to_upload_photo;
        this.userProfile.has_to_update_weight = response.body.has_to_update_weight;
        this.userProfile.has_unseen_notes = response.body.has_unseen_notes;
        this.userProfile.address = response.body.address;
        this.userProfile.city = response.body.city;
        this.userProfile.zip = response.body.zip;
    }

    handleError(error: any): void {
        notiflix.Notify.failure(error.message + '- Operation unsuccessful', {
            position: 'right-top',
            timeout: 3000
        });
    }

    updateAddress(){
        if(this.userProfile.address == '' || this.userProfile.city == '' || this.userProfile.zip == '')
            this.handleError({message: 'Fill address, city and zip then try again'});
        else
            this.userProfileService.setAddress({address: this.userProfile.address, city: this.userProfile.city, zip: this.userProfile.zip});
    }
}

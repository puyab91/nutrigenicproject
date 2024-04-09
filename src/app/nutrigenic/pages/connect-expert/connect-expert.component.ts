
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ResizeDetectionService } from '../../services/resize-detection.service';
import { ExpertModel } from '../../models/plan/expert-model';
import { PlanService } from '../../services/plan/plan.service';

@Component({
    selector: 'app-connect-expert',
    templateUrl: './connect-expert.component.html',
    styleUrls: ['./connect-expert.component.scss'],
})

export class ConnectExpertComponent {
    @Input() popupVisibility: boolean = false;
    value: number = 3;
    expertsModel: ExpertModel[] = [];
    mealsList: any[] = [];
    isTablet: boolean = false;
    isMobile: boolean = false;
    isDesktop: boolean = false;
    constructor(private sizedetection: ResizeDetectionService,
        private planService: PlanService
    ) {
        this.sizedetection.refreshSize();
        this.sizedetection.sizeCondition$.subscribe(data => {
            this.isDesktop = data.isDesktop;
            this.isTablet = data.isTablet;
            this.isMobile = data.isMobile;
        });


    }

    ngOnInit(){
        this.planService.getExperts().subscribe((response: any) => {
            response.body.data.forEach((item: any) => {
                var expertModel = new ExpertModel();
                expertModel.id = item.id;
                expertModel.first_name = item.first_name;
                expertModel.last_name = item.last_name;
                expertModel.profession = item.profession;
                expertModel.is_active = item.is_active;
                expertModel.photo_path = item.photo_path;
                expertModel.profession_name = item.profession_name;
                expertModel.average_star_review = item.average_star_review;
                expertModel.reviews = item.reviews;
                expertModel.user_management_count = item.user_management_count;

                this.expertsModel.push(expertModel);
            });
        });
    }

    assignExpert(id: number){
        this.planService.assignExperts(id);
    }

    onDialogHide() {
        this.handleBlurFilter();
        this.popupVisibility = false
    }

    handleBlurFilter() {
        if (this.popupVisibility) {
            document.getElementById('layoutHome')?.classList.add('p-dialog-blur');
            document.getElementById('layoutHeader')?.classList.add('p-dialog-blur');
        }
        else {
            document.getElementById('layoutHome')?.classList.remove('p-dialog-blur');
            document.getElementById('layoutHeader')?.classList.remove('p-dialog-blur');
        }
    }

}

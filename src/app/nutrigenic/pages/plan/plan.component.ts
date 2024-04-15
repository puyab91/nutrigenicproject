import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Subscription, debounceTime, fromEvent } from 'rxjs';
import { ResizeDetectionService } from '../../services/resize-detection.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-plan',
    templateUrl: './plan.component.html',
    styleUrls: ['./plan.component.scss']
})
export class PlanComponent {
    selectedFlexiDaymealButton: number = 2;
    selectedFlexiWeekmealButton: number = 3;
    selectedCommitDaymealButton: number = 2;
    selectedCommitWeekmealButton: number = 3;
    selectedCommitWeeksButton: string = '4w';
    connectExpertPopUpVisibility: boolean = false;
    isTablet: boolean = false;
    isMobile: boolean = false;
    isDesktop: boolean = false;
    tabItems = ['Flexi', 'Commit', 'Expert'];
    selectedMasterTab: string | null = 'Flexi';
    applyFlexi: string = 'Apply';
    applyCommit: string = 'Apply';
    addAlergiesPopupVisibility: boolean = false;
    alergies: any[] = [];

    constructor(private router: Router, private sizedetection: ResizeDetectionService) {
        this.alergies = [
            {
                sport: 'Crustaceans',
                icon: '../../../../assets/images/alergy.png',
                selected: false
            },
            {
                sport: 'Crustaceans',
                icon: '../../../../assets/images/alergy.png',
                selected: false
            },
            {
                sport: 'Crustaceans',
                icon: '../../../../assets/images/alergy.png',
                selected: false
            },
            {
                sport: 'Crustaceans',
                icon: '../../../../assets/images/alergy.png',
                selected: false
            },
            {
                sport: 'Crustaceans',
                icon: '../../../../assets/images/alergy.png',
                selected: false
            },
            {
                sport: 'Crustaceans',
                icon: '../../../../assets/images/alergy.png',
                selected: false
            },
            {
                sport: 'Crustaceans',
                icon: '../../../../assets/images/alergy.png',
                selected: false
            },
            {
                sport: 'Crustaceans',
                icon: '../../../../assets/images/alergy.png',
                selected: false
            },
            {
                sport: 'Crustaceans',
                icon: '../../../../assets/images/alergy.png',
                selected: false
            },

        ];
    }

    ngOnInit() {
        this.sizedetection.refreshSize();
        this.sizedetection.sizeCondition$.subscribe(data => {
            this.isDesktop = data.isDesktop;
            this.isTablet = data.isTablet;
            this.isMobile = data.isMobile;

        });
    }

    goToPlanDetail(weeks: number, mealPerDay: number, dayPerWeek: number) {
        this.showChooseAlergies();

        var data: any = {
            weeks: weeks,
            mealPerDay: mealPerDay,
            dayPerWeek: dayPerWeek
        }

        this.router
            .navigate(['/planDetail'], { queryParams: data })
            .then(() => { })
            .catch(() => { });
    }

    selectButton(buttonList: string, buttonNumber: number) {
        if (buttonList == 'flexiDay')
            this.selectedFlexiDaymealButton = buttonNumber;
        if (buttonList == 'flexiWeek')
            this.selectedFlexiWeekmealButton = buttonNumber;
        if (buttonList == 'commitDay')
            this.selectedCommitDaymealButton = buttonNumber;
        if (buttonList == 'commitWeek')
            this.selectedCommitWeekmealButton = buttonNumber;
    }

    onDialogHide() {
        this.handleBlurFilter();
    }

    selectWeeksNumber(buttonNumber: string) {
        this.selectedCommitWeeksButton = buttonNumber;
    }

    showOnnectToExpertPopUp() {
        this.connectExpertPopUpVisibility = !this.connectExpertPopUpVisibility;
        this.handleBlurFilter();
    }

    showChooseAlergies(){
        this.addAlergiesPopupVisibility = !this.addAlergiesPopupVisibility;
        this.handleBlurFilter();
    }

    handleBlurFilter() {
        if (this.connectExpertPopUpVisibility || this.addAlergiesPopupVisibility) {
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
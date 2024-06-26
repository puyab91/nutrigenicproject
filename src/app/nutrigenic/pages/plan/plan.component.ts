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
    selectedFlexiMealPerDayButton: number = 2;
    selectedFlexiDayPerWeekButton: number = 3;
    selectedCommitMealPerDayButton: number = 2;
    selectedCommitDayPerWeekButton: number = 3;
    selectedCommitWeeksButton: string = '4w';
    connectExpertPopUpVisibility: boolean = false;
    makeOwnMealPopupVisibility: boolean = false;
    isTablet: boolean = false;
    isMobile: boolean = false;
    isDesktop: boolean = false;
    tabItems = ['Flexi', 'Commit', 'Expert'];
    selectedMasterTab: string | null = 'Flexi';
    applyFlexi: string = 'Apply';
    applyCommit: string = 'Apply';
    addAlergiesPopupVisibility: boolean = false;
    alergies: any[] = [];
    selectedType: string = '';
    protein: any[] = [{ value: 'Protein' }]
    carbs: any[] = [{ value: 'Carbs' }]
    veg: any[] = [{ value: 'Veg' }]
    amount: any[] = [{ value: 999 }, { value: 222 }]

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

    goToPlanDetail() {
        if (this.selectedType == 'Flexi') {
            this.showChooseAlergies('flexi');
            var data: any = {
                type: this.selectedType,
                weeks: 1,
                mealPerDay: this.selectedFlexiMealPerDayButton,
                dayPerWeek: this.selectedFlexiDayPerWeekButton
            }
        }
        else if (this.selectedType == 'Commit') {
            this.showChooseAlergies('commit');
            var data: any = {
                type: this.selectedType,
                weeks: parseInt(this.selectedCommitWeeksButton.slice(0, -1)),
                mealPerDay: this.selectedCommitMealPerDayButton,
                dayPerWeek: this.selectedCommitDayPerWeekButton
            }
        }
        else {
            this.makeOwnMealPopupVisibility = !this.makeOwnMealPopupVisibility;
            this.handleBlurFilter();
        }


        this.router
            .navigate(['/planDetail'], { queryParams: data })
            .then(() => { })
            .catch(() => { });
    }

    selectButton(buttonList: string, buttonNumber: number) {
        if (buttonList == 'flexiDay')
            this.selectedFlexiMealPerDayButton = buttonNumber;
        if (buttonList == 'flexiWeek')
            this.selectedFlexiDayPerWeekButton = buttonNumber;
        if (buttonList == 'commitDay')
            this.selectedCommitMealPerDayButton = buttonNumber;
        if (buttonList == 'commitWeek')
            this.selectedCommitDayPerWeekButton = buttonNumber;
    }

    showMakeOwnDialog() {
        this.makeOwnMealPopupVisibility = !this.makeOwnMealPopupVisibility;
        this.handleBlurFilter();
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

    showChooseAlergies(issuerType: string) {
        if (issuerType == 'flexi')
            this.selectedType = 'Flexi';
        if (issuerType == 'commit')
            this.selectedType = 'Commit';
        this.addAlergiesPopupVisibility = !this.addAlergiesPopupVisibility;
        this.handleBlurFilter();
    }

    handleBlurFilter() {
        if (this.connectExpertPopUpVisibility || this.addAlergiesPopupVisibility || this.makeOwnMealPopupVisibility) {
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
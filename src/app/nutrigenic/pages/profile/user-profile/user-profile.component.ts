import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import notiflix from 'notiflix';
import { MenuItem } from 'primeng/api';
import { ChartModel, Dataset } from 'src/app/nutrigenic/models/profile/chart-model';
import { FileModel } from 'src/app/nutrigenic/models/profile/file-model';
import { UserProfileModel } from 'src/app/nutrigenic/models/profile/user-profile-model';
import { JwtTokenService } from 'src/app/nutrigenic/services/auth/jwt-token.service';
import { UserProfileService } from 'src/app/nutrigenic/services/profile/user-profile.service';
import { ResizeDetectionService } from 'src/app/nutrigenic/services/resize-detection.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
    addButtons: any[] = [];
    userName: string = 'User Name';
    userProfile: UserProfileModel;
    photos: FileModel[] = [];
    bloods: FileModel[] = [];
    addBiometricPopupVisibility = false;
    addSportPopupVisibility = false;
    connectCardVisibility: boolean = false;
    biometricHeader: string = '';
    biometricField: string = '';
    biometricUnit: string = '';
    value: string = '00.00';
    apiLoaded: boolean = false;
    tabItems = ['Weight', 'IMC', 'Pictures', 'Blood test'];
    selectedTab: string | null = 'Weight';
    search: string = '';
    searchIcon = true;
    sports: any[] = [];
    isTablet: boolean = false;
    isMobile: boolean = false;
    isDesktop: boolean = false;
    selectedAddButton: string = '';
    data: ChartModel = new ChartModel();

    constructor(private router: Router, private jwtTokenService: JwtTokenService,
        private userProfileService: UserProfileService,
        private sizedetection: ResizeDetectionService
    ) {
        this.userProfile = new UserProfileModel();
        this.addButtons = [
            {
                id: 'weight',
                text: 'Add weight'
            },
            {
                id: 'IMC',
                text: 'Add IMC'
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

        this.sports = [
            {
                sport: 'Skateboard',
                selected: false
            },
            {
                sport: 'Skateboard',
                selected: false
            },
            {
                sport: 'Skateboard',
                selected: false
            },
            {
                sport: 'Skateboard',
                selected: false
            },
            {
                sport: 'Skateboard',
                selected: false
            },
            {
                sport: 'Skateboard',
                selected: false
            },
            {
                sport: 'Skateboard',
                selected: false
            },
            {
                sport: 'Skateboard',
                selected: false
            },
            {
                sport: 'Skateboard',
                selected: false
            },
            {
                sport: 'Skateboard',
                selected: false
            },

        ];

        this.userProfileService.getPhotos().subscribe((response: any) => {
            response.body.data.forEach((item: any) => {
                var file = new FileModel();
                file.id = item.id;
                file.path = item.photo_path;
                file.created_at = item.created_at;
                file.date = item.data;

                this.photos.push(file);

            });
        });

        this.userProfileService.getBloods().subscribe((response: any) => {
            response.body.data.forEach((item: any) => {
                var file = new FileModel();
                file.id = item.id;
                file.path = item.blood_path;
                file.created_at = item.created_at;
                file.date = file.GetDate(new Date(item.date));

                this.bloods.push(file);

            });
        });

        this.loadChart('Weight');
        // this.data = {
        //     labels: ['2024/01/01', '2024/02/01', '2024/03/15', '2024/04/01', '2024/05/01', '2024/06/01', '2024/07/01'],
        //     datasets: [
        //         {
        //             label: 'First Dataset',
        //             data: [10, 20, 30, 40, 50, 60, 70]
        //         }
        //     ]
        // }
    }

    ngOnInit() {
        this.sizedetection.refreshSize();
        this.sizedetection.sizeCondition$.subscribe(data => {
            this.isDesktop = data.isDesktop;
            this.isTablet = data.isTablet;
            this.isMobile = data.isMobile;

        });

        this.jwtTokenService.getIsLogin().subscribe((data: any) => {
            if (data)
                this.userProfileService.getUserProfile().subscribe({
                    next: this.handleGetUserProfileResponse.bind(this),
                    error: this.handleError.bind(this)
                });
            else
                this.router
                    .navigate(['/home'])
                    .then(() => { })
                    .catch(() => { });
        });

        this.userProfileService.getUserExpert().subscribe((response: any) => {
            if (response.body)
                this.connectCardVisibility = false;
            else
                this.connectCardVisibility = true;


        });

    }

    showBiometricPopup(id: string) {
        this.selectedAddButton = id;
        if (id == 'weight') {
            this.biometricHeader = 'weight';
            this.biometricField = 'Weight';
            this.biometricUnit = 'Kgs';
            this.addBiometricPopupVisibility = !this.addBiometricPopupVisibility;
        }
        if (id == 'IMC') {
            this.biometricHeader = 'IMC';
            this.biometricField = 'IMC';
            this.biometricUnit = '';
            this.addBiometricPopupVisibility = !this.addBiometricPopupVisibility;
        }
        if (id == 'pictures' || id == 'blood') {
            document.getElementById('fileInput')?.click();
        }
        if (id == 'sports') {
            this.addSportPopupVisibility = !this.addSportPopupVisibility;
        }
        this.handleBlurFilter();
    }

    selectedTabChange(item: string) {
        this.selectedTab = item;
        this.loadChart(item);
    }

    loadChart(chart: string) {
        var chartData: ChartModel = new ChartModel();
        var dataSet: Dataset = new Dataset();

        this.userProfileService.getUserBiometrics().subscribe((response: any) => {
            dataSet.label = chart;
            if (chart == 'Weight') {
                response.body.weights.sort((a: any, b: any) => a.id - b.id).forEach((item: any) => {
                    chartData.labels.push(item.date)
                });
                response.body.weights.sort((a: any, b: any) => a.id - b.id).forEach((item: any) => {
                    dataSet.data.push(item.weight)
                });
            }
            if (chart == 'IMC') {
                response.body.imcs.sort((a: any, b: any) => a.id - b.id).forEach((item: any) => {
                    chartData.labels.push(item.date)
                });
                response.body.imcs.sort((a: any, b: any) => a.id - b.id).forEach((item: any) => {
                    dataSet.data.push(item.imc)
                });
            }
            chartData.datasets.push(dataSet);
            this.data = chartData;
        });
    }

    onDragOver(event: DragEvent) {
        event.preventDefault();
    }

    onDrop(event: DragEvent) {
        event.preventDefault();
    }

    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            if (this.selectedTab == 'Blood test' || this.selectedAddButton == 'blood')
                this.userProfileService.setUserPicture(file, false);
            if (this.selectedTab == 'Pictures' || this.selectedAddButton == 'pictures')
                this.userProfileService.setUserPicture(file, true);
        }
    }


    addUserWeight(id: string) {
        if (id == 'weight')
            this.userProfileService.setUserWeight(parseFloat(this.value)).subscribe({
                next: this.handleSetUserWeightResponse.bind(this),
                error: this.handleError.bind(this)
            });
        if (id == 'IMC')
            this.userProfileService.setUserIMC(parseFloat(this.value)).subscribe({
                next: this.handleSetUserWeightResponse.bind(this),
                error: this.handleError.bind(this)
            });
    }

    handleSetUserWeightResponse(response: any) {
        notiflix.Notify.success(response.statusCode + '- Operation unsuccessful', {
            position: 'right-top',
            timeout: 3000
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
        this.apiLoaded = true;
    }

    handleError(error: any): void {
        notiflix.Notify.failure(error.message + '- Operation unsuccessful', {
            position: 'right-top',
            timeout: 3000
        });
    }

    onDialogHide() {
        this.handleBlurFilter();
    }

    handleBlurFilter() {
        if (this.addBiometricPopupVisibility || this.addSportPopupVisibility) {
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

    inputTextChange(event: any) {
        var x = event;
        if (this.search == '')
            this.searchIcon = true;
        else
            this.searchIcon = false;

    }

    downloadFile(path: string) {
        const downloadLink = document.createElement('a');
        downloadLink.href = path;
        downloadLink.download = path;
        downloadLink.click();

        window.URL.revokeObjectURL(path);
    }
}

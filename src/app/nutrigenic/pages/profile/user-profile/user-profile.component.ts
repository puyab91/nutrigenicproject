import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { JwtTokenService } from 'src/app/nutrigenic/services/auth/jwt-token.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
    addButtons: any[] = [];
    userName: string = 'User Name';
    constructor(private router: Router, private jwtTokenService: JwtTokenService) {
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
    }

    ngOnInit() {
        this.jwtTokenService.getIsLogin().subscribe((data: any) => {
            if (data) {
                this.userName = this.jwtTokenService.getUserName();
            }
            else
                this.router
                    .navigate(['/home'])
                    .then(() => { })
                    .catch(() => { });

        });
    }
}

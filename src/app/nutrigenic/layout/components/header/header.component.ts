import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    menuItems = ['Home', 'About us', 'Blog', 'Plans', 'Our shop'];
    selectedItem: string | null = 'Home';
    items: MenuItem[] = [];
    constructor(private router: Router) { }
    ngOnInit(): void {
        this.items = [
            {
                label: 'Home',
                command: () => this.onItemClick({ label: 'Home' })
            },
            {
                label: 'About us',
                command: () => this.onItemClick({ label: 'About us' })
            },
            {
                label: 'Blog',
                command: () => this.onItemClick({ label: 'Blog' })
            },
            {
                label: 'Plans',
                command: () => this.onItemClick({ label: 'Plans' })
            },
            {
                label: 'Our shop',
                command: () => this.onItemClick({ label: 'Our shop' })
            },
            {
                label: 'Login',
                command: () => this.onItemClick({ label: 'Login' })
            },
        ];
    }
    get containerClass(): any {
        return {
            'layout-theme-light': 'light',
            'layout-overlay': 'overlay',
            'layout-static': 'static',
            'layout-static-inactive': 'static',
            'layout-overlay-active': false,
            'layout-mobile-active': false,
            'p-input-filled': 'filled',
            'p-ripple-disabled': !true
        };
    }

    onItemClick(item: any): void {
        this.selectedItem = item.label;
        this.router
        .navigate(['/' + item.label])
        .then(() => {})
        .catch(() => {});
    }


}

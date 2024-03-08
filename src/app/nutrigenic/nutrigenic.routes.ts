import { Routes } from '@angular/router';
import { NutrigenicComponent } from './nutrigenic.component';
import { HomeComponent } from './pages/home/home.component';

export const NutrigenicRoutes: Routes = [
    {
        path: '',
        component: NutrigenicComponent,
        children: [
            { path: '', component: HomeComponent }
        ]
    }
];

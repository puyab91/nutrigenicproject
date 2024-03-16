import { Routes } from '@angular/router';
import { NutrigenicComponent } from './nutrigenic.component';
import { HomeComponent } from './pages/home/home.component';
import { PlanComponent } from './pages/plan/plan.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';

export const NutrigenicRoutes: Routes = [
    {
        path: '',
        component: NutrigenicComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'Home', component: HomeComponent },
            { path: 'Plans', component: PlanComponent },
            { path: 'AboutUs', component: AboutUsComponent },
        ]
    }
];

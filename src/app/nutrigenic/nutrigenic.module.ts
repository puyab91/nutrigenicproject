import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { NutrigenicRoutingModule } from './nutrigenic-routing.module';
import { NutrigenicComponent } from './nutrigenic.component';
import { HeaderComponent } from './layout/components/header/header.component';
import {MenubarModule} from 'primeng/menubar';
import { HomeComponent } from './pages/home/home.component';
import { DividerModule } from 'primeng/divider';
import {CarouselModule} from 'primeng/carousel';
import { PlanComponent } from './pages/plan/plan.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';


@NgModule({
    declarations: [
        NutrigenicComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        PlanComponent,
        AboutUsComponent
    ],
    imports: [
        CommonModule,
        NutrigenicRoutingModule,
        MenubarModule,
        DividerModule,
        CarouselModule
    ],
    exports: [],
    providers: [

    ]
})
export class NutrigenicModule { }

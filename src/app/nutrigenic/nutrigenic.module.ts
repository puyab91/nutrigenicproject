import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { NutrigenicRoutingModule } from './nutrigenic-routing.module';
import { NutrigenicComponent } from './nutrigenic.component';
import { HeaderComponent } from './layout/components/header/header.component';
import {MenubarModule} from 'primeng/menubar';
import { HomeComponent } from './pages/home/home.component';
import { DividerModule } from 'primeng/divider';
import {CarouselModule} from 'primeng/carousel';


@NgModule({
    declarations: [
        NutrigenicComponent,
        HeaderComponent,
        HomeComponent
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

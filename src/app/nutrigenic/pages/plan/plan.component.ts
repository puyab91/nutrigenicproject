import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Subscription, debounceTime, fromEvent } from 'rxjs';

@Component({
    selector: 'app-plan',
    templateUrl: './plan.component.html',
    styleUrls: ['./plan.component.scss']
})
export class PlanComponent {
    constructor(){}
}
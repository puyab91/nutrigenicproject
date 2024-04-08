import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BlogModel } from 'src/app/nutrigenic/models/blog/blog-model';

@Component({
    selector: 'app-blog-detail',
    templateUrl: './blog-detail.component.html',
    styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent {
    listCardData: any[] = [];
    blogModel: BlogModel = new BlogModel();

    constructor(private router: Router,private route: ActivatedRoute) {}

    ngOnInit(){
        this.route.queryParams.subscribe((params: any) => {
            console.log(params); 
            this.blogModel.id = params.id;
            this.blogModel.title = params.title;
            this.blogModel.titleImage = params.titleImage;
            this.blogModel.date = params.date;
            this.blogModel.content = params.content;
            this.blogModel.hashtags = params.hashtags;
          });
        this.listCardData = [
            {
                imgUrl: '../../../../assets/images/blog-list-1.png',
                title: '5 Simple yoga poses for a Beggineer',
                description: 'Discover how yoga can improve your sleep quality with these easy folllow poses. Open now and read come on.',
                tag: 'Fitness'
            },
            {
                imgUrl: '../../../../assets/images/blog-list-2.png',
                title: '5 Simple yoga poses for a Beggineer',
                description: 'Discover how yoga can improve your sleep quality with these easy folllow poses. Open now and read come on.',
                tag: 'Fitness'
            },
            {
                imgUrl: '../../../../assets/images/blog-list-3.png',
                title: '5 Simple yoga poses for a Beggineer',
                description: 'Discover how yoga can improve your sleep quality with these easy folllow poses. Open now and read come on.',
                tag: 'Fitness'
            },
        ];
    }
    navigateToBlogDetail(){
        this.router
        .navigate(['/blogDetail'])
        .then(() => { })
        .catch(() => { });
    }
}


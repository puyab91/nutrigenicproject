import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ResizeDetectionService } from '../../services/resize-detection.service';
import { BlogService } from '../../services/blog/blog.service';
import { BlogModel } from '../../models/blog/blog-model';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
    tabItems = ['Home', 'Health & Nutrition', 'Recipes', 'Fitness', 'Lifestyle', 'Supplements'];
    selectedMasterTab: string | null = 'Home';
    blogsModel: BlogModel[] = [];
    listCardData: any[] = [];
    isTablet: boolean = false;
    isMobile: boolean = false;
    isDesktop: boolean = false;
    constructor(private router: Router,
        private sizedetection: ResizeDetectionService,
        private blogService: BlogService) { }

    ngOnInit() {
        this.sizedetection.refreshSize();
        this.sizedetection.sizeCondition$.subscribe(data => {
            this.isDesktop = data.isDesktop;
            this.isTablet = data.isTablet;
            this.isMobile = data.isMobile;
        });

        this.getBlogs();

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
            {
                imgUrl: '../../../../assets/images/blog-list-4.png',
                title: '5 Simple yoga poses for a Beggineer',
                description: 'Discover how yoga can improve your sleep quality with these easy folllow poses. Open now and read come on.',
                tag: 'Fitness'
            },
            {
                imgUrl: '../../../../assets/images/blog-list-5.png',
                title: '5 Simple yoga poses for a Beggineer',
                description: 'Discover how yoga can improve your sleep quality with these easy folllow poses. Open now and read come on.',
                tag: 'Fitness'
            },
            {
                imgUrl: '../../../../assets/images/blog-list-5.png',
                title: '5 Simple yoga poses for a Beggineer',
                description: 'Discover how yoga can improve your sleep quality with these easy folllow poses. Open now and read come on.',
                tag: 'Fitness'
            },
        ];
    }


    getBlogs(){
        this.blogService.getBlogs().subscribe((response) => {
            console.log(response);
            response.body.data.forEach((item: any) => {
                var blogModel = new BlogModel();
                blogModel.id = item.id;
                blogModel.title = item.title;
                blogModel.titleImage = item.title_image;
                blogModel.content = blogModel.RemoveHtmlTags(item.content);
                blogModel.date = new Date(item.date);
                blogModel.hashtags = item.hashtags;
                this.blogsModel.push(blogModel);
            });
        });
    }
    navigateToBlogDetail(item: any) {
        this.router
            .navigate(['/blogDetail'], { queryParams: item })
            .then(() => { })
            .catch(() => { });
    }
}

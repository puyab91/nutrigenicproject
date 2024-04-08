export class BlogModel {
    id: number;
    title: string;
    titleImage: string;
    date: Date;
    content: string;
    hashtags: string[];

    constructor() {
        this.id = 0;
        this.title = '';
        this.titleImage = '';
        this.content = '';
        this.hashtags = [];
        this.date = new Date();
        this.title = '';
    }

    RemoveHtmlTags(input: string): string {
        if (input != null && input.length > 0) return input.replace(/<[^>]*>/g, '');
        else return '';
      }
}
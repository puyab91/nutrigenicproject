export class ExpertModel {
    id: number;
    first_name: string;
    last_name: string;
    profession: string;
    is_active: boolean;
    photo_path: string;
    profession_name: string;
    average_star_review: number;
    reviews: any[];
    user_management_count: number;

    constructor() {
        this.id = 0;
        this.first_name = '';
        this.last_name = '';
        this.profession = '';
        this.is_active = false;
        this.photo_path = '';
        this.profession_name = '';
        this.average_star_review = 0;
        this.reviews = [];
        this.user_management_count = 0;
    }
}
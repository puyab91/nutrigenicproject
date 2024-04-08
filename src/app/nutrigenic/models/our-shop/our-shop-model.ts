export class OurShopModel{
    id: number;
    name: string;
    price: string;
    quantity: number;
    image_path: string;
    description_image_path: string;
    count: number;


    constructor() {
        this.id = 0;
        this.price = '';        
        this.quantity = 0;        
        this.image_path = '';        
        this.description_image_path = '';        
        this.name = '';      
        this.count = 1;  
    }
}
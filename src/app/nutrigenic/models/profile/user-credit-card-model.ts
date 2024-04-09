export class UserCreditCard{
    user_id: number;
    type: string;
    number: string;
    expiration: string;
    is_default: boolean;

    constructor(){
        this.user_id = 0;
        this.type = '';
        this.number = '';
        this.expiration = '';
        this.is_default = false;
    }
}
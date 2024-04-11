export class FileModel{
    id: number;
    path: string;
    created_at:string;
    date: string;

    constructor(){
        this.id = 0;
        this.path = '';
        this.created_at = ''
        this.date = ''
    }

    GetDate(date: Date): string {
        const options: Intl.DateTimeFormatOptions = {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        };
        const formattedDate = date.toLocaleDateString('en-GB', options);
    
        return formattedDate;
      }
}
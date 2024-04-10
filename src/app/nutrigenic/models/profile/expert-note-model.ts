export class ExpertNoteModel{
id: number;
note: string;
created_at: string;
seen_at: string;
expert: any;
user: any;

constructor(){
    this.id = 0;
    this.note = '';
    this.created_at = '';
    this.seen_at = '';
}

GetDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    };
    const formattedDate = date.toLocaleDateString('en-GB', options);

    return formattedDate;
  }
}
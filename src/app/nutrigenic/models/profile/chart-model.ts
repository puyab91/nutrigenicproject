export class Dataset {
    label: string = '';
    data: number[] = []
}

export class ChartModel {
    labels: string[] = [];
    datasets: Dataset[] = [];
    
}
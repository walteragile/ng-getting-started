import { Component, OnChanges, SimpleChanges } from "@angular/core";

@Component({
    selector: "pm-star",
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
    cropWidth = 75;
    rating = 4;

    ngOnChanges(): void {
        this.cropWidth = this.rating * 75 / 5
    }
}
import { Component, OnInit } from '@angular/core';
import sample from './../../assets/sample.json'; //provided json import//

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss'],
})
export class TrendsComponent implements OnInit {
  constructor() {}
  brandList: any[] = [...sample.outer_attribute.brands];
  topFive:any[] = []
  verticals: any[] = [];
  brandsGroupedBy: any[] = [];
  highestWithVertical: any[] = [];
  label: any;
  selectedVer: any;

  ngOnInit(): void {
    //console.log(this.brandList);

    //sorting the brands in descending order of customer visits
   this.brandList.sort(
      (a, b) => b.customer_visit_ratio - a.customer_visit_ratio
    );


    //creating list of verticals for dropdown
    this.brandList.forEach((brand) => {
      if (!this.verticals.includes(brand.Vertical))
        this.verticals.push(brand.Vertical);
    });
    //console.log(this.verticals);


    //grouping the brands by vertical
    let group = this.brandList.reduce((newArray, list) => {
      newArray[list.Vertical] = [...(newArray[list.Vertical] || []), list].sort((a,b)=>b.ratioInPercentage - a.ratioInPercentage).splice(0,5);
      return newArray
    }, {});
    //console.log(group);


    //creating array of the groups to iterate through in the web page
    this.brandsGroupedBy = Object.entries(group);
    //console.log(this.brandsGroupedBy);


    //creating an array of vertical and respective highest customer_visit_ratio
    for (let key in group) {
      let ratioArray = group[key].map((res) =>
        parseFloat(res.customer_visit_ratio)
      );
      let highest = ratioArray.reduce(function (prev, cur) {
        if (+prev > +cur) {
          return prev;
        } else {
          return cur;
        }
      });
      this.highestWithVertical.push({ vertical: key, highest_ratio: highest });
      //console.log(this.highestWithVertical);
    }


    //adding the percentage value of customer_visit_ratio to the object json (with respect to highest customer_visit_ratio for each vertical)
    this.highestWithVertical.forEach((pair) => {
      for (let i = 0; i < this.brandList.length; i++) {
        if (pair.vertical === this.brandList[i].Vertical) {
          this.brandList[i].ratioInPercentage = (
            (this.brandList[i].customer_visit_ratio / pair.highest_ratio) *
            100
          ).toFixed(2);
        }
      }
    });
    //console.log(this.brandList);
  }


  //dynamically applying color to the bars
  getColor(percentage) {
    if (percentage >= 75) return 'rgb(136, 192, 72)';
    else if (percentage < 75 && percentage >= 25) return 'orange';
    else if (percentage < 25) return 'red';
  }


  //dynamically applying label to the bars
  getLabel(percentage) {
    if (percentage >= 75) this.label = 'High';
    else if (percentage < 75 && percentage >= 25) this.label = 'Moderate';
    else if (percentage < 25) this.label = 'Low';
  }

  //fetching the vertical dropdown selection to reflect the associated table 
  selectedVertical(e) {
    //console.log(e.target.outerText);
    this.selectedVer = e.target.outerText;
  }
}

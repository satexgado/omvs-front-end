import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ordre',
  templateUrl: './ordre.component.html',
  styleUrls: ['../../../../assets/css/ordre.css']
})
export class OrdreComponent implements OnInit {

  @Input() mission_all_details: any;
  private item = null;
  private today: Date;
  private imputations = '';
  constructor() { }

  ngOnInit() {
    this.item = this.mission_all_details;
    this.today = new Date();

    this.mission_all_details.imputations.forEach(element => {
      this.imputations+=element.name+'/ '  
    });

  }


  // STILL WOrKING ON THIS....
  printNow(block: string) {
    const printContent = document.getElementById(block);
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write('<link rel="stylesheet" type="text/css" href="../../../../assets/css/sb-admin-2.css">');
    WindowPrt.document.write('<link rel="stylesheet" type="text/css" href="../../../../assets/css/ordre.css">');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }

}

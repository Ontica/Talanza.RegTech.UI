import { Component, EventEmitter, Input, Output,
        AfterViewInit } from '@angular/core';

declare var dhtmlXCalendarObject: any;

interface calendearSettings {
  disableWeekends: boolean;
  showHolidays: boolean;
  hideTime: boolean;
  showWeekNumber: boolean;
  showVacation: boolean;
  date: Date;
}

@Component ({
  selector: 'calendar-control',
  templateUrl:'./calendar-control.html',  
  styleUrls: ['./calendar-control.scss']  
})

export class CalendarControl  implements AfterViewInit {
  public calendar: any;

  @Input() config: calendearSettings = { disableWeekends: false, showHolidays: false, hideTime: false,
                                         showWeekNumber: false, showVacation: false, date: undefined  }

  @Output() public onSelectedDate = new EventEmitter<Date>();

  public date = '';
  public inputId = 'calendarInput';
  public buttonId = 'calendarButton';
     
  constructor() {    
    this.setControlId();      
  }

  ngAfterViewInit() {       
      this.setCalendarLanguage();
     
      this.createCalendar();
      this.setInitialDate(); 
      this.setSettings();
   
      this.setSelectedDate();  
  } 

  private setInitialDate(): void {
        
    if (this.config.date !== undefined) {
      this.cal_isDate(this.config.date);   
      this.calendar.setDate(this.config.date);
    }
  }

  private setSelectedDate(): void {
    this.calendar.attachEvent("onClick", (date)=> {
      this.onSelectedDate.emit(date);
     }); 
  }

  private createCalendar(): void {
    
    this.calendar = new dhtmlXCalendarObject(
      { input: this.inputId , button: this.buttonId});           
  }

  private setSettings(): void {
    if (this.config.disableWeekends) {
      this.disbleWeekend();
    }
    if (this.config.showHolidays) {
      this.setHolidays();
    }
    if (this.config.hideTime) {
      this.hideTime();
    }
    if (this.config.showWeekNumber) {
      this.showWeekNumber();
    }
    if (this.config.showVacation) {
      this.disableRangeDays('15-12-2017', '02-01-2018');
    }

    this.calendar.setDateFormat("%d-%M-%y");
  }

  private hideTime(): void {
    this.calendar.hideTime();//ocultar la hora
  }

  private showWeekNumber(): void {
    this.calendar.showWeekNumbers();//mostrar numero de semana
  }

  private disbleWeekend():void {
    this.calendar.disableDays("week", [6, 7]); //desabiliatar los fines de semana
  }

  private setHoliday(holyday: string): void {
    this.calendar.setHolidays(holyday);
  }

  private disableRangeDays(from:string, to:string):void {
    this.calendar.setInsensitiveRange(from, to);
  }

  private setHolidays(): void {
    this.calendar.setHolidays("27-11-2017");
    this.setHoliday('25-12-2017');    
    this.setHoliday('01-01-2018');
    this.setHoliday('05-02-2018');
    this.setHoliday('19-03-2018');
    this.setHoliday('01-05-2018');
    this.setHoliday('20-11-2018');
    this.setHoliday('25-12-2018');   
  }
  
  
  private setCalendarLanguage(): void {
    // add once, make sure dhtmlxcalendar.js is loaded
    dhtmlXCalendarObject.prototype.langData["sp"] = {
      // date format
      dateformat: "%d-%m-%Y",
      // full names of months
      monthesFNames: [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ],
      // short names of months
      monthesSNames: [
        "Ene", "Feb", "Mar", "Abr", "May", "Jun",
        "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
      ],
      // full names of days
      daysFNames: [
        "Lunes", "Martes", "Miercoles", "Jueves",
        "Viernes", "Sábado", "Domingo"
      ],
      // short names of days
      daysSNames: [
        "Do", "Lu", "Ma", "Mi",
        "Ju", "Vi", "Sa"
      ],
      // starting day of a week. Number from 1(Monday) to 7(Sunday)
      weekstart: 7,
      // the title of the week number column
      weekname: "s"
    };

    // init calendar
    var myCalenda = new dhtmlXCalendarObject("input");
    myCalenda.loadUserLanguage("sp");

    dhtmlXCalendarObject.prototype.lang = "sp";
  }

  public isNumericValue(value: string): boolean {
    if (isNaN(Number(value))) {
      return false;
    }
    return true;
  }
  
  public cal_formatAsDate(oSource) {   
    this.date = '';
    if (oSource === "") {
      return;
    }
    var temp = String(oSource).toLowerCase();
    var regex = /-/g;
    temp = temp.replace(regex, "/");
    regex = /[.]/g;
    temp = temp.replace(regex, "/");

    var dateParts = temp.split("/");
         
    if (dateParts.length != 3) {
      return;
    }
    if (!this.isNumericValue(dateParts[0]) || !this.isNumericValue(dateParts[2])) {
      return;
    }
     if (!(1 <= Number(dateParts[0]) && Number(dateParts[0]) <= 31)) {
      return;
    }
    if (Number(dateParts[0]) < 10) {
      dateParts[0] = "0" + Number(dateParts[0]);
    }
    if (Number(dateParts[2]) < 100) {      
      dateParts[2] = (Number(dateParts[2]) + 2000).toString();      
    } 
    if (Number(dateParts[2]) > 2099) {
      return;
    }
    if (this.isNumericValue(dateParts[1])) {
      if (!(1 <= Number(dateParts[1]) && Number(dateParts[1]) <= 12)) {
        return;
      }
      var months = new Array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic");
      dateParts[1] = months[Number(dateParts[1]) - 1];
    } else {
      
    }

    this.date = dateParts[0] + "/" + dateParts[1] + "/" + dateParts[2];
   
    return;
  }

  public cal_isDate(oSource): boolean {
    this.cal_formatAsDate(oSource);

    if (this.date === '') {  
      return false;
    } 

    var dateParts = String(this.date).split("/");
    if (dateParts.length != 3) {
      return false;
    }
    
    if (!(1 <= Number(dateParts[0]) && Number(dateParts[0]) <= 31)) {
      return false;
    }
    switch (dateParts[1].toLowerCase()) {
      case "feb":
        if (Number(dateParts[0]) > 29) {
          return false;
        }
        if (Number(dateParts[0]) == 29) { // check leap year
          if ((Number(dateParts[2]) % 4) != 0) {
            return false;
          } else if (((Number(dateParts[2]) % 100) == 0) && ((+dateParts[2] % 400) != 0)) {
            return false;
          }
        }
        break;
      case "abr": case "jun": case "sep": case "nov":
        if (+dateParts[0] == 31) {
          return false;
        }
        break;
      case "ene": case "mar": case "may": case "jul": case "ago": case "oct": case "dic":
        break;
      default:
        return false;
    }
    return true;

  }

  public onBlurMethod(): void {   
   
    if (this.cal_isDate(this.date)) {     
      
      this.calendar.setDate(new Date(this.getDateInNumericFormat()));         
     
      this.onSelectedDate.emit(this.calendar.getDate());
    } else {
      alert("La fecha debe de tener cualquier de los siguientes formatos: \n" +
            " DD/MM/YY \n" +
            " DD-MM-YY \n" +
            " DD.MM.YY \n");
    }
  }

  private setControlId(): void {
    let idNumber = this.getRandomNumber(1,1000000);
    this.inputId = 'ci' + idNumber;
    this.buttonId = 'bi' + idNumber;
  }
  
  private getRandomNumber(from: number, to: number): number {
    return Math.floor((Math.random() * to) + from);    
  }

  private getDateInNumericFormat(): string {
    let dateParts = String(this.date).split("/");
  
    let months = new Array("ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic");
    let index = months.findIndex((x) => x === dateParts[1].toLowerCase())  +1;
    return dateParts[2] + "/" + index + "/" + dateParts[0];
  }

}

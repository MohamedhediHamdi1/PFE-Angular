import { Component } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from 'src/app/Services/constants.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-admin-logs',
  templateUrl: './admin-logs.component.html',
  styleUrls: ['./admin-logs.component.scss']
})
export class AdminLogsComponent {

  currentDate="";
  today=""
  min="2023-05-17"
  constructor(private http: HttpClient, private constants: ConstantsService,private datePipe: DatePipe) {
    this.today=this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
  }
  fileContent="";


  getFileContent(date: string) {
    const url = this.constants.ServerIp+"/admin/logs/"+date;
    const headers = new HttpHeaders().set('Accept', 'text/plain');

    this.http.get(url, { headers, responseType: 'text' }).subscribe(
      (response: string) => {
        this.fileContent = response;
        //console.log(this.fileContent)
      },
      (error: any) => {
        console.error('Error fetching file:', error);
        this.fileContent=""
      }
    );
  }

  getNewLogs(){
    console.log(this.currentDate)
    this. getFileContent(this.currentDate)
  }

  incrementDate() {
    const currentDate = new Date(this.currentDate);
    const currentDay = new Date(this.today);
    
    if (currentDate < currentDay ) {
      currentDate.setDate(currentDate.getDate() + 1);
      this.currentDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd')!;
      this.getNewLogs();
    }
  }

  decrementDate() {
    const currentDate = new Date(this.currentDate);
    const mindate = new Date(this.min);
    if (currentDate > mindate ) {
      currentDate.setDate(currentDate.getDate() - 1);
    this.currentDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd')!;
    this.getNewLogs();
    }
  }
  
  
  
ngOnInit(){
  console.log(this.currentDate)
  this.getFileContent(this.currentDate)
}

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { from } from 'rxjs';
import { HttpClient, HttpHeaders} from'@angular/common/http';
import { Key } from 'protractor';

@Component({
  selector: 'app-room-booking-request',
  templateUrl: './room-booking-request.component.html',
  styleUrls: ['./room-booking-request.component.css']
})
export class RoomBookingRequestComponent implements OnInit {
  booking_request:FormGroup;
  room_type:any={'id':'', 'title':''};
  constructor(private fb:FormBuilder, private http:HttpClient) {  
    this.booking_request = fb.group({
      name:'',
      email:'',
      phone:'',
      address:'',
      from_date:'',
      to_date:'',
      number_of_members:'',
      number_of_rooms:'',
      room_type:'',
    });
  }

  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/get-room-type').subscribe((data:any)=>{
      let resp1 = Array.from(Object.keys(data), k=>data[k]);
    //console.log(resp1[2]);
    this.room_type = resp1[2];
    //console.log(this.room_type);
    });
  }

  send_request(booking_request:any){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    let options = {
      headers : headers,
    };
    this.http.post('http://localhost:8000/api/room_booking_request', booking_request.value, options).subscribe((data:any)=>{
      let resp1 = Array.from(Object.keys(data), k=>data[k]);
    
      if(resp1[0] == 'true'){
        alert('Request Successfully Send');
        this.booking_request.reset();
      }else{
        alert('Please Try Again');
      }
    
    
    });

  }
}
 
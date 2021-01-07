import { Component } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { from } from 'rxjs';
import { HttpClient, HttpHeaders} from'@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hotelManagement';
  user_info = localStorage.getItem('user_session');
  subscribeForm:FormGroup;
  constructor(private fb:FormBuilder, private http:HttpClient) {
      this.subscribeForm=fb.group({
        email:'',
      });
  }

  subscribe_now(subscribeForm:any){

     // console.log(subscribeForm.value);
     const headers = new HttpHeaders();
     headers.append('Content-Type', 'multipart/form-data');
     headers.append('Accept', 'application/json');
     let options = {
       headers : headers,
     };

     this.http.post('http://localhost:8000/api/subs-user',subscribeForm.value, options).subscribe((data)=>{
       console.log(data);
     });
  }

  }

  

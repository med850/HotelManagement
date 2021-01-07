import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { from } from 'rxjs';
import { HttpClient, HttpHeaders} from'@angular/common/http';
import { Key } from 'protractor';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  all_services : any;
  user_info = localStorage.getItem('user_session');
  basic_info = {
    'email':'',
    'name':'',
    'country':'',
    'state':'',
    'city':'',
    'address':'',
    'phone':'',
    'pin_code':'',
    
  }
  contactForm:FormGroup;
    constructor(private fb:FormBuilder, private http:HttpClient) {
    this.contactForm = fb.group({
      name:'',
      email:'',
      phone:'',
      message:''
    });
   }

  
  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/get-service').subscribe((data:any)=>{

    
    //var resp1 = Array.from(Object.entries(data).map(([k, v]) => ([Number(k), v])));
    let resp1 = Array.from(Object.keys(data), k=>data[k]);
     if(resp1[0]){
        this.all_services = resp1[2];
      }
      //console.log(this.all_services);
      //console.log(resp1);
    
    });

    if(this.user_info){
      this.http.get('http://localhost:8000/api/get_user_info/' + this.user_info).subscribe((data:any)=>{
       let resp1 = Array.from(Object.keys(data), k=>data[k]);
     // console.log(resp1[2][0]);
      this.basic_info = resp1[2][0];
      });
    }
    
  }

  save_contact(contactForm :any){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    let options = {
      headers : headers,
    };
    this.http.post('http://localhost:8000/api/contact-form', contactForm.value, options).subscribe((data)=>{
      this.contactForm.reset();
      alert('Contact Message Successfully Send');
    });

      console.log(contactForm.value);
      
    }



}
  


import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { from } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams} from'@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  contactForm:FormGroup; 
  submitted = false;
  constructor(private fb:FormBuilder, private http:HttpClient) {
    this.contactForm = fb.group({
      name:'',
      email:'',
      phone:'',
      message:''
    });
   }
   get f(){ return this.contactForm.controls;}

  ngOnInit(): void {
  }

  saveContact(contactForm:FormGroup){
   // const headers = new HttpHeaders();
    this.submitted = true;

    if(this.contactForm.invalid){
      return;
    }
    let Params = new HttpParams;
    Params = Params.append('firstParameter', this.contactForm.value.name);
    Params = Params.append('secondParameter', this.contactForm.value.email);
    Params = Params.append('troisParameter', this.contactForm.value.phone);
    Params = Params.append('quateriemeParameter', this.contactForm.value.message);

    return this.http.post('http://localhost:8000/api/contact-form', {
      params : {params : Params}
    }).subscribe((data) => {
      alert(data);
  //this.registerForm.reset();
    })



    /*headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    let options ={
      headers:headers,
    };
    this.http.post('http://localhost:8000/api/contact-form', contactForm.value, options).subscribe((data)=>{
      console.log(data);
    });
    console.log(contactForm.value);*/
  }

}
  


import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { from } from 'rxjs';
import { HttpClient, HttpHeaders} from'@angular/common/http';
import { Key } from 'protractor';
import { Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  signup_form:FormGroup;
  login_form:any;
  constructor(private fb:FormBuilder, private http:HttpClient, private router:Router) { 
    let user_info = localStorage.getItem('user_session');
    if(user_info){
      this.router.navigate(['/']);                                                                                                                                                                                                                                                                                                                                                                                            
    }
    this.signup_form = fb.group({
        name:'',
        email:'',
        phone:'',
        password:'',
    });
    this.login_form = fb.group({
      'email':'',
      'password':'',
    });
  }

  ngOnInit(): void {
  }

  signup(signup_form:any){
    //console.log(signup_form.value);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    let options = {
      headers : headers,
    };
    this.http.post('http://localhost:8000/api/signup', signup_form.value, options).subscribe((data:any)=>{
     // console.log(data);
     let resp1 = Array.from(Object.keys(data), k=>data[k]);
     //console.log(resp1);
     if(resp1[0] == 'true'){
       alert('Successfully Signup | Please Login To Continue...');
       this.signup_form.reset();

     }else{
       alert('Please Try Again');
     }

    });
  }



  login(login_form:any){
    //console.log(login_form.value);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    let options = {
      headers : headers,
    };
    this.http.post('http://localhost:8000/api/login', login_form.value, options).subscribe((data:any)=>{
      let resp1 = Array.from(Object.keys(data), k=>data[k]);
      //console.log(resp1);
      if(resp1[0] == 'true'){
          localStorage.setItem('user_session', resp1[2][0]['id']);
          //this.router.navigate(['/']);
          window.location.href="/";
      }else{
        alert('Invalid Email Or Password');
      }
    });
  }




}

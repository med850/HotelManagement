import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from'@angular/common/http';
import { FormGroup, FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user_info = localStorage.getItem('user_session');
  user_profile_form:FormGroup;
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
  constructor(private http:HttpClient, private fb:FormBuilder) { 
    this.user_profile_form = fb.group({
      'name':'',
      'email':'',
      'country':'',
      'state':'',
      'city':'',
      'address':'',
      'phone':'',
      'pin_code':'',
      'password':'',
      'rpassword':'',
      'user_id':'',
    });
  }

  
  ngOnInit(): void {
  console.log(this.user_info);
  this.http.get('http://localhost:8000/api/get_user_info/'+this.user_info).subscribe((data:any)=>{
    //console.log(data);
    let resp1 = Array.from(Object.keys(data), k=>data[k]);
    this.basic_info = resp1[2][0];


  });
}

update_profile(user_profile_form:any){

  //console.log(this.user_profile_form.value);
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.append('Accept', 'application/json');
  let options = {
    headers : headers,
  };

 this.http.post('http://localhost:8000/api/update_profile', user_profile_form.value,options).subscribe((data:any)=>{
  //console.log(data);
  alert('Profile Successfully Updated');
 });
}

}

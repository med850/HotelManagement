import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { from } from 'rxjs';
import { HttpClient, HttpHeaders} from'@angular/common/http';
import { Key } from 'protractor';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedback_type:any={'id':'', 'title':''};
  feedback_form:FormGroup;
  constructor(private http:HttpClient, private fb:FormBuilder) {
    this.feedback_form = fb.group({
      name:'',
      email:'',
      phone:'',
      feedback_type:'',
      message:'',
    });
   }

  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/get-feedback-type').subscribe((data:any)=>{
      let resp1 = Array.from(Object.keys(data), k=>data[k]);
      this.feedback_type = resp1[2];
      console.log(this.feedback_type);
      //console.log(resp1);
    });
  }


  save_feedback(feedback_form:any){
   // console.log(feedback_form.value);
   const headers = new HttpHeaders();
   headers.append('Content-Type', 'multipart/form-data');
   headers.append('Accept', 'application/json');
   let options = {
     headers : headers,
   };
   this.http.post('http://localhost:8000/api/save-feedback', feedback_form.value, options).subscribe((data:any)=>{
    let resp1 = Array.from(Object.keys(data), k=>data[k]);
    //console.log(resp1);
    if(resp1[0] == 'true'){
      alert('Feedback Successfully Send');
      this.feedback_form.reset();
    }else{
      alert('Feedback Not Send... Please Try Again ');
    }
   });
  }

}

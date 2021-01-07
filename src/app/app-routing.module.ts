import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AuthComponent } from './auth/auth.component';
import { RoomBookingRequestComponent } from './room-booking-request/room-booking-request.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { LogoutComponent } from './logout/logout.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [
  {'path' : '', 'component' : HomeComponent},
  {'path' : 'contact', 'component' : ContactComponent},
  {'path' : 'about', 'component' : AboutComponent},
  {'path' : 'auth', 'component' : AuthComponent},
  {'path' : 'room-booking-request', 'component' : RoomBookingRequestComponent},
  {'path' : 'feedback', 'component' : FeedbackComponent},
  { 'path' : 'logout', 'component' : LogoutComponent},
  { 'path' : 'profile', 'component' : UserProfileComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

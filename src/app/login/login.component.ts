import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent {
fullname: string = '';
  email = '';
  password = '';
  name='';
  error = '';

  constructor(private auth: AuthService, private router: Router) { }
login() {
  const result = this.auth.login(this.fullname, this.email, this.password);
console.log(result,'details');

  if (result) {
    this.router.navigate(['/home']);
  } else {
    this.error = "Invalid login!";
  }
}

}

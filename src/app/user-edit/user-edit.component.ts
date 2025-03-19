import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  standalone: false
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  userId: number;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.userId = 0; // Default value, will be overwritten
  }

  ngOnInit(): void {
    // Retrieve user ID from route
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.loadUserData(this.userId);
    });
  }

  // Load user data to pre-fill the form
  loadUserData(userId: number): void {
    this.userService.getUserById(userId).subscribe({
      next: (user: { username: any; email: any; password: any; }) => {
        this.userForm.patchValue({
          username: user.username,
          email: user.email,
          password: user.password,
        });
      },
      error: () => {
        this.errorMessage = 'Error fetching user data. Please try again.';
      },
    });
  }

  // Handle form submission
  onSubmit(): void {
    if (this.userForm.valid) {
      this.userService.updateUser(this.userId, this.userForm.value).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err: { error: { message: string; }; }) => {
          this.errorMessage = err.error.message || 'Error updating user. Please try again.';
        },
      });
    }
  }
}

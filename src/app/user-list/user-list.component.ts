import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../user.service';
import { Router } from '@angular/router';
import { User } from 

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: false
})
export class UserListComponent implements OnInit {
  users: User[] = []
  displayedColumns: string[] = ['id', 'username', 'email', 'actions'];
  errorMessage: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Fetch the list of users
  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data: any) => {
        this.users = data;
      },
      error: (err: any) => {
        this.errorMessage = 'Error fetching users. Please try again later.';
      },
    });
  }

  // Navigate to edit user page
  editUser(id: number): void {
    this.router.navigate([`/edit/${id}`]);
  }

  // Delete a user
  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter(user => user.id !== id);
        },
        error: (err: any) => {
          this.errorMessage = 'Error deleting user. Please try again.';
        },
      });
    }
  }

  // Navigate to create user page
  createUser(): void {
    this.router.navigate(['/create']);
  }
}

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-rx-resource',
  imports: [ReactiveFormsModule, MatProgressSpinner, CommonModule],
  templateUrl: './rx-resource.html',
  styleUrl: './rx-resource.scss',
})
export class RxResource {
  searchControl = new FormControl('');
  searchSignal = signal<string>('');
  http = inject(HttpClient);

  usersResource = rxResource<User[], { q: string }>({
    params: () => ({ q: this.searchSignal() }),
    stream: ({ params }) =>
      this.http.get<User[]>(
        `https://jsonplaceholder.typicode.com/users?name_like=${params.q}`
      ),
    defaultValue: [],
  });

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe((userEntry) => {
      this.searchSignal.set(userEntry || '');
    });
  }
}

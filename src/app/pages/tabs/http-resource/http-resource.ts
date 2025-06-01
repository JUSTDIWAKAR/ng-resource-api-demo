import { CommonModule } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { debounceTime, distinctUntilChanged } from 'rxjs';

type User = {
  id: number;
  name: string;
  email: string;
};

@Component({
  selector: 'app-http-resource',
  imports: [ReactiveFormsModule, MatProgressSpinner, CommonModule],
  templateUrl: './http-resource.html',
  styleUrl: './http-resource.scss',
})
export class HttpResource {
  searchControl = new FormControl('');
  query = signal('');

  // usersResource = httpResource<User[]>(
  //   () => `https://jsonplaceholder.typicode.com/users?name_like=${this.query()}`
  // );

  usersResource = httpResource<User[]>(() => ({
    url: `https://jsonplaceholder.typicode.com/users`,
    method: 'GET',
    params: { name_like: this.query() },
    headers: {
      'Content-Type': 'application/json',
    },
  }));

  constructor() {
    this.searchControl.valueChanges
      //.pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((value) => {
        this.query.set(value ?? '');
      });
  }
}

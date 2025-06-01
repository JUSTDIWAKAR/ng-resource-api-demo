import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, resource, signal } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

type User = {
  id: number;
  name: string;
  email: string;
};

@Component({
  selector: 'app-resource',
  imports: [CommonModule, MatProgressSpinner, ReactiveFormsModule],
  templateUrl: './resource.html',
  styleUrl: './resource.scss',
})
export class Resource implements OnInit {
  fb = inject(NonNullableFormBuilder);
  searchControl = new FormControl('', { nonNullable: true });
  query = signal('');

  usersResource = resource<User[], { query: string }>({
    params: () => ({ query: this.query() }),
    loader: ({ params, abortSignal }) =>
      fetch(
        `https://jsonplaceholder.typicode.com/users?name_like=${params.query}`,
        {
          signal: abortSignal,
        }
      ).then((res) => res.json()),
  });

  addUserBySet(): void {
    this.usersResource.set([
      ...(this.usersResource.value() ?? []),
      { id: 9, name: 'ng-delhi', email: 'ngdelhi@gmail.com' },
    ]);
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe((userEntry) => {
      this.query.set(userEntry);
    });
  }
}

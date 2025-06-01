import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-httpclient-rxjs',
  imports: [CommonModule, ReactiveFormsModule, MatProgressSpinner],
  templateUrl: './httpclient-rxjs.html',
  styleUrl: './httpclient-rxjs.scss',
})
export class HttpclientRxjs implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private destroy$ = new Subject<void>();
  searchControl = new FormControl('');
  users: any[] = [];
  loading: boolean = false;
  error: boolean = false;

  ngOnInit(): void {
    // this.searchControl.valueChanges.subscribe((query) => {
    //   this.http
    //     .get<any[]>(
    //       `https://jsonplaceholder.typicode.com/users?name_like=${query}`
    //     )
    //     .subscribe({
    //       next: (users) => {
    //         this.users = users;
    //         this.loading = false;
    //       },
    //       error: () => {
    //         this.error = true;
    //         this.loading = false;
    //         this.users = [];
    //       },
    //     });
    // });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((query): query is string => !!query),
        switchMap((query: string) => {
          this.loading = true;
          this.error = false;

          return this.http.get<any[]>(
            `https://jsonplaceholder.typicode.com/users?name_like=${query}`
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (users) => {
          this.users = users;
          this.loading = false;
        },
        error: () => {
          this.error = true;
          this.loading = false;
          this.users = [];
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$?.next();
    this.destroy$?.complete();
  }
}

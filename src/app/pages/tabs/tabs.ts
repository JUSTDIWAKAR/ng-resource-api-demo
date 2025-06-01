import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Resource } from './resource/resource';
import { RxResource } from './rx-resource/rx-resource';
import { HttpResource } from './http-resource/http-resource';
import { HttpclientRxjs } from './httpclient-rxjs/httpclient-rxjs';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-tabs',
  imports: [
    CommonModule,
    MatTabsModule,
    HttpclientRxjs,
    Resource,
    RxResource,
    HttpResource,
  ],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
})
export class Tabs {
  selectedTab = 'httpclient';
  tabs = [
    { key: 'httpclient', label: 'HttpClient + RxJS' },
    { key: 'resource', label: 'Resource API' },
    { key: 'rxresource', label: 'RxResource' },
    { key: 'httpresource', label: 'HttpResource' },
  ];
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpclientRxjs } from './httpclient-rxjs';

describe('HttpclientRxjs', () => {
  let component: HttpclientRxjs;
  let fixture: ComponentFixture<HttpclientRxjs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpclientRxjs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpclientRxjs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxResource } from './rx-resource';

describe('RxResource', () => {
  let component: RxResource;
  let fixture: ComponentFixture<RxResource>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxResource]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxResource);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

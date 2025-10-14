import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesHub } from './resources-hub';

describe('ResourcesHub', () => {
  let component: ResourcesHub;
  let fixture: ComponentFixture<ResourcesHub>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourcesHub]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourcesHub);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

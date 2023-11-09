import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WebcamPage } from './webcam.page';

describe('WebcamPage', () => {
  let component: WebcamPage;
  let fixture: ComponentFixture<WebcamPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WebcamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

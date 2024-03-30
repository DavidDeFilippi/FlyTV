import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DplayerPage } from './dplayer.page';

describe('DplayerPage', () => {
  let component: DplayerPage;
  let fixture: ComponentFixture<DplayerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DplayerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

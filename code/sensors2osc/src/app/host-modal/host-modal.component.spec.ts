import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HostModalComponent } from './host-modal.component';

describe('HostModalComponent', () => {
  let component: HostModalComponent;
  let fixture: ComponentFixture<HostModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

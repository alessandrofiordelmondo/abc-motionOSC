import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SensorsService } from '../sensors.service';
import { HostModalComponent } from '../host-modal/host-modal.component'
import { DataService } from '../data.service';
import { SwitchThemeService } from '../switch-theme.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(
    public sensors: SensorsService,
    public data: DataService,
    private modalCtrl: ModalController,
    public theme: SwitchThemeService
  ) {}

  public myCustomInterface: any = {
    cssClass: 'my-custom-interface'
  }

  private sensList:string[] = [
    'accel',
    'gyro',
    'magne',
    'orient',
    'heading'
  ]

  public accelView:boolean = false;
  public accelStart:boolean = false;
  public gyroView:boolean = false;
  public gyroStart:boolean = false;
  public magneView:boolean = false;
  public magneStart:boolean = false;
  public orientView:boolean = false;
  public orientStart:boolean = false;
  public headView:boolean = false;
  public headStart:boolean = false;

  setupHosting(){
    this.modalCtrl.create({
      component: HostModalComponent
    }).then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss()
    })
  }

  ngOnInit(){
    this.data.getTheme().then((t:'dark' | 'light') => {
      if (t != undefined){
        this.theme._THEME = t;
      }
      this.theme.setTheme()
    })
    this.data.getAwakeMode().then((s:boolean) => {
      if(s != undefined){
        this.theme.awake = s;
      }
      this.theme.setAwakeMode()
    })
    if(this.data.getRemoteAddress() != undefined && this.data.getRemotePort() != undefined){
      this.sensors.updateRemote().then(() => {
        this.sensList.forEach((s:string) => {
          this.data.getSensorAddress(s).then((val:string) => {
            if(val != undefined){
              this.sensors[s+'OSCAddress'] = val;
            }
          })
        })
      })
    }
  }
  
}

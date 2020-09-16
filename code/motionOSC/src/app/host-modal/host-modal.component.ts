import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DataService } from '../data.service';
import { SensorsService } from '../sensors.service';
import { SwitchThemeService } from '../switch-theme.service';

@Component({
  selector: 'app-host-modal',
  templateUrl: './host-modal.component.html',
  styleUrls: ['./host-modal.component.scss'],
})
export class HostModalComponent {

  add:string = '';
  port:number;

  constructor(
    public sensors: SensorsService,
    private modalCtrl: ModalController,
    private data: DataService,
    public formBuilder: FormBuilder,
    public theme: SwitchThemeService
  ) { 
    this.hostForm = formBuilder.group({
      address: [sensors.remoteAddress, 
        Validators.compose([
          Validators.maxLength(15), 
          Validators.minLength(7),
          Validators.pattern('^(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3,3}\([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])'),
          Validators.required])],
      port: [sensors.remotePort, Validators.required]
    })
  }

  public hostForm: FormGroup;

  onCancel(){
    this.modalCtrl.dismiss()
  }

  setHost(){
    this.data.setRemoteAddress(this.hostForm.value['address']).then(() => {
      this.data.setRemotePort(this.hostForm.value['port']).then(() => {
        this.sensors.updateRemote().then(() => {
          this.modalCtrl.dismiss()
        })
      })
    })
  }
  
  themeChanged(e){
    this.data.setTheme(e.detail.value).then(() => {
      this.theme._THEME = e.detail.value;
      this.theme.setTheme()
    })
  }
  awakeModeChanged(e){
    this.data.setAwakeMode(e.detail.value).then(() => {
      this.theme.awake = JSON.parse(e.detail.value);
      this.theme.setAwakeMode()
    })
  }

}

import { Injectable, NgZone } from '@angular/core';
import { Subscription } from 'rxjs';
import { Plugins, MotionEventResult, MotionOrientationEventResult} from '@capacitor/core';
import { Magnetometer, MagnetometerReading } from '@ionic-native/magnetometer/ngx';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { Sensors, TYPE_SENSOR } from '@ionic-native/sensors/ngx';

import * as OSC from 'cordova-plugin-osc/www/OSC'
import { DataService } from './data.service';

const{ Motion } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  constructor(
    private zone: NgZone,
    private magne: Magnetometer,
    private deviceHeading: DeviceOrientation,
    private cordovaSens: Sensors,
    private data: DataService
  ) {}

  // OSC
  public osc = new OSC()
  public remotePort:number = 8001;
  public remoteAddress:string = '0.0.0.0';

  async updateRemote(): Promise<void>{
    await this.data.getRemoteAddress().then((add:string) => {
      this.remoteAddress = add;
      this.data.getRemotePort().then((port:number) => {
        this.remotePort = port;
      })
    })
  }

  async updateSensorAddress(variable:string, sens:string): Promise<void>{
    await this.data.getSensorAddress(sens).then((val:string) => {
      this[variable] = val;
    })
  }

  private sendOsc(address:string, value: string | number){
    this.osc.send({
      remoteAddress: this.remoteAddress,
      remotePort: this.remotePort,
      address: address,
      arguments: [value]
    })
  }

  // ACCELEROMETER
  private accelerometer;
  private accelIsStarted:boolean = false;
  public accelValue = {x:0, y:0, z:0};
  // wG = with Gravity
  // nG = no Gravity
  public accelValuesType:'wG' | 'nG' = 'wG';

  public accelOSCAddress:string = '/accel'

  public watchAccelerometer(){
    this.accelIsStarted = true;
    this.accelerometer = Motion.addListener('accel', (data: MotionEventResult) => {
      this.zone.run(() => {
        if (this.accelValuesType == 'wG'){
          this.accelValue.x = data.accelerationIncludingGravity.x;
          this.sendOsc(this.accelOSCAddress+'/x', data.accelerationIncludingGravity.x)
          this.accelValue.y = data.accelerationIncludingGravity.y;
          this.sendOsc(this.accelOSCAddress+'/y', data.accelerationIncludingGravity.y)
          this.accelValue.z = data.accelerationIncludingGravity.z;
          this.sendOsc(this.accelOSCAddress+'/z', data.accelerationIncludingGravity.z)
        } else if(this.accelValuesType == 'nG') {
          this.accelValue.x = data.acceleration.x;
          this.sendOsc(this.accelOSCAddress+'/x', data.acceleration.x)
          this.accelValue.y = data.acceleration.y;
          this.sendOsc(this.accelOSCAddress+'/y', data.acceleration.y)
          this.accelValue.z = data.acceleration.z;
          this.sendOsc(this.accelOSCAddress+'/z', data.acceleration.z)
        }
      })
    })
  }
  public stopAccelerometer(){
    if(this.accelIsStarted){
      this.accelIsStarted = false;
      this.accelerometer.remove()
    }
  }

  // GYROSCOPE
  private gyroscope;
  private gyroIsStarted:boolean = false;
  public gyroValue = {alpha: 0, gamma:0, beta:0}

  public gyroOSCAddress:string = '/gyro'

  public watchGyroscope(){
    this.gyroIsStarted = true;
    this.gyroscope = Motion.addListener('accel', (data: MotionEventResult) => {
      this.zone.run(() => {
        this.gyroValue.alpha = data.rotationRate.alpha;
        this.sendOsc(this.gyroOSCAddress+'/alpha', data.rotationRate.alpha)
        this.gyroValue.beta = data.rotationRate.beta;
        this.sendOsc(this.gyroOSCAddress+'/beta', data.rotationRate.beta)
        this.gyroValue.gamma = data.rotationRate.gamma;
        this.sendOsc(this.gyroOSCAddress+'/gamma', data.rotationRate.gamma)
      })
    })
  }
  public stopGyroscope(){
    if(this.gyroIsStarted){
      this.gyroIsStarted = false;
      this.gyroscope.remove()
    }
  }

  // MAGNETOMETER
  private magnetometer: Subscription
  private magneIsStarted:boolean = false;
  public magneValue = {x: 0, y:0, z:0};

  public magneOSCAddress:string = '/magne'

  public watchMagnetometer(){
    this.magneIsStarted = true;
    this.magnetometer = this.magne.watchReadings().subscribe((data: MagnetometerReading) => {
      this.magneValue.x = data.x;
      this.sendOsc(this.magneOSCAddress+'/x', data.x)
      this.magneValue.y = data.y;
      this.sendOsc(this.magneOSCAddress+'/y', data.y)
      this.magneValue.z = data.z;
      this.sendOsc(this.magneOSCAddress+'/z', data.z)
    })
  }
  public stopMagnetometer(){
    if(this.magneIsStarted){
      this.magneIsStarted = false;
      this.magnetometer.unsubscribe()
    }
  }

  // ORIENTATION
  private orientation;
  private orientIsStarted:boolean = false;
  public orientValue = {alpha:0, beta:0, gamma:0};

  public orientOSCAddress:string = '/orient'

  public watchOrientation(){
    this.orientIsStarted = true;
    this.orientation = Motion.addListener('orientation', (data:MotionOrientationEventResult) => {
      this.zone.run(() => {
        this.orientValue.alpha = data.alpha;
        this.sendOsc(this.orientOSCAddress+'/alpha', data.alpha)
        this.orientValue.beta = data.beta;
        this.sendOsc(this.orientOSCAddress+'/beta', data.beta)
        this.orientValue.gamma = data.gamma;
        this.sendOsc(this.orientOSCAddress+'/gamma', data.gamma)
      })
    })
  }
  public stopOrientation(){
    if(this.orientIsStarted){
      this.orientIsStarted = false;
      this.orientation.remove()
    }
  }
  
  // HEADING
  private heading;
  private headingIsStarted:boolean = false;
  public headingValue = {h: 0};
  // 'm' = magnetic 
  // 't' = true
  public headingValuesType: 't' | 'm' = 't';

  public headingOSCAddress:string = '/head'

  public watchHeading(){
    this.headingIsStarted = true
    this.heading = this.deviceHeading.watchHeading().subscribe(
      (data: DeviceOrientationCompassHeading) => {
        if (this.headingValuesType == 't'){
          this.headingValue.h = data.trueHeading;
          this.sendOsc(this.headingOSCAddress+'/h', data.trueHeading)
        } else if (this.headingValuesType = 'm'){
          this.headingValue.h = data.magneticHeading;
          this.sendOsc(this.headingOSCAddress+'/h', data.magneticHeading)
        }
      }
    );
  }
  public stopHeading(){
    this.headingIsStarted = false;
    this.heading.unsubscribe()
  }

  //LIGHT
  private Light;
  private LightIsStarted:boolean = false;
  public lightValue = {l: 0};

  public lightOSCAddress:string = '/light'

  public watchLight(){
    this.LightIsStarted = true;
    this.cordovaSens.enableSensor(TYPE_SENSOR.LIGHT)
    this.Light = setInterval(() => {
      this.cordovaSens.getState().then(e => {
        this.lightValue.l = e;
        this.sendOsc(this.lightOSCAddress+'/l', e);
        console.log(e)
      })
    }, 100)
  }

  public stopLight(){
    this.LightIsStarted = false
    clearInterval(this.Light);
    this.cordovaSens.disableSensor()
  }

}
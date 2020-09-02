import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Magnetometer } from '@ionic-native/magnetometer/ngx';
import { DeviceOrientation } from '@ionic-native/device-orientation/ngx';
import { Sensors } from '@ionic-native/sensors/ngx';
import { Insomnia } from '@ionic-native/insomnia/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Magnetometer,
    DeviceOrientation,
    Sensors,
    Insomnia
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

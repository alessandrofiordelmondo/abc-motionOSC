import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomController } from '@ionic/angular';
import { Insomnia } from '@ionic-native/insomnia/ngx';

interface Theme {
  name: string;
  styles: ThemeStyle[];
}

interface ThemeStyle {
  themeVariable: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class SwitchThemeService {
  public _THEME: 'light'|'dark' = 'dark';
  private themes: Theme[] = [];

  private darkColorsArry:string[] = ['#00eeee', '#00aaee', '#00eeaa'];
  private lightColorsArry:string[] = ['#ff0000', '#00aa00', '#0000cc'];

  public colorsArry: string[] = this.darkColorsArry;

  public awake:boolean = false;
  private sleep:boolean = true;

  constructor(
    private domCtrl: DomController, 
    @Inject(DOCUMENT) private document,
    private insomnia: Insomnia
    ) { 

    this.themes = [
      {
        name: 'dark',
        styles: [
          { themeVariable: '--ion-background-color', value:'#333333'},
          { themeVariable: '--ion-color-primary', value:'#e9ffff'},
          { themeVariable: '--ion-color-primary-rgb', value:'233,255,255'},
          { themeVariable: '--ion-color-primary-contrast', value: '#000000'},
          { themeVariable: '--ion-color-primary-contrast-rgb', value: '0,0,0'},
          { themeVariable: '--ion-color-primary-shade', value: '#cde0e0'},
          { themeVariable: '--ion-color-primary-tint', value: '#ebffff'},
          { themeVariable: '--ion-color-secondary', value: '#788585'},
          { themeVariable: '--ion-color-secondary-rgb', value: '120,133,133'},
          { themeVariable: '--ion-color-primary', value: '#e9ffff'},
          { themeVariable: '--ion-color-secondary-contrast-rgb', value: '0,0,0'},
          { themeVariable: '--ion-color-secondary-shade', value: '#6a7575'},
          { themeVariable: '--ion-color-secondary-tint', value: '#869191'},
          { themeVariable: '--ion-color-tertiary', value: '#324646'},
          { themeVariable: '--ion-color-tertiary-rgb', value: '50,70,70'},
          { themeVariable: '--ion-color-primary', value: '#e9ffff'},
          { themeVariable: '--ion-color-tertiary-contrast-rgb', value: '255,255,255'},
          { themeVariable:'--ion-color-tertiary-shade', value: '#2c3e3e'},
          { themeVariable: '--ion-color-tertiary-tint', value: '#475959'},
          { themeVariable: '--ion-color-success', value: '#2dd36f'},
          { themeVariable: '--ion-color-success-rgb', value: '45,211,111'},
          { themeVariable: '--ion-color-success-contrast', value: '#ffffff'},
          { themeVariable: '--ion-color-success-contrast-rgb', value: '255,255,255'},
          { themeVariable: '--ion-color-success-shade', value: '#28ba62'},
          { themeVariable: '--ion-color-success-tint', value: '#42d77d'},
          { themeVariable: '--ion-color-warning', value: '#ffc409'},
          { themeVariable: '--ion-color-warning-rgb', value: '255,196,9'},
          { themeVariable: '--ion-color-warning-contrast', value: '#000000'},
          { themeVariable: '--ion-color-warning-contrast-rgb', value:'0,0,0'},
          { themeVariable: '--ion-color-warning-shade', value: '#e0ac08'},
          { themeVariable: '--ion-color-warning-tint', value: '#ffca22'},
          { themeVariable: '--ion-color-danger', value: '#eb445a'},
          { themeVariable: '--ion-color-danger-rgb', value: '235,68,90'},
          { themeVariable: '--ion-color-danger-contrast', value: '#ffffff'},
          { themeVariable: '--ion-color-danger-contrast-rgb', value: '255,255,255'},
          { themeVariable: '--ion-color-danger-shade', value: '#cf3c4f'},
          { themeVariable: '--ion-color-danger-tint', value: '#ed576b'},
          { themeVariable: '--ion-color-dark', value: '#222428'},
          { themeVariable: '--ion-color-dark-rgb', value: '34,36,40'},
          { themeVariable: '--ion-color-dark-contrast', value: '#ffffff'},
          { themeVariable: '--ion-color-dark-contrast-rgb', value: '255,255,255'},
          { themeVariable: '--ion-color-dark-shade', value: '#1e2023'},
          { themeVariable: '--ion-color-dark-tint', value: '#383a3e'},
          { themeVariable: '--ion-color-medium', value: '#92949c'},
          { themeVariable: '--ion-color-medium-rgb', value: '146,148,156'},
          { themeVariable: '--ion-color-medium-contrast', value: '#ffffff'},
          { themeVariable: '--ion-color-medium-contrast-rgb', value: '255,255,255'},
          { themeVariable: '--ion-color-medium-shade', value: '#808289'},
          { themeVariable: '--ion-color-medium-tint', value: '#9d9fa6'},
          { themeVariable: '--ion-color-light', value: '#f4f5f8'},
          { themeVariable: '--ion-color-light-rgb', value: '244,245,248'},
          { themeVariable: '--ion-color-light-contrast', value:'#000000'},
          { themeVariable: '--ion-color-light-contrast-rgb', value: '0,0,0'},
          { themeVariable: '--ion-color-light-shade', value: '#d7d8da'},
          { themeVariable: '--ion-color-light-tint', value: '#f5f6f9'}
        ]
      },
      {
        name: 'light',
        styles: [
          { themeVariable: '--ion-background-color', value:'#cccccc'},
          { themeVariable: '--ion-color-primary', value:'#00ffff'},
          { themeVariable: '--ion-color-primary-rgb', value:'0,255,255'},
          { themeVariable: '--ion-color-primary-contrast', value: '#000000'},
          { themeVariable: '--ion-color-primary-contrast-rgb', value: '0,0,0'},
          { themeVariable: '--ion-color-primary-shade', value: '#00e0e0'},
          { themeVariable: '--ion-color-primary-tint', value: '#1affff'},

          { themeVariable: '--ion-color-secondary', value: '#a8c8e6'},
          { themeVariable: '--ion-color-secondary-rgb', value: '168,200,230'},
          { themeVariable: '--ion-color-primary', value: '#000000'},
          { themeVariable: '--ion-color-secondary-contrast-rgb', value: '0,0,0'},
          { themeVariable: '--ion-color-secondary-shade', value: '#94b0ca'},
          { themeVariable: '--ion-color-secondary-tint', value: '#b1cee9'},
          
          { themeVariable: '--ion-color-tertiary', value: '#5260ff'},
          { themeVariable: '--ion-color-tertiary-rgb', value: '82,96,255'},
          { themeVariable: '--ion-color-primary', value: '#ffffff'},
          { themeVariable: '--ion-color-tertiary-contrast-rgb', value: '255,255,255'},
          { themeVariable:'--ion-color-tertiary-shade', value: '#4854e0'},
          { themeVariable: '--ion-color-tertiary-tint', value: '#6370ff'},

          { themeVariable: '--ion-color-success', value: '#2dd36f'},
          { themeVariable: '--ion-color-success-rgb', value: '45,211,111'},
          { themeVariable: '--ion-color-success-contrast', value: '#ffffff'},
          { themeVariable: '--ion-color-success-contrast-rgb', value: '255,255,255'},
          { themeVariable: '--ion-color-success-shade', value: '#28ba62'},
          { themeVariable: '--ion-color-success-tint', value: '#42d77d'},
          { themeVariable: '--ion-color-warning', value: '#ffc409'},
          { themeVariable: '--ion-color-warning-rgb', value: '255,196,9'},
          { themeVariable: '--ion-color-warning-contrast', value: '#000000'},
          { themeVariable: '--ion-color-warning-contrast-rgb', value:'0,0,0'},
          { themeVariable: '--ion-color-warning-shade', value: '#e0ac08'},
          { themeVariable: '--ion-color-warning-tint', value: '#ffca22'},
          { themeVariable: '--ion-color-danger', value: '#eb445a'},
          { themeVariable: '--ion-color-danger-rgb', value: '235,68,90'},
          { themeVariable: '--ion-color-danger-contrast', value: '#ffffff'},
          { themeVariable: '--ion-color-danger-contrast-rgb', value: '255,255,255'},
          { themeVariable: '--ion-color-danger-shade', value: '#cf3c4f'},
          { themeVariable: '--ion-color-danger-tint', value: '#ed576b'},
          { themeVariable: '--ion-color-dark', value: '#222428'},
          { themeVariable: '--ion-color-dark-rgb', value: '34,36,40'},
          { themeVariable: '--ion-color-dark-contrast', value: '#ffffff'},
          { themeVariable: '--ion-color-dark-contrast-rgb', value: '255,255,255'},
          { themeVariable: '--ion-color-dark-shade', value: '#1e2023'},
          { themeVariable: '--ion-color-dark-tint', value: '#383a3e'},
          { themeVariable: '--ion-color-medium', value: '#92949c'},
          { themeVariable: '--ion-color-medium-rgb', value: '146,148,156'},
          { themeVariable: '--ion-color-medium-contrast', value: '#ffffff'},
          { themeVariable: '--ion-color-medium-contrast-rgb', value: '255,255,255'},
          { themeVariable: '--ion-color-medium-shade', value: '#808289'},
          { themeVariable: '--ion-color-medium-tint', value: '#9d9fa6'},
          { themeVariable: '--ion-color-light', value: '#f4f5f8'},
          { themeVariable: '--ion-color-light-rgb', value: '244,245,248'},
          { themeVariable: '--ion-color-light-contrast', value:'#000000'},
          { themeVariable: '--ion-color-light-contrast-rgb', value: '0,0,0'},
          { themeVariable: '--ion-color-light-shade', value: '#d7d8da'},
          { themeVariable: '--ion-color-light-tint', value: '#f5f6f9'}
        ]
      }
    ]

  }
  setTheme(): void {
    let theme = this.themes.find(theme => theme.name === this._THEME);
    this.domCtrl.write(() => {
      theme.styles.forEach(style => {
        document.documentElement.style.setProperty(style.themeVariable, style.value);
      });
    });
    if(this._THEME == 'dark'){
      this.colorsArry = this.darkColorsArry;
    } else if (this._THEME == 'light'){
      this.colorsArry = this.lightColorsArry;
    }
  }
  // AWAKE MODE
  setAwakeMode(){
    if(this.awake == true){
      this.insomnia.keepAwake().then(() => {
      })
      this.sleep = false;
    }
    if(this.awake == false && this.sleep == false){
      this.insomnia.allowSleepAgain().then(() => {
      })
      this.sleep = true
    }
  }



}

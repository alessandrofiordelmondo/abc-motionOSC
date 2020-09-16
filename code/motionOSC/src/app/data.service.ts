import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const {Storage} = Plugins;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  async setRemoteAddress(num:string): Promise<void> {
    await Storage.set({
      key: 'ip',
      value: num
    });
  }

  async getRemoteAddress(): Promise<string> {
    const i = await Storage.get({ key: 'ip' });
    return i.value;
  }

  async setRemotePort(num:number): Promise<void> {
    await Storage.set({
      key: 'port',
      value: JSON.stringify(num)
    });
  }

  async getRemotePort(): Promise<number> {
    const i = await Storage.get({ key: 'port' });
    return JSON.parse(i.value);
  }

  async setSensorAddress(sens:string, val:string): Promise<void>{
    await Storage.set({
      key: sens,
      value: val
    })
  }

  async getSensorAddress(sens:string): Promise<string>{
    const i = await Storage.get({key: sens});
    return i.value;
  }

  async setTheme(t: 'dark'| 'light'): Promise<void>{
    await Storage.set({
      key: 'theme',
      value: t
    })
  }

  async getTheme():Promise<string>{
    const t = await Storage.get({key: 'theme'});
    return t.value
  }

  async setAwakeMode(s:boolean):Promise<void>{
    await Storage.set({
      key: 'awake',
      value: JSON.stringify(s)
    })
  }

  async getAwakeMode():Promise<boolean>{
    const s = await Storage.get({key: 'awake'});
    return JSON.parse(s.value)
  }

}

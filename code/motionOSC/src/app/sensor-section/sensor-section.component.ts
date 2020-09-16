import { Component, ViewChild, ElementRef, AfterViewInit, Input, OnDestroy  } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Chart } from 'chart.js'
import { DataService } from '../data.service';
import { SensorsService } from '../sensors.service';

interface dataLine {
  label:string,
  fill:boolean,
  borderColor: string,
  data: number[],
}

@Component({
  selector: 'app-sensor-section',
  templateUrl: './sensor-section.component.html',
  styleUrls: ['./sensor-section.component.scss'],
})
export class SensorSectionComponent implements AfterViewInit, OnDestroy{

  @ViewChild('plot') canvas: ElementRef;
  @Input() sensorValue: 
    'accelValue' | 
    'gyroValue' | 
    'magneValue' | 
    'orientValue' | 
    'headingValue';
  @Input() colors: string[];

  constructor(
    public sensors: SensorsService,
    private data: DataService
  ) { 
    this.addForm = new FormControl('', Validators.compose([
      Validators.pattern('^\/\.{1,}'),
      Validators.required
    ]))
  }

  public addForm: FormControl

  public internalAddress:string = ''

  private plotting: Chart;
  private N:number = 100;
  private lab:number[] = new Array(this.N);

  private sensorObject;
  private sensorObjectVariables: string[];
  private lineData: dataLine[] = [];

  private interval;
  private i:number = 0;

  public sensor:string;
  public sensorAddress:string;
  public address: string[] = [];

  ngAfterViewInit(){

    for (let n = 0; n < this.N; n++){
      this.lab[n] = n;
    }

    this.sensorObject = this.sensors[this.sensorValue];
    this.sensorObjectVariables = Object.getOwnPropertyNames(this.sensorObject);

    this.sensor = this.sensorValue.replace('Value', '');
    this.sensorAddress = this.sensorValue.replace('Value', 'OSCAddress');
    this.internalAddress = this.sensors[this.sensorAddress];

    this.sensorObjectVariables.forEach((v) => {
      let data = [];
      for(let n = 0; n < this.N; n++){
        data[n] = this.sensorObject[v];
      }
      this.address.push(this.sensors[this.sensorAddress]+'/'+v)
      
      this.lineData.push({
        label: v,
        fill: false,
        borderColor: this.colors[this.i],
        data: data
      }) 
      this.i++;
    })
    this.plotting = new Chart(this.canvas.nativeElement, {
      // The type of chart we want to create
      type: 'line',
      // The data for our dataset
      data: {
        labels: this.lab,
        datasets: this.lineData,
      },
      options: {
        animation: {
          duration: 100
        },
        elements: {
          point:{
            radius: 0
          },
          line: {
            borderWidth:1
          }
        },
        scales: {
          xAxes: [{
            ticks: {
                display: false //this will remove only the label
            }
        }]
        }
      }
    })
    this.interval = setInterval(() => {
      this.lab.push( this.lab[ this.N - 1 ] + 1)
      this.lab.shift()
      this.plotting.data.datasets.forEach((dataset) => {
        dataset.data.shift();
        dataset.data.push(this.sensors[this.sensorValue][dataset.label]);
      });
      this.plotting.update();
    }, 100)
  }

  ngOnDestroy(){
    clearInterval(this.interval)
  }

  changeAddress(){
    this.data.setSensorAddress(this.sensor, this.internalAddress).then(() => {
      this.sensors.updateSensorAddress(this.sensorAddress, this.sensor).then(() => {
        this.address = [];
        this.sensorObjectVariables.forEach((v:string) => {
          this.address.push(this.sensors[this.sensorAddress]+'/'+v)
        })
      })
    })
  }
}

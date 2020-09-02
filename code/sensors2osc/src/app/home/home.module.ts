import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { RouterModule, Routes } from '@angular/router';
import { SensorSectionComponent } from '../sensor-section/sensor-section.component';
import { HostModalComponent } from '../host-modal/host-modal.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage, SensorSectionComponent, HostModalComponent],
  entryComponents: [HostModalComponent]
})
export class HomePageModule {}

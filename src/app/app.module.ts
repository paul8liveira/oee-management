import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { Routing } from './app.routes';

import { AuthGuard } from './guards/auth.guard';

import { LoginModule } from './components/login/login.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { MachineModule } from './components/machine/machine.module';
import { ChannelModule } from './components/channel/channel.module';
import { GraphPauseModule } from './components/graph.pause/graph.pause.module';
import { UserModule } from './components/user/user.module';
import { MachineProductionModule } from './components/machine.production/machine.production.module';
import {ToastModule} from 'ng2-toastr';

import { BaseComponent } from './components/base.component';
import { AppComponent } from './app.component';

import { AuthenticationService } from './services/authentication/authentication.service';
import { UserService } from './services/user/user.service';
import { SponsorModule } from './components/sponsor/sponsor.module';
import { AlertModule } from './components/alert/alert.module';
import { ProductModule } from './components/product/product.module';
import { GraphProductModule } from './components/graph.product/graph.product.module';
import { MachineWeekDayReportModule } from './components/machine-week-day-report/machine.week.day.report.module';
import { SectorWeekDayReportModule } from './components/sector-week-day-report/sector.week.day.report.module';

@NgModule({
  declarations: [
    BaseComponent,
    AppComponent,
  ],
  imports: [
    Routing,
    BrowserModule,
    BrowserAnimationsModule,
    LoginModule,
    DashboardModule,
    ChannelModule,
    MachineModule,
    GraphPauseModule,
    UserModule,
    MachineProductionModule,
    SponsorModule,
    AlertModule,
    ProductModule,
    GraphProductModule,
    MachineWeekDayReportModule,
    SectorWeekDayReportModule,
    ToastModule.forRoot()
  ],
  providers: [
    UserService,
    AuthGuard,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

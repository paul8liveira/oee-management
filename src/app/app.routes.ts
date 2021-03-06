import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AuthGuard } from "./guards/auth.guard";
import { MachineComponent } from "./components/machine/machine.component";
import { ChannelComponent } from "./components/channel/channel.component";
import { UserComponent } from "./components/user/user.component";
import { GraphPauseComponent } from "./components/graph.pause/graph.pause.component";
import { MachineProductionComponent } from "./components/machine.production/machine.production.component";
import { SponsorComponent } from "./components/sponsor/sponsor.component";
import { AlertComponent } from "./components/alert/alert.component";
import { ProductComponent } from "./components/product/product.component";
import { GraphProductComponent } from "./components/graph.product/graph.product.component";
import { MachineWeekDayReportComponent } from "./components/machine-week-day-report/machine.week.day.report.component";
import { SectorWeekDayReportComponent } from "./components/sector-week-day-report/sector.week.day.report.component";

const appRoutes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "dashboard",
    canActivate: [AuthGuard],
    component: DashboardComponent,
  },
  {
    path: "channel",
    canActivate: [AuthGuard],
    component: ChannelComponent,
  },
  {
    path: "machine",
    canActivate: [AuthGuard],
    component: MachineComponent,
  },
  {
    path: "graphpause",
    canActivate: [AuthGuard],
    component: GraphPauseComponent,
  },
  {
    path: "user",
    canActivate: [AuthGuard],
    component: UserComponent,
  },
  {
    path: "machineproduction",
    canActivate: [AuthGuard],
    component: MachineProductionComponent,
  },
  {
    path: "sponsor",
    canActivate: [AuthGuard],
    component: SponsorComponent,
  },
  {
    path: "alert",
    canActivate: [AuthGuard],
    component: AlertComponent,
  },
  {
    path: "product",
    canActivate: [AuthGuard],
    component: ProductComponent,
  },
  {
    path: "graphproduct",
    canActivate: [AuthGuard],
    component: GraphProductComponent,
  },
  {
    path: "machine-week-day-report",
    canActivate: [AuthGuard],
    component: MachineWeekDayReportComponent,
  },
  {
    path: "sector-week-day-report",
    canActivate: [AuthGuard],
    component: SectorWeekDayReportComponent,
  },
  {
    path: "**",
    redirectTo: "dashboard",
  },
];

export const Routing = RouterModule.forRoot(appRoutes);

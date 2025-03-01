import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StatBoxComponent } from './components/stat-box/stat-box.component';
import { HeaderComponent } from './components/header/header.component';
import { PiechartComponent } from './components/piechart/piechart.component';
import { BaseChartDirective } from 'ng2-charts';
import { Chart,PieController,ArcElement ,Tooltip, LineController} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { DetailsComponent } from './pages/details/details.component';
import { LinechartComponent } from './components/linechart/linechart.component';
Chart.register(ChartDataLabels,PieController,ArcElement,Tooltip);

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent,DashboardComponent,StatBoxComponent, HeaderComponent, PiechartComponent, DetailsComponent, LinechartComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,BaseChartDirective],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

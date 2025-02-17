import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string = '';
  salesData: any;
  categoryData: any;

  totalSales: number = 21324;
  totalIncome: number = 221324.50;
  totalSessions: number = 16703;
  conversionRate: number = 12.8;

  constructor(private authService: AuthService) {
    this.initChartData();
  }

  ngOnInit() {
    
    // this.authService.getCurrentUser().subscribe(user => {
    //   this.username = user.username;
    // });
  }

  private initChartData() {
    this.salesData = {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
      datasets: [
        {
          label: 'Laptops',
          data: [65, 85, 50, 45, 35],
          borderColor: '#000000',
          tension: 0.4
        },
        {
          label: 'Auriculares',
          data: [30, 45, 35, 55, 40],
          borderColor: '#666666',
          tension: 0.4
        },
        {
          label: 'Monitores',
          data: [45, 35, 60, 45, 50],
          borderColor: '#999999',
          tension: 0.4
        },
        {
          label: 'Teléfonos',
          data: [40, 55, 45, 65, 55],
          borderColor: '#cccccc',
          tension: 0.4
        }
      ]
    };

    this.categoryData = {
      labels: ['Electrónicos', 'Muebles', 'Juguetes'],
      datasets: [
        {
          data: [45, 35, 20],
          backgroundColor: ['#2d2d2d', '#666666', '#999999']
        }
      ]
    };
  }
}
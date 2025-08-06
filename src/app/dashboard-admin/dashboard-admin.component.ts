import { Component, OnInit } from '@angular/core';
import { Shop, User, UserService, Zone } from '../user.service';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  stats: any;
  zonePercentages: { [key: string]: number } = {};
  shopPercentages: { [key: string]: number } = {};
  shopPercentagesByZone: { [gov: string]: { [zoneId: number]: number } } = {};
  errorMessage: string = '';
  zonesWithoutChefCount: number = 0;

  // ✅ User Roles Pie Chart properties
  public userRolesLabels: string[] = ['Approved Users', 'Zone Chiefs', 'Admins', 'Shop Admins'];
  public userRolesData: number[] = [];
public userRolesChartType: 'pie' = 'pie';
  public userRolesChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'User Roles Distribution' }
    }
  };

  // ✅ Zone Percentages Bar Chart properties
  public zoneLabels: string[] = [];
  public zoneData: number[] = [];
  public zoneChartType: 'bar' = 'bar';
  public zoneChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Zones by Gouvernorat' }
    }
  };

  // ✅ Shop Percentages Bar Chart properties
  public shopLabels: string[] = [];
  public shopData: number[] = [];
  public shopChartType: 'bar' = 'bar';  
  public shopChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Shops by Gouvernorat' }
    }
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserStatistics();
    this.loadZonePercentages();
    this.loadShopPercentages();
    this.loadShopPercentagesByZone();
    this.loadZonesWithoutChefCount();
  }

  loadUserStatistics() {
    this.userService.getUserStatistics().subscribe({
      next: data => {
        this.stats = data;
        this.userRolesData = [
          data.approvedUsers,
          data.chefZoneCount,
          data.adminCount,
          data.adminShopCount
        ];
      },
      error: err => this.errorMessage = 'Error loading user statistics.'
    });
  }

  loadZonePercentages() {
    this.userService.getZonePercentageByGouvernorat().subscribe({
      next: data => {
        this.zonePercentages = data;
        this.zoneLabels = Object.keys(data);
        this.zoneData = Object.values(data);
      },
      error: err => this.errorMessage = 'Error loading zone percentages.'
    });
  }

  loadShopPercentages() {
    this.userService.getShopPercentageByGouvernorat().subscribe({
      next: data => {
        this.shopPercentages = data;
        this.shopLabels = Object.keys(data);
        this.shopData = Object.values(data);
      },
      error: err => this.errorMessage = 'Error loading shop percentages.'
    });
  }

  loadShopPercentagesByZone() {
    this.userService.getShopPercentageByZonePerGouvernorat().subscribe({
      next: data => this.shopPercentagesByZone = data,
      error: err => this.errorMessage = 'Error loading shop percentages by zone.'
    });
  }

  loadZonesWithoutChefCount() {
    this.userService.getZonesWithoutChefCount().subscribe({
      next: count => this.zonesWithoutChefCount = count,
      error: err => this.errorMessage = 'Error loading zones without chef count.'
    });
  }
  
}

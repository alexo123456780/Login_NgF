import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';

interface NavItem{
  icon: string;
  label: string;
  link: string;
  subItems?:NavItem[];

}



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  username: string = '';
  salesData: any;
  categoryData: any;

  activeLink: string = '#';

  totalSales: number = 21324;
  totalIncome: number = 221324.50;
  totalSessions: number = 16703;
  conversionRate: number = 12.8;


  // Método para manejar la activación de enlaces
  setActiveLink(link: string) {
    this.activeLink = link;
  }

  navItems: NavItem[] = 
  [
    {
      icon: 'pi pi-home',
      label: 'Inicio',
      link: '#',
      subItems: [
        { icon: 'pi pi-chart-line', label: 'Vista General', link: '#overview' },
        { icon: 'pi pi-chart-bar', label: 'Análisis', link: '#analytics' },
        { icon: 'pi pi-list', label: 'Reportes', link: '#reports' }
      ]
    },
    {
      icon: 'pi pi-flag',
      label: 'Proyectos',
      link: '#',
      subItems: [
        { icon: 'pi pi-folder', label: 'Todos los Proyectos', link: '#projects' },
        { icon: 'pi pi-plus', label: 'Nuevo Proyecto', link: '#new-project' }
      ]
    },
    {
      icon: 'pi pi-chart-pie',
      label: 'Estadísticas',
      link: '#',
      subItems: [
        { icon: 'pi pi-chart-bar', label: 'Ventas', link: '#sales' },
        { icon: 'pi pi-users', label: 'Usuarios', link: '#users-stats' }
      ]
    },
    {
      icon: 'pi pi-envelope',
      label: 'Mensajes',
      link: '#',
      subItems: [
        { icon: 'pi pi-inbox', label: 'Bandeja de entrada', link: '#inbox' },
        { icon: 'pi pi-send', label: 'Enviados', link: '#sent' }
      ]
    },
    {
      icon: 'pi pi-file',
      label: 'Documentos',
      link: '#',
      subItems: [
        { icon: 'pi pi-file-pdf', label: 'PDFs', link: '#pdfs' },
        { icon: 'pi pi-file-excel', label: 'Hojas de cálculo', link: '#spreadsheets' }
      ]
    },
    {
      icon: 'pi pi-calendar',
      label: 'Calendario',
      link: '#',
      subItems: [
        { icon: 'pi pi-calendar-plus', label: 'Nuevo Evento', link: '#new-event' },
        { icon: 'pi pi-calendar-times', label: 'Agenda', link: '#schedule' }
      ]
    },
    {
      icon: 'pi pi-users',
      label: 'Usuarios',
      link: '#',
      subItems: [
        { icon: 'pi pi-user-plus', label: 'Agregar Usuario', link: '#add-user' },
        { icon: 'pi pi-users', label: 'Gestionar Usuarios', link: '#manage-users' }
      ]
    },
    {
      icon: 'pi pi-cog',
      label: 'Configuración',
      link: '#',
      subItems: [
        { icon: 'pi pi-user', label: 'Perfil', link: '#profile' },
        { icon: 'pi pi-lock', label: 'Seguridad', link: '#security' },
        { icon: 'pi pi-bell', label: 'Notificaciones', link: '#notifications' }
      ]
    }


  ]







  constructor(private authService: AuthService, private cookieService: CookieService) { // Inyectar AuthService
    this.initChartData();
  }


  ngOnInit():void {

    
    this.username = this.cookieService.get('username');
  
  }

  // Método de cerrar sesión
  logout() {
    this.authService.logout(); // Llama al método de logout en AuthService
    this.username = ''; // Limpiar el nombre de usuario en el dashboard
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
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';

interface NavItem {
  icon: string;
  label: string;
  link: string;
  subItems?: NavItem[];
}

interface Activity {
  icon: string;
  title: string;
  description: string;
  time: string;
  type: 'sale' | 'user' | 'alert' | 'update';
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    standalone: false
})
export class DashboardComponent implements OnInit {
  username: string = '';
  salesData: any;
  categoryData: any;
  chartOptions: any;
  doughnutOptions: any;
  activeLink: string = '#';
  activeSubmenu: string | null = null;

  totalSales: number = 21324;
  totalIncome: number = 221324.50;
  totalSessions: number = 16703;
  conversionRate: number = 12.8;
  
  recentActivities: Activity[] = [
    {
      icon: 'pi pi-shopping-cart',
      title: 'Nueva venta completada',
      description: 'Cliente #2453 ha comprado Laptop XPS 15',
      time: 'Hace 5 minutos',
      type: 'sale'
    },
    {
      icon: 'pi pi-user-plus',
      title: 'Nuevo usuario registrado',
      description: 'María López se ha unido a la plataforma',
      time: 'Hace 42 minutos',
      type: 'user'
    },
    {
      icon: 'pi pi-exclamation-triangle',
      title: 'Alerta de inventario',
      description: 'El producto "Auriculares Pro" está por agotarse',
      time: 'Hace 1 hora',
      type: 'alert'
    },
    {
      icon: 'pi pi-refresh',
      title: 'Actualización del sistema',
      description: 'La versión 2.4.1 ha sido instalada correctamente',
      time: 'Hace 3 horas',
      type: 'update'
    }
  ];

  toggleSubmenu(link: string) {
    if (this.activeSubmenu === link) {
      this.activeSubmenu = null;
    } else {
      this.activeSubmenu = link;
    }
    this.activeLink = link;
  }

  navItems: NavItem[] = [
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
  ];

  constructor(private authService: AuthService, private cookieService: CookieService) {
    this.initChartData();
    this.setupChartOptions();
  }

  ngOnInit(): void {
    this.username = this.cookieService.get('username');
    this.animateNumbers();
  }

  logout() {
    this.authService.logout();
    this.username = '';
  }

  private animateNumbers() {
    // Esta función simularía la animación de los números
    // En una implementación real, usaríamos una biblioteca como CountUp.js
    console.log('Animando números...');
  }

  private setupChartOptions() {
    this.chartOptions = {
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          titleColor: '#333',
          bodyColor: '#666',
          borderColor: 'rgba(46, 125, 50, 0.2)',
          borderWidth: 1,
          padding: 12,
          boxPadding: 6,
          usePointStyle: true,
          callbacks: {
            labelPointStyle: function(context: any) {
              return {
                pointStyle: 'rectRounded',
                rotation: 0
              };
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          grid: {
            borderDash: [3, 3]
          }
        }
      },
      elements: {
        line: {
          tension: 0.4
        },
        point: {
          radius: 4,
          hitRadius: 10,
          hoverRadius: 6
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      }
    };

    this.doughnutOptions = {
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              size: 12
            }
          }
        }
      },
      cutout: '70%',
      animation: {
        animateScale: true,
        animateRotate: true,
        duration: 2000,
        easing: 'easeOutQuart'
      }
    };
  }

  private initChartData() {
    // Colores con gradientes para las líneas
    const ctx = document.createElement('canvas').getContext('2d');
    const gradientStroke1 = ctx?.createLinearGradient(0, 0, 0, 300);
    gradientStroke1?.addColorStop(0, 'rgba(46, 125, 50, 0.9)');
    gradientStroke1?.addColorStop(1, 'rgba(46, 125, 50, 0.2)');
    
    const gradientStroke2 = ctx?.createLinearGradient(0, 0, 0, 300);
    gradientStroke2?.addColorStop(0, 'rgba(33, 150, 243, 0.9)');
    gradientStroke2?.addColorStop(1, 'rgba(33, 150, 243, 0.2)');
    
    const gradientStroke3 = ctx?.createLinearGradient(0, 0, 0, 300);
    gradientStroke3?.addColorStop(0, 'rgba(156, 39, 176, 0.9)');
    gradientStroke3?.addColorStop(1, 'rgba(156, 39, 176, 0.2)');
    
    const gradientStroke4 = ctx?.createLinearGradient(0, 0, 0, 300);
    gradientStroke4?.addColorStop(0, 'rgba(255, 152, 0, 0.9)');
    gradientStroke4?.addColorStop(1, 'rgba(255, 152, 0, 0.2)');

    this.salesData = {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Laptops',
          data: [65, 85, 80, 81, 56, 75, 65],
          borderColor: '#2e7d32',
          backgroundColor: gradientStroke1 || 'rgba(46, 125, 50, 0.2)',
          borderWidth: 3,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: '#2e7d32',
          pointBorderWidth: 2,
          fill: true
        },
        {
          label: 'Auriculares',
          data: [30, 45, 35, 55, 40, 35, 30],
          borderColor: '#2196f3',
          backgroundColor: gradientStroke2 || 'rgba(33, 150, 243, 0.2)',
          borderWidth: 3,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: '#2196f3',
          pointBorderWidth: 2,
          fill: true
        },
        {
          label: 'Monitores',
          data: [45, 35, 60, 45, 50, 55, 45],
          borderColor: '#9c27b0',
          backgroundColor: gradientStroke3 || 'rgba(156, 39, 176, 0.2)',
          borderWidth: 3,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: '#9c27b0',
          pointBorderWidth: 2,
          fill: true
        },
        {
          label: 'Teléfonos',
          data: [40, 55, 45, 65, 55, 70, 60],
          borderColor: '#ff9800',
          backgroundColor: gradientStroke4 || 'rgba(255, 152, 0, 0.2)',
          borderWidth: 3,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: '#ff9800',
          pointBorderWidth: 2,
          fill: true
        }
      ]
    };

    this.categoryData = {
      labels: ['Electrónicos', 'Muebles', 'Juguetes', 'Ropa', 'Deportes'],
      datasets: [
        {
          data: [45, 25, 15, 10, 5],
          backgroundColor: [
            '#2e7d32',
            '#2196f3',
            '#9c27b0',
            '#ff9800',
            '#f44336'
          ],
          hoverBackgroundColor: [
            '#1b5e20',
            '#0d47a1',
            '#6a1b9a',
            '#e65100',
            '#b71c1c'
          ],
          borderWidth: 0
        }
      ]
    };
  }
}
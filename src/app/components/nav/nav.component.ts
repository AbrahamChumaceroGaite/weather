import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { filter, map } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MenuNavService } from 'src/app/services/tools/menu-json.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  navItems!: NbMenuItem[];
  navMenu: [] = [];
  userMenuItems: NbMenuItem[] = [
    { title: 'Modo Nocturno' },
    { title: 'Salir' }
  ];
  isCollapsed = false;
  isPhone!: boolean;
  router: any;
  constructor(private themeService: NbThemeService,
    private menunavService: MenuNavService, 
    private nbmenuService: NbMenuService,
    private sidebarService: NbSidebarService,
    private authService: AuthService) {}

  ngOnInit(): void {    
    this.menunavService.get().subscribe((data: any) => {
      this.navItems = data.nav;
      this.navMenu = data.option;
    });
    this.nbmenuService.onItemClick().pipe(filter(({ tag }) => tag === 'my-context-menu'),
    map(({ item: { title } }) => title)).subscribe(title => {
      switch(title){
        case 'Modo Oscuro':

          this.switchTheme();
          break;
        case 'Cerrar Sesión':
          this.logout();
          break;
      }
    });
    this.checkViewport();
    window.addEventListener('resize', this.checkViewport);
  }

  toggleSidebar(): void {
    this.sidebarService.toggle(true, 'sidebar');
  }
  onSidebarCollapse(collapsed: boolean): void {
    this.isCollapsed = collapsed;
  }
  switchTheme() {
    this.themeService.changeTheme(this.themeService.currentTheme === 'dark' ? 'default' : 'dark');
  }

  getUserName(): string {
    return this.authService.getUserName();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
  checkViewport = () => {
    this.isPhone = window.innerWidth <= 767;
    if (this.isPhone) {
      this.sidebarService.collapse('sidebar');
    } else {
      this.sidebarService.expand('sidebar');
    }
  };

  ngOnDestroy() {
    window.removeEventListener('resize', this.checkViewport);
  }
  
}

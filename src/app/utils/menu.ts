import { ConstAdminID, ConstCertID, ConstEventID, ConstGroupID, ConstHomeID, ConstOcupptID, ConstSignID, ConstSponID, ConstStructID, ConstTemplaID, ConstUserID } from "./components-id";
export const MENU_ITEMS: any[] = [
  {
    title: 'Certificados',
    icon: 'checkmark-circle',
    children: [
      {
        title: 'Asignar Certificado',
        icon: 'book-open',
        link: '/certificate/templates',
        id: ConstCertID.idMain,
      },
      {
        title: 'Administrar Certificados',
        icon: 'home',
        link: '/admin/certificate',
        id: ConstCertID.idadmin,
      },
    ],
  },
  {
    title: 'Eventos',
    icon: 'calendar-outline',
    link: '/admin/events',
    id: ConstEventID.idMain,
  },
  {
    title: 'Grupos',
    icon: 'grid-outline',
    link: '/admin/group',
    id: ConstGroupID.idMain,
  },
  {
    title: 'Gestor de Cargos',
    icon: 'attach',
    link: '/occupation/list/create',
    id: ConstOcupptID.idMain,
  },
  {
    title: 'Gestor de Firmas',
    icon: 'edit',
    link: '/signature/list/create',
    id: ConstSignID.idMain,
  },
  {
    title: 'Gestor de Instituciones',
    icon: 'pantone',
    link: '/sponsor/list/create',
    id: ConstSponID.idMain,
  },
  {
    title: 'Plantillas',
    icon: 'paper-plane',
    link: '/template/list',
    id: ConstTemplaID.idMain,
  },
  {
    title: 'Usuarios',
    icon: 'person-done',
    children: [
      {
        title: 'Personas',
        icon: 'person',
        link: '/person/list',
        id: ConstUserID.idMainP,
      },
      {
        title: 'Usuarios',
        icon: 'people',
        link: '/user/list',
        id: ConstUserID.idMainU,
      }
    ],
  },
  {
    title: 'Control',
    icon: 'shield',
    link: '/user/admin/account/access-control',
    id: ConstAdminID.idMainUR,
  },
  {
    title: 'Estructura',
    icon: 'layers',
    link: '/controller/panel/components/list',
    id: ConstStructID.idMainC
  },{
    title: 'Inicio',
    icon: 'home',
    link: 'home',
    id: ConstHomeID.idMain
  },
];

export const OPTION_ITEMS: any[] = [
  {
    title: 'Cerrar Sesión',
    icon: 'log-out',
  },

];


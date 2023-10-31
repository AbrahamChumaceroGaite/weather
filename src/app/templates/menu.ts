import { ConstAdminID, ConstCertID, ConstEventID, ConstGroupID, ConstHomeID, ConstOcupptID, ConstSignID, ConstSponID, ConstStructID, ConstTemplaID, ConstUserID } from "./components-id";
export const MENU_ITEMS: any[] = [
  {
    "title": "Tablero Administrativo",
    "icon": "book-outline",
    "link": "home/admin/device"
  },
  {
    "title": "Estaciones",
    "icon": "pantone",
    "children": [
      {
        "title": "Estaciones",
        "icon": "smartphone-outline",
        "link": "view/device/tabs"
      }
    ]
  },
  {
    "title": "Usuarios",
    "icon": "people-outline",
    "children": [
      {
        "title": "Clientes",
        "icon": "person-outline",
        "link": "view/client/tabs"
      },
      {
        "title": "Operadores",
        "icon": "shield-outline",
        "link": "view/user"
      }
    ]
  },
  {
    "title": "Municipio",
    "icon": "globe-2-outline",
    "link": "view/demography"
  },
  {
    "title": "Organizacion Territorial",
    "icon": "map-outline",
    "children": [
      {
        "title": "Municipio",
        "icon": "globe-2-outline",
        "link": "view/municipality"
      },
      {
        "title": "Comunidad",
        "icon": "npm-outline",
        "link": "view/community"
      },
      {
        "title": "Locacion",
        "icon": "flag-outline",
        "link": "view/location"
      }
    ]
  }
];

export const OPTION_ITEMS: any[] = [
  {
    "title": "Cerrar Sesión",
    "icon": "log-out",
    "link": "home"
  }

];


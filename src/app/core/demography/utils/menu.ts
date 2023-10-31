

export const menu = [
    {
        label: 'Provincia',
        items: [
            {
                label: 'Nuevo',
                icon: 'pi pi-fw pi-plus',
                command: () => 'PNew'
            },
            {
                label: 'Registros',
                icon: 'pi pi-fw pi-align-justify',
                command: () => 'PList'
            },
        ]
    },
    {
        label: 'Municipio',
        items: [
            {
                label: 'Nuevo',
                icon: 'pi pi-fw pi-plus',
                command: () => 'MNew'
            },
            {
                label: 'Registros',
                icon: 'pi pi-fw pi-align-justify',
                command: () => 'MList'
            },
        ]
    },
    {
        label: 'Comunidad',
        items: [
            {
                label: 'Nuevo',
                icon: 'pi pi-fw pi-plus',
                command: () => 'CNew'
            },
            {
                label: 'Registros',
                icon: 'pi pi-fw pi-align-justify',
                command: () => 'CList'
            },
        ]
    },
    {
        label: 'Locacion',
        items: [
            {
                label: 'Nuevo',
                icon: 'pi pi-fw pi-plus',
                command: () => 'LNew'
            },
            {
                label: 'Registros',
                icon: 'pi pi-fw pi-align-justify',
                command: () => 'LList'
            },
        ]
    }
];


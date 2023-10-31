import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { ViewCommunityComponent } from '../components/community/view-community/view-community.component';
import { ViewMunicipalityComponent } from '../components/municipality/view-municipality/view-municipality.component';
import { ViewLocationComponent } from '../components/location/view-location/view-location.component';
import { ViewProvinceComponent } from '../components/province/view-province/view-province.component';
import { CreateEditProvinceComponent } from '../components/province/create-edit-province/create-edit-province.component';
import { CreateEditLocationComponent } from './../components/location/create-edit-location/create-edit-location.component';
import { CreateEditMunicipalityComponent } from './../components/municipality/create-edit-municipality/create-edit-municipality.component';
import { CreateEditCommunityComponent } from './../components/community/create-edit-community/create-edit-community.component';

// Province
export function createProvince(NbDialogService: NbDialogService): Promise<NbDialogRef<CreateEditProvinceComponent>> {
    const ref = NbDialogService.open(CreateEditProvinceComponent);
    return new Promise((resolve, reject) => {
        ref.onClose.subscribe(res => {
            resolve(ref);
        });
    });
}

export function showProvince(dialogService: DialogService): Promise<DynamicDialogRef> {
    return new Promise((resolve, reject) => {
        const ref = dialogService.open(ViewProvinceComponent, {
            header: 'Listar Provincias',
            styleClass: 'demography-modal',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 100,
        });

        ref.onClose.subscribe(() => {
            resolve(ref);
        });
    });
}

// Municipality
export function createMunicipality(NbDialogService: NbDialogService): Promise<NbDialogRef<CreateEditMunicipalityComponent>> {
    const ref = NbDialogService.open(CreateEditMunicipalityComponent);
    return new Promise((resolve, reject) => {
        ref.onClose.subscribe(res => {
            resolve(ref);
        });
    });
}

export function showMunicipality(dialogService: DialogService): Promise<DynamicDialogRef> {
    return new Promise((resolve, reject) => {
        const ref = dialogService.open(ViewMunicipalityComponent, {
            header: 'Listar Municipios',
            styleClass: 'demography-modal',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 100,
        });

        ref.onClose.subscribe(() => {
            resolve(ref);
        });
    });
}

// Community
export function createCommunity(NbDialogService: NbDialogService): Promise<NbDialogRef<CreateEditCommunityComponent>> {
    const ref = NbDialogService.open(CreateEditCommunityComponent);
    return new Promise((resolve, reject) => {
        ref.onClose.subscribe(res => {
            resolve(ref);
        });
    });
}

export function showCommunity(dialogService: DialogService): Promise<DynamicDialogRef> {
    return new Promise((resolve, reject) => {
        const ref = dialogService.open(ViewCommunityComponent, {
            header: 'Listar Comunidades',
            styleClass: 'demography-modal',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 100,
        });

        ref.onClose.subscribe(() => {
            resolve(ref);
        });
    });
}

// Location
export function createLocation(NbDialogService: NbDialogService): Promise<NbDialogRef<CreateEditLocationComponent>> {
    const ref = NbDialogService.open(CreateEditLocationComponent);
    return new Promise((resolve, reject) => {
        ref.onClose.subscribe(res => {
            resolve(ref);
        });
    });
}

export function showLocation(dialogService: DialogService): Promise<DynamicDialogRef> {
    return new Promise((resolve, reject) => {
        const ref = dialogService.open(ViewLocationComponent, {
            header: 'Listar Locaciones',
            styleClass: 'demography-modal',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 100,
        });

        ref.onClose.subscribe(() => {
            resolve(ref);
        });
    });
}
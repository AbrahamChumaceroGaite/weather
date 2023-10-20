export interface Device {
    Id: number; 
    device_id: string;
    client: string;
    temp: number;
    hum: number;
    pres: number;
    uv: number;
    altitude: number;
    rain: number;
    windf: number;
    winds: number;
    batt_level: number;
    lat: number;
    lon: number;
    number: number;
    createdAt: string;
};

export interface DeviceID {
    id: number;
    name: string;
    idlocation: number;
    status: number;
    createdAt: string;
}

export interface DeviceClient {
    idclient: number;
    idevice: number;
    cretedAt: Date;
}

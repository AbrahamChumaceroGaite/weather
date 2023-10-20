import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ChartCleanService {

  constructor(private httpClient: HttpClient) { }

  
  // Obtener el título personalizado para una columna específica
  getColumnTitle(column: string): string {
    switch (column) {
      case 'Id':
        return 'ID';
      case 'altitude':
        return 'Altitud';
      case 'batt_level':
        return 'Nivel de Batería';
      case 'client':
        return 'Cliente';
      case 'createdAt':
        return 'Fecha de Creación';
      case 'device_id':
        return 'ID del Dispositivo';
      case 'deviceid':
        return 'ID del Dispositivo';
      case 'hum':
        return 'Humedad';
      case 'lat':
        return 'Latitud';
      case 'lon':
        return 'Longitud';
      case 'number':
        return 'Número';
      case 'pres':
        return 'Presión';
      case 'rain':
        return 'Lluvia';
      case 'temp':
        return 'Temperatura';
      case 'uv':
        return 'Radiación UV';
      case 'windf':
        return 'Fuerza del Viento';
      case 'winds':
        return 'Velocidad del Viento';
      default:
        return column;
    }
  }
}

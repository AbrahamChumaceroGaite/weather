import { Device } from "src/app/models/device";

export function setCarouselData(data: any): any[] {  
  return [
    { title: 'Temperatura', values: data[0].temp + 'º', img: 'assets/thumbails/temperature.png' },
    { title: 'Humedad', values: data[0].hum + '%', img: 'assets/thumbails/humidity.png' },
    { title: 'Presión', values: data[0].pres, img: 'assets/thumbails/pressure.png' },
    { title: 'UV', values: data[0].uv, img: 'assets/thumbails/uv.png' },
    { title: 'Altitud', values: data[0].altitude, img: 'assets/thumbails/altitude.png' },
    { title: 'Lluvia', values: data[0].rain, img: 'assets/thumbails/rain.png' },
    { title: 'Viento (fuerza)', values: data[0].windf, img: 'assets/thumbails/windf.png' },
    { title: 'Viento (dirección)', values: data[0].winds, img: 'assets/thumbails/winds.png' },
  ];
}

export function calculateLastWeekStartDate() {
  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 30); // Resta una semana
  return lastWeek;
}

export function getTemperatureIcon(temp: number): string {
  if (temp > 20) {
    return 'thermometer-plus-outline';
  } else if (temp > 15) {
    return 'thermometer-minus-outline';
  } else {
    return 'thermometer-outline';
  }
}

export function getBackgroundImage(temp: number): string {
  if (temp > 20) {
    return 'url(/assets/thumbails/sun.jpeg)';
  } else if (temp > 15) {
    return 'url(/assets/thumbails/normal.jpeg)';
  } else {
    return 'url(/assets/thumbails/cold.jpeg)';
  }
}
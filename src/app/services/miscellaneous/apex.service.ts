import { Injectable } from '@angular/core';
import { ApexOptions } from 'ng-apexcharts';

@Injectable({
  providedIn: 'root',
})
export class ApexService {
  constructor() { }

  public generateLineChart(series: number[], categories: string[]): ApexOptions {
    const options: ApexOptions = {
      chart: {
        type: 'line',
        brush: {
          enabled: true,
        },

      },
      series: [
        {
          data: series, // Agrega la propiedad 'data' al objeto de la serie
        },
      ],
      xaxis: {
        labels: {
          formatter: function (value: string) {
            const dateParts = value.split('/');
            const day = dateParts[0];
            const month = dateParts[1];
            const year = dateParts[2];
            return `${day}/${month}/${year}`;
          },
        },
        categories: categories,

      },
    };
    return options;
  }

  public generateHystoricLineChart(name: string, series: any[], categories: string[]): ApexOptions {
    const options: ApexOptions = {
      series: [
        {
          name: name,
          data: series,
        },
      ],
      chart: {
        type: "area",
        height: 250,
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100]
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
      },
      title: {
        text: "Historico",
        align: "left"
      },
      xaxis: {
        type: 'datetime',
        categories: categories,
        labels: {
          datetimeUTC: false,
          datetimeFormatter: {
            year: 'yyyy',
            month: 'MMM',
            day: 'dd'
          },
        },
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy HH:mm"
        }
      },
      stroke: {
        curve: "smooth"
      }
    };
    return options;
  }

  public generateBarsChart(
    series: any[],
    series2: any[],
    categories: string[]
  ): ApexOptions {
    const options: ApexOptions = {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + '';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758'],
        },
      },
      xaxis: {
        type: 'datetime',
        tickAmount: 6,
        categories: categories.map(date => new Date(date).toLocaleString()), // Ajusta a la zona horaria local
        labels: {
          datetimeFormatter: {
            year: 'yyyy',
            month: 'MMM',
            day: 'dd'
          },
        },
      },
      yaxis: {
        title: {
          text: 'Cantidad',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return 'Cantidad ' + val;
          },
        },
      },
      series: [
        {
          name: 'Cantidad Establecidad',
          data: series,
        },
        {
          name: 'Cantidad Actual',
          data: series2,
        },
      ],
    };
    return options;
  }

  public generateDonutChart(data: any[]): ApexOptions {
    const options: ApexOptions = {
      chart: {
        width: 380,
        type: "pie"
      },
      series: data.map((item: any) => item.value),
      labels: data.map((item: any) => item.name)
    };
    return options;
  }

  public generateBarChartVertical(
    series: any[],
    categories: string[]
  ): ApexOptions {
    const options: ApexOptions = {
      chart: {
        type: 'bar',
        height: 320,
      },
      series: [
        {
          name: 'Cantidad',
          data: series,
        },
      ],
      xaxis: {
        categories: categories,
        position: "buttom",
        labels: {
          offsetY: 0
        },
      },
      fill: {
        colors: ['#F44336']
      },
      responsive: [
        {
          breakpoint: 1000,
          options: {
            plotOptions: {
              bar: {
                horizontal: true
              }
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]

    };
    return options;
  }

  public generateCircularChartVertical(
    series: any[],
    categories: string[]
  ): ApexOptions {
    const options: ApexOptions = {
      series: series,
      chart: {
        height: 350,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "70%"
          }
        }
      },
      labels: []
    };
    return options;
  }

  public generateBarChartHorizontal(
    series: any[],
    categories: string[]
  ): ApexOptions {
    const options: ApexOptions = {
      chart: {
        type: 'bar',
        height: 350,
      },
      series: [
        {
          name: 'Cantidad',
          data: series,
        },
      ],
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        tickPlacement: 'on',
        categories: categories,
      },
    };
    return options;
  }

  public generatePieChart(series: any[], categories: string[]): ApexOptions {
    const options: ApexOptions = {
      chart: {
        type: 'pie',
      },
      series: series,
      labels: categories,
    };
    return options;
  }

  public generatePie2Chart(
    series: number[],
    categories: string[]
  ): ApexOptions {
    const options: ApexOptions = {
      series: series,
      chart: {
        type: 'polarArea',
      },
      stroke: {
        colors: ['#fff'],
      },
      labels: categories,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
    return options;
  }
}

import { Component, OnInit, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-learn-vs-no-savings',
  templateUrl: './learn-vs-no-savings.component.html',
  styleUrls: ['./learn-vs-no-savings.component.css']
})
export class LearnVsNoSavingsComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart(): void {
    const canvas: any = document.getElementById('chartCanvas');
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['12', '24', '36'],
        datasets: [
          {
            label: '         No savings account',
            data: [4300.0, 7900.0, 11500.0],
            backgroundColor: '#000000'
          },
          {
            label: 'Tax-free Savings account',
            data: [4493.08, 8600.98, 13049.83],
            backgroundColor: '#870A3C'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Months',
              font: {
                size: 16,
                weight: 'lighter'
              }
            },
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 14
              }
            }
          },
          y: {
            title: {
              display: true,
              text: 'Price(R)',
              font: {
                size: 16,
                weight: 'lighter'
              }
            },
            ticks: {
              font: {
                size: 14
              }
            }
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: {
                size: 14
              }
            }
          }
        },
        datasets: {
          bar: {
            barThickness: 15,
            backgroundColor: ['#000000', '#870A3C'],
            barPercentage: 1.0,
            categoryPercentage: 0.8
          }
        }
      }
    });
  }
}

import { Component, OnInit, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-learn-best-suited',
  templateUrl: './learn-best-suited.component.html',
  styleUrls: ['./learn-best-suited.component.css']
})
export class LearnBestSuitedComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart(): void {
    const canvas: any = document.getElementById('chartCanvas2');
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Tax', 'Tax-free'],
        datasets: [
          {
            label: 'Interest earned (R)',
            data: [600, 700],
            backgroundColor: ['#000000', '#870A3C'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Tax Category',
              font: {
                size: 16,
                weight: 'lighter',
              },
            },
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 14,
              },
            },
          },
          y: {
            title: {
              display: true,
              text: 'Interest earned (R)',
              font: {
                size: 16,
                weight: 'lighter',
              },
            },
            ticks: {
              font: {
                size: 14,
              },
            },
          },
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: {
                size: 14,
              },
            },
          },
        },
        datasets: {
          bar: {
            barThickness: 40, // Increase the bar thickness
            barPercentage: 0.8, // Reduce the space between bars
          },
        },
      },
    });
  }
}
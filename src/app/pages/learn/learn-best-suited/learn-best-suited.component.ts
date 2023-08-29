import { Component, OnInit, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
    selector: 'app-learn-best-suited',
    templateUrl: './learn-best-suited.component.html',
    styleUrls: ['./learn-best-suited.component.css'],
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

        const data = [600, 700]; // Sample data

        // Create the ticks object for the y-axis
        const yAxesTicks = {
            font: {
                size: 12, // Reduce the font size of the y-axis labels
            },
            stepSize: 200, // Decrease the spacing between labels on the y-axis
            min: 0, // Set the minimum value for the y-axis
            max: 700, // Set a smaller max value for the y-axis to decrease max height
        };

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Taxed', 'Tax-Free'], // Updated labels
                datasets: [
                    {
                        label: 'Interest earned (R)',
                        data: data,
                        backgroundColor: ['#000000', '#870A3C'],
                        barThickness: 25, // Keep the bar thickness constant to maintain bar size
                        barPercentage: 0.7, // Reduce the space between the bars
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
                            text: 'Account type',
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
                        ticks: yAxesTicks, // Assign the ticks object to the y-axis
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        });
    }
}

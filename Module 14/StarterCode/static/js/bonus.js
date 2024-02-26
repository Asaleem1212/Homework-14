// Function to build the gauge chart
function buildGaugeChart(wfreq) {
    // Angle for each segment in the gauge
    var angle = (180 / 9) * wfreq;
    var degrees = 180 - angle;
    var radius = 0.5;
    var radians = (degrees * Math.PI) / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path for the needle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ';
    var pathX = String(x);
    var space = ' ';
    var pathY = String(y);
    var pathEnd = ' Z';
    var path = mainPath.concat(pathX, space, pathY, pathEnd);

    var data = [
        {
            type: 'scatter',
            x: [0], y:[0],
            marker: {size: 28, color:'850000'},
            showlegend: false,
            name: 'Freq',
            text: wfreq,
            hoverinfo: 'text+name'
        },
        {
            type: 'pie',
            showlegend: false,
            hole: 0.4,
            rotation: 90,
            values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
            text: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9'],
            direction: 'clockwise',
            textinfo: 'text',
            textposition: 'inside',
            marker: {
                colors: [
                    'rgba(255, 255, 255, 0)',
                    'rgba(232, 226, 202, .5)', 'rgba(210, 206, 145, .5)',
                    'rgba(202, 209, 95, .5)', 'rgba(170, 202, 42, .5)',
                    'rgba(110, 154, 22, .5)', 'rgba(14, 127, 0, .5)',
                    'rgba(10, 120, 22, .5)', 'rgba(0, 105, 11, .5)',
                    'rgba(0, 0, 0, 0)'
                ],
                labels: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9'],
                hoverinfo: 'label'
            }
        }
    ];

    var layout = {
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
                color: '850000'
            }
        }],
        title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
        height: 500,
        width: 500,
        xaxis: {zeroline:false, showticklabels:false,
                 showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
                 showgrid: false, range: [-1, 1]}
    };

    Plotly.newPlot('gauge', data, layout);
}

// Call this function when a new sample is selected
function updateGaugeChart(newSample) {

    var wfreq = dataSet.metadata.filter(obj => obj.id == newSample)[0].wfreq;
    buildGaugeChart(wfreq);
}

console.log('bonus.js is loaded, and updateGaugeChart is', typeof updateGaugeChart);

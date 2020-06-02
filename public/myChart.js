var data1 = [];
var newDataFromSensor = [];
var lastDate = "";
var lastTemperature = "";

var socket = io();
    socket.on('temperature-data', (content) => {
    newDataFromSensor.push(content);
    lastTemperature = newDataFromSensor.slice(-1)[0].dataset
    lastDate = newDataFromSensor.slice(-1)[0].time
})

function getNewSeries(date, yAxis) {
    var newSerie = [date, yAxis]
    data1.push(newSerie);
    console.log(data1)
}

var options = {
        series: [{
        name: "Temperature",
        data: data1.slice()
    }],
        chart: {
        id: 'realtime',
        height: 350,
        type: 'line',
        animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
            enabled: true,
            delay: 150
        },
        dynamicAnimation: {
            enabled: true,
            speed: 350
        }
        },
        toolbar: {
        show: false
        },
        zoom: {
        enabled: false
        },
    },
    colors: ['#ff0340'],
    dataLabels: {
        enabled: true,
        style: {
        fontSize: '12px',
        fontWeight: 'bold'
        },
        background: {
        enabled: true,
        foreColor: '#fff',
        padding: 4,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff',
        opacity: 0.9,
        },
    },
    grid: {
        padding: {
        left: 15,
        right: 15
        }
    },
    stroke: {
        curve: 'smooth'
    },
    title: {
        text: 'Dynamic Updating Chart',
        align: 'left'
    },
    markers: {
        size: 4
    },
    xaxis: {
        type: 'datetime',
        categories: [],
        //range: 30,
        labels: {
        formatter: function (value) {
            return new Date(value * 1000).toLocaleTimeString();
        }
        }
    },
    yaxis: {
        labels: {
        offsetX: -10,
        }
    },
    title: {
        text: 'Celsius',
        align: 'left',
        style: {
        fontSize: '12px'
        }
    },
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

window.setInterval(function () {
getNewSeries(lastDate, lastTemperature)

chart.updateSeries([{
    data: data1
}])
}, 5000)
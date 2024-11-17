// DASHBOARD JAVASCRIPT

document.addEventListener("DOMContentLoaded", function () {
  const infoData = document.querySelector(".info-data");
  const cards = document.querySelectorAll(".info-data .card");
  const prevButton = document.querySelector(".slider-nav .prev");
  const nextButton = document.querySelector(".slider-nav .next");

  let currentIndex = 0;
  const cardWidth = cards[0].offsetWidth + 20; // card width plus gap

  function updateSlider() {
    infoData.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  nextButton.addEventListener("click", () => {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      updateSlider();
    }
  });

  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });
});



// PROGRESSBAR
const allProgress = document.querySelectorAll('main .card .progress');

allProgress.forEach(item=> {
	item.style.setProperty('--value', item.dataset.value)
})






// APEXCHART
var options = {
  series: [{
  name: 'series1',
  data: [31, 40, 28, 51, 42, 109, 100]
}, {
  name: 'series2',
  data: [11, 32, 45, 32, 34, 52, 41]
}],
  chart: {
  height: 350,
  type: 'area'
},
dataLabels: {
  enabled: false
},
stroke: {
  curve: 'smooth'
},
xaxis: {
  type: 'datetime',
  categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
},
tooltip: {
  x: {
    format: 'dd/MM/yy HH:mm'
  },
},
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();
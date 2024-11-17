document.addEventListener('DOMContentLoaded', function () {
    flatpickr("#month", {
      plugins: [
        new monthSelectPlugin({
          shorthand: true,
          dateFormat: "Y-m",
          altFormat: "F Y"
        })
      ]
    });
  });
  
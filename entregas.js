function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 12,
    });
}

document.getElementById('deliveryForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const toast = new bootstrap.Toast(document.createElement('div'));
    toast.show();
    alert('¡Pedido recibido! Te contactaremos pronto.');
});

// Inicializa el carrusel manualmente
function initCarousel() {
    const carouselElement = document.querySelector('#carouselExample');
    const carousel = new bootstrap.Carousel(carouselElement, {
        interval: 1000, // Cambia cada segundo
        ride: 'carousel', // Activa el auto-play
        wrap: true, // Repite el ciclo automáticamente
    });

    console.log("Carrusel inicializado con auto-play."); // Depuración
}

window.onload = function () {
    initMap();
    initCarousel();
};

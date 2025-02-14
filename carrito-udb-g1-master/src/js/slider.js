// Creamos una funcion general que se encargara de deslizar automaticamente el slider
const AutoPlaySlider = () => {
    // aqui ejecutamos una funcion al momento que se cargue la pagina
    document.addEventListener('DOMContentLoaded', function() {
        const slider_container = document.querySelector('.slider');
        const slides = document.querySelectorAll('.slider img');
        let currentIndex = 0;

        function nextSlide() {
            // Logica para que al momento de llegar a la ultima imagen, regresa a la primera
            currentIndex = (currentIndex + 1) % slides.length;
            const slideWidth = slides[0].clientWidth;

            slider_container.scrollTo({ // Aqui realizamos el proceso de cambio entre cada imagen
                left: slideWidth * currentIndex,
                behavior: "smooth"
            });
        }

        setInterval(nextSlide, 3500); // la imagen se pasa cada 3.5 segundos
    })
}

AutoPlaySlider();
// Función para obtener un número aleatorio entre min y max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para mezclar un array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Función para cargar las imágenes
async function cargarImagenes() {
    try {
        const response = await fetch('img/');
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const imagenes = Array.from(doc.querySelectorAll('a'))
            .filter(a => a.href.match(/\.(jpg|jpeg|png|gif)$/i))
            .map(a => a.href.split('/').pop());

        // Mezclar el array de imágenes
        const imagenesAleatorias = shuffleArray(imagenes);

        // Obtener el contenedor de la galería
        const contenedorGaleria = document.getElementById('galeria-container');

        // Crear y agregar las imágenes al contenedor
        imagenesAleatorias.forEach(imagen => {
            const img = document.createElement('img');
            img.src = `img/${imagen}`;
            img.alt = imagen;
            img.className = 'img-galeria';
            
            // Agregar evento click para mostrar la imagen en grande
            img.addEventListener('click', () => {
                const imgLight = document.querySelector('.img-light');
                const agregarImagen = document.querySelector('.agregar-imagen');
                agregarImagen.src = img.src;
                imgLight.classList.add('show');
            });

            contenedorGaleria.appendChild(img);
        });
    } catch (error) {
        console.error('Error al cargar las imágenes:', error);
    }
}

// Cerrar la imagen en grande
const close = document.querySelector('.close');
const imgLight = document.querySelector('.img-light');

close.addEventListener('click', () => {
    imgLight.classList.remove('show');
});

// Cargar las imágenes cuando el documento esté listo
document.addEventListener('DOMContentLoaded', cargarImagenes);

// Cargar Las imágenes cuando el documento esté listo
// hay que cargar las imagenes desde una carpeta y que se muestren aleaotorimanete
// y que al clickar en una imagen se muestre en grande.

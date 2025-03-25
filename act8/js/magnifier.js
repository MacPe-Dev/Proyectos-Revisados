class ImageMagnifier {
    constructor() {
        this.zoom = 5;
        this.initialize();
    }

    initialize() {
        // Crear el elemento de lupa
        this.magnifier = document.createElement('div');
        this.magnifier.className = 'magnifier';
        document.body.appendChild(this.magnifier);

        // Inicializar eventos para todas las imágenes en la galería
        const images = document.querySelectorAll('.gallery-item img');
        images.forEach(img => {
            img.addEventListener('click', () => this.openModal(img.src));
        });

        // Inicializar el modal
        this.initializeModal();
    }

    moveMagnifier(e, img) {
        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Actualizar posición de la lupa
        this.magnifier.style.left = `${e.pageX - 30}px`;
        this.magnifier.style.top = `${e.pageY - 30}px`;

        // Calcular posición relativa para la imagen ampliada
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        this.magnifier.style.backgroundImage = `url('${img.src}')`;
        this.magnifier.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
    }

    initializeModal() {
        // Crear el modal
        this.modal = document.createElement('div');
        this.modal.className = 'image-modal';
        this.modal.innerHTML = `
            <span class="close-modal">&times;</span>
            <div class="modal-image-container">
                <img class="modal-content">
            </div>
            <div class="modal-nav">
                <button class="nav-btn prev">&lt;</button>
                <button class="nav-btn next">&gt;</button>
            </div>
        `;
        document.body.appendChild(this.modal);

        // Eventos del modal
        this.modal.querySelector('.close-modal').onclick = () => this.closeModal();
        this.modal.querySelector('.prev').onclick = () => this.navigateImages(-1);
        this.modal.querySelector('.next').onclick = () => this.navigateImages(1);

        // Configurar eventos de lupa en el modal
        const modalImg = this.modal.querySelector('.modal-content');
        modalImg.addEventListener('mousemove', (e) => this.moveMagnifier(e, modalImg));
        modalImg.addEventListener('mouseenter', () => this.magnifier.style.display = 'block');
        modalImg.addEventListener('mouseleave', () => this.magnifier.style.display = 'none');

        // Cerrar modal con Escape y navegación con flechas
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
            if (e.key === 'ArrowLeft') this.navigateImages(-1);
            if (e.key === 'ArrowRight') this.navigateImages(1);
        });
    }

    openModal(imgSrc) {
        this.modal.style.display = 'flex';
        const modalImg = this.modal.querySelector('.modal-content');
        modalImg.src = imgSrc;
        
        // Guardar todas las imágenes y el índice actual
        this.allImages = Array.from(document.querySelectorAll('.gallery-item img')).map(img => img.src);
        this.currentImageIndex = this.allImages.indexOf(imgSrc);
    }

    closeModal() {
        this.modal.style.display = 'none';
        this.magnifier.style.display = 'none';
    }

    navigateImages(direction) {
        this.currentImageIndex = (this.currentImageIndex + direction + this.allImages.length) % this.allImages.length;
        const modalImg = this.modal.querySelector('.modal-content');
        modalImg.src = this.allImages[this.currentImageIndex];
    }
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    new ImageMagnifier();
}); 
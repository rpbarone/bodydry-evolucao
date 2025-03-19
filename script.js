document.addEventListener('DOMContentLoaded', () => {
    const slidesContainer = document.querySelector('.slides-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    
    let currentSlideIndex = 0;
    let slides;
    
    // Função para inicializar os slides
    function initSlides() {
        slides = document.querySelectorAll('.slide');
        
        if (slides.length > 0) {
            // Ativar o primeiro slide
            slides[0].classList.add('active');
            updateProgress();
        }
    }
    
    // Função para ir para um slide específico
    function goToSlide(index) {
        // Verificar se o índice é válido
        if (index < 0) {
            index = 0;
        } else if (index >= slides.length) {
            index = slides.length - 1;
        }
        
        // Remover a classe 'active' de todos os slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Adicionar a classe 'active' ao slide atual
        slides[index].classList.add('active');
        
        // Atualizar o índice atual
        currentSlideIndex = index;
        
        // Atualizar a barra de progresso
        updateProgress();
    }
    
    // Função para ir para o slide anterior
    function prevSlide() {
        goToSlide(currentSlideIndex - 1);
    }
    
    // Função para ir para o próximo slide
    function nextSlide() {
        goToSlide(currentSlideIndex + 1);
    }
    
    // Função para atualizar a barra de progresso
    function updateProgress() {
        const progress = ((currentSlideIndex) / (slides.length - 1)) * 100;
        progressBar.style.width = `${progress}%`;
    }
    
    // Evento para o botão de slide anterior
    prevBtn.addEventListener('click', prevSlide);
    
    // Evento para o botão de próximo slide
    nextBtn.addEventListener('click', nextSlide);
    
    // Eventos de teclado para navegação
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Inicializar os slides quando a DOM estiver completamente carregada
    window.addEventListener('load', initSlides);
    
    // Função para adicionar elementos aos slides com animações
    window.animateElement = (element, animationClass, delay = 0) => {
        setTimeout(() => {
            element.classList.add(animationClass);
        }, delay);
    };
    
    // Função para revelar elementos sequencialmente
    window.revealSequence = (selector, animation, delayBetween = 200) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            window.animateElement(el, animation, index * delayBetween);
        });
    };
});

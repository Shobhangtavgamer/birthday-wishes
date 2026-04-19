document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('open-btn');
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainScreen = document.getElementById('main-screen');
    const bdayAudio = document.getElementById('bday-audio');
    const carouselSpinner = document.getElementById('carousel-spinner');

    // Pause carousel on hover
    if (carouselSpinner) {
        carouselSpinner.addEventListener('mouseenter', () => {
            carouselSpinner.classList.add('paused');
        });
        carouselSpinner.addEventListener('mouseleave', () => {
            carouselSpinner.classList.remove('paused');
        });
    }

    // Modal Elements
    const imageModal = document.getElementById('image-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const carouselItems = document.querySelectorAll('.carousel-item');

    // Handle Image Click
    carouselItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const imgName = item.getAttribute('data-name');
            
            modalImg.src = imgSrc;
            modalTitle.textContent = imgName;
            
            imageModal.classList.remove('hidden');
            if(carouselSpinner) carouselSpinner.classList.add('paused');
        });
    });

    // Close Modal
    closeModalBtn.addEventListener('click', () => {
        imageModal.classList.add('hidden');
        if(carouselSpinner) carouselSpinner.classList.remove('paused');
    });

    // Cake Reveal Logic
    const cutCakeBtn = document.getElementById('cut-cake-btn');
    const cakeQuoteReveal = document.getElementById('cake-quote-reveal');
    if (cutCakeBtn && cakeQuoteReveal) {
        cutCakeBtn.addEventListener('click', () => {
            cutCakeBtn.style.display = 'none';
            cakeQuoteReveal.classList.remove('hidden');
            
            // Try to play the background audio seamlessly here as a surprise effect
            const playPromise = bdayAudio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    // Autoplay was prevented
                });
            }
        });
    }

    // Chess Sequence Elements
    const chessBtn = document.getElementById('chess-btn');
    const chessSequence = document.getElementById('chess-sequence');
    const closeChessBtn = document.getElementById('close-chess-btn');

    // Trigger Chess Sequence
    chessBtn.addEventListener('click', () => {
        chessSequence.classList.remove('hidden');
        
        // Small timeout to allow display:block to render before adding animation class
        setTimeout(() => {
            chessSequence.classList.add('play-anim');
            
            // Optionally pause background audio and play a dramatic sound here
            // bdayAudio.pause();
        }, 50);
    });

    // Close Chess Sequence
    closeChessBtn.addEventListener('click', () => {
        chessSequence.classList.remove('play-anim');
        chessSequence.classList.add('hidden');
    });

    openBtn.addEventListener('click', () => {
        // 1. Hide the welcome screen
        welcomeScreen.classList.add('hidden');
        
        // 2. Wait a tiny bit for the fade out to start, then show the main screen
        setTimeout(() => {
            mainScreen.classList.remove('hidden');
            
            // 3. Attempt to play the audio
            // Note: Browsers usually allow autoplay here because it's in response to a user click
            bdayAudio.volume = 0.5; // Start at 50% volume
            const playPromise = bdayAudio.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Audio autoplay prevented by browser. The user can play it manually from the controls.");
                });
            }
        }, 500); // 500ms delay matches the CSS transition partially
    });
});

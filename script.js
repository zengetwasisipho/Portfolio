document.addEventListener('DOMContentLoaded', () => {
    const name = document.querySelector('.name-display');

    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        // Subtle move: only 20% of scroll speed
        if (name) {
            name.style.transform = `translateY(${scrollValue * 0.2}px)`;
        }
    });
});
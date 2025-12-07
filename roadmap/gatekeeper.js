/* 1. MODAL LOGIC (Same as before) */
function closeModal() {
    document.getElementById('disclaimer-modal').style.display = 'none';
    document.getElementById('main-content').classList.remove('blur-filter');
}

/* 2. SWITCHING TECHNOLOGIES (HTML vs CSS vs JS) */
function switchTech(techName) {
    // A. Update Top Buttons
    document.querySelectorAll('.tech-btn').forEach(btn => btn.classList.remove('active'));
    // Find button that called this function (rough match) or pass 'this' in HTML
    // Ideally: event.target.classList.add('active');
    
    // B. Show the Section
    document.querySelectorAll('.tech-section').forEach(sec => sec.classList.remove('active-section'));
    document.getElementById(techName + '-section').classList.add('active-section');
}

/* 3. SLIDER LOGIC (Next/Prev Projects) */
function changeSlide(techName, direction) {
    const section = document.getElementById(techName + '-section');
    const slides = section.querySelectorAll('.project-slide');
    const dots = section.querySelectorAll('.dot');
    
    // Find current active index
    let activeIndex = 0;
    slides.forEach((slide, index) => {
        if (slide.classList.contains('active-slide')) activeIndex = index;
    });

    // Calculate new index
    let newIndex = activeIndex + direction;

    // Boundary Checks
    if (newIndex < 0) return; // Can't go before 0
    if (newIndex >= slides.length) return; // Can't go past end

    // UPDATE UI
    // 1. Hide old slide
    slides[activeIndex].classList.remove('active-slide');
    if (dots[activeIndex]) dots[activeIndex].classList.remove('active');

    // 2. Show new slide
    slides[newIndex].classList.add('active-slide');
    if (dots[newIndex]) dots[newIndex].classList.add('active');

    // 3. Disable/Enable Buttons
    const prevBtn = section.querySelector('.prev-btn');
    const nextBtn = section.querySelector('.next-btn');

    prevBtn.disabled = (newIndex === 0);
    nextBtn.disabled = (newIndex === slides.length - 1);
}

// Initialize buttons on load (Ensure 'Active' buttons are highlighted)
document.addEventListener('DOMContentLoaded', () => {
    // Add click listeners to buttons to handle 'active' state styling
    document.querySelectorAll('.tech-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tech-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
});
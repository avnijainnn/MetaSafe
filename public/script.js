document.addEventListener("DOMContentLoaded", function() {
    const testimonials = document.querySelector(".testimonials");

    function revealTestimonials() {
        if (testimonials.getBoundingClientRect().top < window.innerHeight * 0.8) {
            testimonials.classList.add("visible");
        }
    }

    window.addEventListener("scroll", revealTestimonials);
    revealTestimonials();
});

// Particle Animation for Background
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particlesArray = [];

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Particle Class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize Particles
function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 80; i++) {
        particlesArray.push(new Particle());
    }
}

// Animate Particles
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}

// Resize Canvas on Window Resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Start Animation
initParticles();
animateParticles();
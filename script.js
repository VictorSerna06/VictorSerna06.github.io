import { projects } from './js/projects.js';
import { experiences } from './js/experience.js';
import { techs } from './js/techs.js';
import { posts } from './js/posts.js';

// Animaciones al entrar en cada sección
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
}

const observer = new IntersectionObserver( (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { 
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Renderiza el contenido de proyectos
const projectsTrack = document.getElementById("projects-track");

function renderCardsProjects() { 
    projects.forEach(project => {
        
        const card = `
            <article class="project-card card-blue">
                <img class="project-card-image" src="${project.image}" alt="${project.title}">
                <div class="project-card-content">
                    <h3 class="project-card-title">
                        ${project.title}
                    </h3>
                    <p class="project-card-tech">
                        ${project.tech}
                    </p>
                    <p class="project-card-desc">
                        ${project.description}
                    </p>
                    ${project.link ? `<a class="project-card-link" href="${project.link}" target="_blank" rel="noopener">Ver Proyecto</a>` : ""}
                </div>
            </article>
        `;

        projectsTrack.insertAdjacentHTML('beforeend', card);
    });
}

renderCardsProjects();

// Carrusel
const prevBtn = document.getElementById("projects-prev");
const nextBtn = document.getElementById("projects-next");

function getStep() { 

    const card = projectsTrack.querySelector(".project-card");


    if (!card) { 
        return 0;
    }

    const gap = parseInt(getComputedStyle(projectsTrack).gap) || 0;

    return card.offsetWidth + gap;
}

prevBtn.addEventListener("click", () => {

    projectsTrack.scrollBy({
        left: -getStep(),
        behavior: "smooth"
    });
});

nextBtn.addEventListener("click", () => {

    projectsTrack.scrollBy({
        left: getStep(),
        behavior: "smooth"
    });
});

function updateArrows() { 

    const maxScroll = projectsTrack.scrollWidth - projectsTrack.clientWidth;
    prevBtn.disabled = projectsTrack.scrollLeft <= 4;
    nextBtn.disabled = projectsTrack.scrollLeft >= maxScroll - 4;
}

projectsTrack.addEventListener("scroll", updateArrows);
updateArrows();

// Renderiza las tarjetas de experiencia
const experiencesContainer = document.getElementById("experiences-container");

function renderCardsExperience() { 
    experiences.forEach(experience => {
        
        const card = `
            <article class="experience-item animate-on-scroll">    
                <span class="experience-date">
                    ${experience.date}
                </span>
                <h3 class="experience-role">
                    ${experience.role}
                </h3>
                <p class="experience-company">
                    ${experience.company}
                </p>
                <p class="experience-desc">
                    ${experience.description}
                </p>
            </article>
        `;

        experiencesContainer.insertAdjacentHTML("beforeend", card);
    });
}

// Renderiza las tarjetas de tecnologías
const techContainer = document.getElementById("tech-container");

function renderCardsTechs() {
    techs.forEach(tech => {

        if (tech.title == "Backend") {
            const cardPrincipal = `
                <div class="tech-category tech-featured card-purple animate-on-scroll">
                    <span class="tech-badge">
                        Principal
                    </span>
                    <h3 class="tech-category-title">
                        ${tech.title}
                    </h3>
                    <div class="tech-skills">
                        ${tech.techs.map(t => `
                                <span class="skill-tag">
                                    ${t}
                                </span>
                            `
                        ).join("")}
                    </div>
                </div>
            `;

            techContainer.insertAdjacentHTML("beforeend", cardPrincipal);
        } else {

            const card = `
                <div class="tech-category card-purple animate-on-scroll">
                    <h3 class="tech-category-title">
                        ${tech.title}
                    </h3>
                    <div class="tech-skills">
                        ${tech.techs.map(t => `
                                <span class="skill-tag">
                                    ${t}
                                </span>
                            `
                        ).join("")}
                    </div>
                </div>
            `;

            techContainer.insertAdjacentHTML("beforeend", card);
        }

    });
}

// Renderiza las tarjetas del blog
const blogContainer = document.getElementById("blog-container");

function renderCardsPosts() { 

    posts.forEach(post => {

        const card = `
            <article class="blog-card card-blue animate-on-scroll">
                <span class="blog-date">
                    ${post.date}
                </span>
                <h3 class="blog-title">
                    ${post.title}
                </h3>
                <p class="blog-desc">
                    ${post.description}
                </p>
            </article>
        `;

        blogContainer.insertAdjacentHTML("beforeend", card);
    });
}

// Funciones
renderCardsExperience();
renderCardsTechs();
renderCardsPosts()

// Obtiene todos los elementos para la animación
const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");
elementsToAnimate.forEach(e => {
    observer.observe(e);
});

// Actualiza en enlace en el menú
const sections = document.querySelectorAll("section[id]");
const navLinksActive = document.querySelectorAll(".nav-link");

const observerSections = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            navLinksActive.forEach(link => {
                link.classList.remove("active");

                const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);

                if (activeLink) { 
                    activeLink.classList.add("active");
                }
            });
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => {
    observerSections.observe(section);
});

// Menú movil
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
});

// Cierra el menú
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(link => { 
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
    });
});
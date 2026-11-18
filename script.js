// Arreglo de proyectos
const projectsData = [
    { 
        title: "Pure.com",
        tech: "HTML, CSS, JavaScript, Bootstrap, Java y Spring Boot",
        description: "Plataforma de comercio electrónico de uniformes médicos.",
        image: "./assets/images/pure.png",
        link: "https://github.com/aztrax369i/Pure.com"
    },
    {
        title: "Notes App",
        tech: "Java, Retrofit y Room",
        description: "Aplicación móvil para dispositivos Android que ayuda con la gestión de notas personales.",
        image: "./assets/images/notes-app.png",
        link: "https://github.com/VictorSerna06/NotesApp"
    }
];

// Renderiza los proyectos
const projectsContainer = document.getElementById("projects-container");

function renderProjects() { 
    projectsData.forEach(project => {
        
        const card = `
            <article class="project-card">
                <img class="project-card-image" src="${project.image}" alt="${project.title}">
                <div class="project-card-content">
                    <h3 class="project-card-title">${project.title}</h3>
                    <p class="project-card-tech">${project.tech}</p>
                    <p class="project-card-desc">${project.description}</p>
                    <a class="project-card-link" href="${project.link}" target="_blank">Ver Proyecto</a>
                </div>
            </article>
        `;

        projectsContainer.innerHTML += card;
    });
}

renderProjects();

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
});

// Cierra el menú
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(link => { 
    link.addEventListener("click", () => {
        console.log("Se hizo click")
        navMenu.classList.remove("active");
    });
});

// Limpia los campos del formulario y muestra un mensaje
const btnForm = document.getElementById("btn-form");
const inputs = document.querySelectorAll(".form-input");
const message = document.querySelector(".message-container");

btnForm.addEventListener("click", (e) => {
    e.preventDefault();
    inputs.forEach(input => {
        input.value = "";
    });
    message.classList.add("active");
});
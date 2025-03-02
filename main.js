// DOM Elements
const themeToggle = document.querySelector(".theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const header = document.querySelector(".header");
const navLinks = document.querySelectorAll(".nav-link");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const submitText = document.getElementById("submitText");
const loadingText = document.getElementById("loadingText");
const currentYearEl = document.getElementById("currentYear");
const heroTitle = document.querySelector(".hero-text h1");
const heroSubtitle = document.querySelector(".hero-text p");
const sections = document.querySelectorAll("section");

// Set current year in footer
currentYearEl.textContent = new Date().getFullYear();

// Theme Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  // Update icon
  const icon = themeToggle.querySelector("i");
  if (document.body.classList.contains("dark-theme")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
    header.style.color = "rgba(0, 0, 0, 0.9)";
    localStorage.setItem("theme", "light");
  }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
  const icon = themeToggle.querySelector("i");
  icon.classList.remove("fa-moon");
  icon.classList.add("fa-sun");
}

// Mobile Menu Toggle
menuToggle.addEventListener("click", () => {
  // Create mobile nav if it doesn't exist
  let mobileNav = document.querySelector(".mobile-nav");

  if (!mobileNav) {
    mobileNav = document.createElement("div");
    mobileNav.className = "mobile-nav";

    const navList = document.querySelector(".nav-list").cloneNode(true);
    mobileNav.appendChild(navList);

    document.body.insertBefore(mobileNav, header.nextSibling);

    // Add event listeners to new nav links
    const mobileNavLinks = mobileNav.querySelectorAll(".nav-link");
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("active");
      });
    });
  }

  mobileNav.classList.toggle("active");
});

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = link.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Header scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.style.boxShadow = "var(--shadow)";
    header.style.background = "rgba(255, 255, 255, 0.9)";
    header.style.color = "rgba(0, 0, 0, 0.9)";
  } else {
    header.style.boxShadow = "none";
    header.style.background = "transparent";
    header.style.color = "rgba(255, 255, 255, 0.9)";
  }
});

// Typing animation
const typingElement = document.querySelector(".typing");
const phrases = [
  "Hi, I'm Thuso Collen Mugeri",
  "I'm a Software Engeneer",
  "I'm looking fore a new position",
];
let i = 0;
let j = 0;
let currentPhrase = [];
let isDeleting = false;
let isEnd = false;

function loop() {
  isEnd = false;
  typingElement.innerHTML = currentPhrase.join("");

  if (i < phrases.length) {
    if (!isDeleting && j <= phrases[i].length) {
      currentPhrase.push(phrases[i][j]);
      j++;
      typingElement.innerHTML = currentPhrase.join("");
    }

    if (isDeleting && j <= phrases[i].length) {
      currentPhrase.pop(phrases[i][j]);
      j--;
      typingElement.innerHTML = currentPhrase.join("");
    }

    if (j == phrases[i].length) {
      isEnd = true;
      isDeleting = true;
    }

    if (isDeleting && j === 0) {
      currentPhrase = [];
      isDeleting = false;
      i++;
      if (i == phrases.length) {
        i = 0;
      }
    }
  }
  const spedUp = Math.random() * (80 - 50) + 50;
  const normalSpeed = Math.random() * (300 - 200) + 200;
  const time = isEnd ? 2000 : isDeleting ? spedUp : normalSpeed;
  setTimeout(loop, time);
}
loop();

// Contact Form Submission
// if (contactForm) {
//   contactForm.addEventListener("submit", (e) => {
//     e.preventDefault();

//     // Show loading state
//     submitText.style.display = "none";
//     loadingText.style.display = "inline-flex";

//     // Get form data
//     const formData = new FormData(contactForm);
//     const formDataObj = {};
//     formData.forEach((value, key) => {
//       formDataObj[key] = value;
//     });

//     // Simulate form submission with timeout
//     setTimeout(() => {
//       // Reset form
//       contactForm.reset();

//       // Show success message
//       formMessage.textContent =
//         "Thank you for your message! I'll get back to you soon.";
//       formMessage.className = "form-message success";

//       // Reset button state
//       submitText.style.display = "inline-flex";
//       loadingText.style.display = "none";

//       // Clear message after 5 seconds
//       setTimeout(() => {
//         formMessage.textContent = "";
//         formMessage.className = "form-message";
//       }, 5000);
//     }, 1500);
//   });
// }

// Skill bar animation
const skillBars = document.querySelectorAll(".skill-progress");

const animateSkillBars = () => {
  skillBars.forEach((bar) => {
    const width = bar.dataset.width;
    bar.style.width = "0";

    setTimeout(() => {
      bar.style.width = width;
    }, 100);
  });
};

// Animate skill bars when they come into view
const skillsSection = document.querySelector(".skills");
if (skillsSection) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkillBars();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(skillsSection);
}

// Project image hover effect
const projectCards = document.querySelectorAll(".project-card");
projectCards.forEach((card) => {
  const image = card.querySelector(".project-image img");

  card.addEventListener("mouseenter", () => {
    image.style.transform = "scale(1.05)";
  });

  card.addEventListener("mouseleave", () => {
    image.style.transform = "scale(1)";
  });
});

// // Auto-typing effect for hero title
// const typeWriter = (text, i = 0) => {
//   if (i < text.length) {
//     heroTitle.innerHTML =
//       text.substring(0, i + 1) + '<span class="typing"></span>';
//     setTimeout(() => typeWriter(text, i + 1), 100);
//   } else {
//     setTimeout(() => fadeInHeroSubtitle(), 500);
//   }
// };

// Fade in effect for hero subtitle
const fadeInHeroSubtitle = () => {
  heroSubtitle.style.opacity = "0";
  heroSubtitle.style.display = "block";
  let opacity = 0;
  const fadeIn = setInterval(() => {
    if (opacity >= 1) {
      clearInterval(fadeIn);
    }
    heroSubtitle.style.opacity = opacity.toString();
    opacity += 0.1;
  }, 100);
};

// Animate elements when they come into view
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
};

// Call the function when the page loads
window.addEventListener("load", animateOnScroll);

// Add animation classes to elements
document
  .querySelectorAll(".card, .project-card, .timeline-card")
  .forEach((el) => {
    el.classList.add("animate-on-scroll");
  });

// Initialize animations
animateOnScroll();

// Parallax effect for sections
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  sections.forEach((section) => {
    const speed = section.dataset.speed || 0.5;
    const yPos = -(scrolled * speed);
    section.style.backgroundPositionY = `${yPos}px`;
  });
});

// Add hover effects to buttons
const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("mouseenter", (e) => {
    const x = e.clientX - button.getBoundingClientRect().left;
    const y = e.clientY - button.getBoundingClientRect().top;

    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Animate numbers in skills section
const animateNumbers = () => {
  const numbers = document.querySelectorAll(".skill-info span:last-child");
  numbers.forEach((number) => {
    const target = Number.parseInt(number.textContent);
    let count = 0;
    const duration = 2000; // 2 seconds
    const interval = duration / target;

    const counter = setInterval(() => {
      count++;
      number.textContent = count + "%";
      if (count === target) {
        clearInterval(counter);
      }
    }, interval);
  });
};

// Call animateNumbers when skills section is in view
const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateNumbers();
        skillsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

skillsObserver.observe(skillsSection);

// View More Skills functionality
const viewMoreButton = document.getElementById("viewMoreSkills");
const hiddenSkills = document.querySelector(".hidden-skills");

if (viewMoreButton && hiddenSkills) {
  viewMoreButton.addEventListener("click", () => {
    hiddenSkills.classList.toggle("show");
    if (hiddenSkills.classList.contains("show")) {
      viewMoreButton.style.display = "View Less Skills";
      viewMoreButton.classList.add("active");
    } else {
      viewMoreButton.textContent = "View More Skills";
      viewMoreButton.classList.remove("active");
    }
  });
}

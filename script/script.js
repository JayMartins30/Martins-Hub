alert("Welcome here");


const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener('click',() => {
        navLinks.classList.toggle('show');
    });

    document.getElementById('year').textContent = new Date().getFullYear();

    window.addEventListener("load", () => {
  document.getElementById("preloader").style.display = "none";
});

document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");
    if (href && !href.startsWith("#")) { // avoid same-page links
      e.preventDefault();
      document.body.classList.add("fade-out");
      setTimeout(() => {
        window.location.href = href;
      }, 500); // match transition time
    }
  });
});

// Get button
const backToTop = document.getElementById("backToTop");

// Show button after scrolling down
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

// Smooth scroll back to top
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});



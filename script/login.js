// =====================
// DOM ELEMENTS
// =====================
const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const btnPopup = document.querySelector(".btnlogin-popup");
const iconClose = document.querySelector(".icon-close");
const burger = document.querySelector(".burger");
const navigation = document.querySelector(".navigation");

const loginForm = document.querySelector(".form-box.login form");
const registerForm = document.querySelector(".form-box.register form");
const welcomeBox = document.getElementById("welcomeBox");
const adminPanel = document.getElementById("adminPanel");
const preloader = document.getElementById("preloader");
const overlay = document.querySelector(".overlay"); // ✅ overlay reference
const backToTop = document.getElementById('backToTop');

// =====================
// MENU TOGGLE
// =====================
burger.addEventListener("click", () => {
  navigation.classList.toggle("active");
});

// =====================
// POPUP TOGGLE + OVERLAY
// =====================
// Open popup
btnPopup.addEventListener("click", () => {
  wrapper.classList.add("active-popup");
  overlay.style.display = "block";
});

// Close popup
iconClose.addEventListener("click", () => {
  wrapper.classList.remove("active-popup");
  overlay.style.display = "none";
});

// Switch to Register (keep overlay)
registerLink.addEventListener("click", (e) => {
  e.preventDefault();
  wrapper.classList.add("active");
  overlay.style.display = "block";
});

// Switch to Login (keep overlay)
loginLink.addEventListener("click", (e) => {
  e.preventDefault();
  wrapper.classList.remove("active");
  overlay.style.display = "block";
});

// Close when clicking overlay
overlay.addEventListener("click", () => {
  wrapper.classList.remove("active-popup");
  overlay.style.display = "none";
});


// =====================
// USER STORAGE
// =====================
let users = JSON.parse(localStorage.getItem("users")) || [];

// =====================
// REGISTER USER
// =====================
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = registerForm.querySelector("#register-username").value.trim();
  const email = registerForm.querySelector("#register-email").value.trim();
  const password = registerForm.querySelector("#register-password").value;

  // Prevent duplicate emails
  if (users.some((u) => u.email === email)) {
    alert("⚠️ User with this email already exists!");
    return;
  }

  const newUser = {
    username,
    email,
    password,
    isAdmin: users.length === 0, // ✅ First user = admin
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("✅ Registration successful! Please login.");
  registerForm.reset();
  wrapper.classList.remove("active"); // switch to login form
});

// =====================
// LOGIN USER
// =====================
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginForm.querySelector("#login-username").value.trim();
  const password = loginForm.querySelector("#login-password").value;
  const rememberMe = document.getElementById("rememberMe").checked;

  const foundUser = users.find((u) => u.email === email && u.password === password);
   
  
  if (foundUser) {
       localStorage.removeItem("currentUser");
       sessionStorage.removeItem("currentUser");

    // ✅ Save login depending on Remember Me
    if (rememberMe) {
      localStorage.setItem("currentUser", JSON.stringify(foundUser)); // stays after closing browser
    } else {
      sessionStorage.setItem("currentUser", JSON.stringify(foundUser)); // clears on close
    }

    // Show loading spinner before redirect
    document.body.innerHTML = `
      <div class="spinner"></div>
      <p style="color:white;text-align:center;">Logging in...</p>
    `;

    setTimeout(() => {
      if (foundUser.isAdmin) {
        window.location.href = "admin.html";
      } else {
        window.location.href = "dashboard.html";
      }
    }, 2000);
  } else {
    alert("❌ Invalid email or password!");
  }
});





// LOGOUT USER

function logoutUser() {
  localStorage.removeItem("currentUser");
  showWelcome();
}


// WELCOME + ADMIN PANEL

function showWelcome() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    welcomeBox.innerHTML = `
      <h2>Welcome, ${currentUser.username} 🎉</h2>
      <p>Email: ${currentUser.email}</p>
      <button id="logoutBtn" style="margin-top:15px; padding:10px 20px; background:#ec4899; color:#fff; border:none; border-radius:6px; cursor:pointer;">
        Logout
      </button>
    `;

    welcomeBox.style.display = "block";
    wrapper.style.display = "none";

    // Show admin panel
    if (currentUser.isAdmin) {
      adminPanel.style.display = "block";
      document.getElementById("showUsersBtn").addEventListener("click", showAllUsers);
    } else {
      adminPanel.style.display = "none";
    }

    document.getElementById("logoutBtn").addEventListener("click", logoutUser);
  } else {
    welcomeBox.style.display = "none";
    wrapper.style.display = "flex";
    adminPanel.style.display = "none";
  }
}


// ADMIN: SHOW USERS

function showAllUsers() {
  const usersList = document.getElementById("usersList");
  usersList.innerHTML = "<h3>Registered Users:</h3>";

  users.forEach((u, i) => {
    usersList.innerHTML += `<p>${i + 1}. ${u.username} - ${u.email} ${u.isAdmin ? "(Admin)" : ""}</p>`;
  });
}


// PAGE LOAD

document.addEventListener("DOMContentLoaded", () => {
  showWelcome();
  preloader.style.display = "none"; // hide preloader
});

// Show button after scrolling down
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.style.display = "flex";
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


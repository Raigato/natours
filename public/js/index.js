import "@babel/polyfill";

import { displayMap } from "./mapbox";
import { login, logout } from "./login";
import { updateSettings } from "./updateSettings";
import { bookTour } from "./stripe";
import { showAlert } from "./alerts";

const mapBox = document.getElementById("map");
const loginForm = document.querySelector(".form--login");
const logoutBtn = document.querySelector(".nav__el--logout");
const userUpdateForm = document.querySelector(".form-user-data");
const userPasswordUpdateForm = document.querySelector(".form-user-settings");
const bookBtn = document.getElementById("book-tour");

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    login(email, password);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    logout();
  });
}

if (userUpdateForm) {
  userUpdateForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", document.getElementById("name").value);
    form.append("email", document.getElementById("email").value);
    form.append("photo", document.getElementById("photo").files[0]);

    updateSettings(form, "data");
  });
}

if (userPasswordUpdateForm) {
  userPasswordUpdateForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    document.querySelector(".btn--save-password").textContent = "Updating...";

    const currentPassword = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;

    await updateSettings(
      { currentPassword, password, passwordConfirm },
      "password"
    );

    document.querySelector(".btn--save-password").textContent = "Save password";
    document.getElementById("password-current").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password-confirm").value = "";
  });
}

if (bookBtn) {
  bookBtn.addEventListener("click", (e) => {
    e.target.textContent = "Processing...";

    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}

const alertMessage = document.querySelector("body").dataset.alert;
if (alert) showAlert("success", alertMessage, 10);

function animateAndRedirect() {
    const wrapper = document.getElementById("loginWrapper");
    wrapper.classList.remove("show");
    wrapper.classList.add("hide");

    setTimeout(() => {
        window.location.href = "index.html"; 
    }, 500);
}

/// Вход
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("errorMessage");

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const user = storedUsers.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem("authenticated", "true");
        localStorage.setItem("username", username); 
        localStorage.setItem("currentUser", JSON.stringify(user)); 
        animateAndRedirect();
    } else {
        errorMessage.style.display = "block";
    }
});

document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const newUsername = document.getElementById("newUsername").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];


    const existingUser = storedUsers.find(user => user.username === newUsername);
    if (existingUser) {
        alert("Пользователь с таким логином уже существует.");
        return;
    }

    storedUsers.push({ username: newUsername, password: newPassword });
    localStorage.setItem("users", JSON.stringify(storedUsers)); 

    localStorage.setItem("username", newUsername);
    localStorage.setItem("authenticated", "true");
    animateAndRedirect();
});

document.getElementById("showRegister").addEventListener("click", function () {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "flex";
});

document.getElementById("showLogin").addEventListener("click", function () {
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "flex";
});

document.addEventListener("DOMContentLoaded", function () {
    const wrapper = document.getElementById("loginWrapper");
    setTimeout(() => {
        wrapper.classList.add("show");
    }, 100);
});

function logout() {
    localStorage.removeItem("authenticated");
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function () {
    const storedUsername = localStorage.getItem("username");

    if (!storedUsername) {
        const greetingEl = document.getElementById("greetingText");
        if (greetingEl) {
            greetingEl.textContent = "Введите ваш логин";
        }
    }
});
document.getElementById("forgotPassword").addEventListener("click", function () {
    const username = document.getElementById("username").value.trim();
    if (!username) {
        alert("Пожалуйста, введите логин.");
        return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find(user => user.username === username);

    if (user) {
        const newPassword = prompt("Введите новый пароль для восстановления:");
        if (newPassword) {
            user.password = newPassword;
            localStorage.setItem("users", JSON.stringify(storedUsers));
            alert("Пароль успешно изменен!");
        }
    } else {
        alert("Пользователь с таким логином не найден.");
    }
});

const toggleButton = document.getElementById("toggleButton");
const themeOptions = document.getElementById("themeOptions");

// Показ/скрытие меню выбора темы с плавным появлением кнопок
toggleButton.addEventListener("click", () => {
    if (themeOptions.classList.contains("show")) {
        themeOptions.classList.remove("show");
        themeOptions.style.display = "none";
    } else {
        themeOptions.style.display = "flex";
        // Чтобы запустить CSS-анимацию плавного появления, добавим класс с задержкой
        setTimeout(() => themeOptions.classList.add("show"), 10);
    }
    toggleButton.classList.toggle("expanded");
});

// Функция анимации луча солнца при смене темы (закручивание против часовой)
function animateSunbeamAndThemeChange(theme) {
    // Создаем оверлей
    const overlay = document.createElement("div");
    overlay.classList.add("sunbeam-overlay");
    document.body.appendChild(overlay);

    // Запускаем анимацию вращения и затем удаляем оверлей
    overlay.style.animation = "sunbeamRotate 1.2s ease forwards";

    // Меняем тему с задержкой, чтобы анимация успела начаться
    setTimeout(() => {
        applyTheme(theme);
        localStorage.setItem("theme", theme);
    }, 400); // 400 мс — примерно середина анимации

    overlay.addEventListener("animationend", () => {
        overlay.remove();
    });
}

// Обработчик кнопок смены темы
document.querySelectorAll('.theme-options button').forEach(button => {
    button.addEventListener('click', () => {
        const theme = button.dataset.theme;
        animateSunbeamAndThemeChange(theme);
        // Закрываем меню выбора темы
        themeOptions.classList.remove("show");
        themeOptions.style.display = "none";
        toggleButton.classList.remove("expanded");
    });
});

// Функция применения темы — меняет CSS-переменные с плавным переходом
function applyTheme(theme) {
    const root = document.documentElement;

    if (theme === "dark") {
        root.style.setProperty('--bg-color', '#1c1c1c');
        root.style.setProperty('--text-color', '#f2f2f2');
    } else if (theme === "light") {
        root.style.setProperty('--bg-color', '#F2E7D5');
        root.style.setProperty('--text-color', '#1c1c1c');
    } else if (theme === "system") {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
        return;
    }
}

// При загрузке страницы применяем сохранённую тему или системную
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem("theme") || "system";
    applyTheme(savedTheme);
});

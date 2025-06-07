import React, { useState, useEffect } from 'react';
import '../static/auth.css'
import { Link } from 'react-router-dom';

function AuthPage() {
    const API_URL = 'http://localhost:8000';


    const [showLogin, setShowLogin] = useState(true);
    const [errorMessage, setErrorMessage] = useState(false);
    const [themeOptionsVisible, setThemeOptionsVisible] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "system");

    useEffect(() => {
        const wrapper = document.getElementById("loginWrapper");
        setTimeout(() => {
            wrapper.classList.add("show");
        }, 100);
        
        applyTheme(theme);
    }, []);

    useEffect(() => {
        document.body.classList.add('auth-page');

        return () => {
            document.body.classList.remove('auth-page');
        };
    }, []);

    const animateAndRedirect = () => {
        const wrapper = document.getElementById("loginWrapper");
        wrapper.classList.remove("show");
        wrapper.classList.add("hide");

        setTimeout(() => {
            window.location.href = "index.html";
        }, 500);
    };

    // Обработка авторизации
    const handleLogin = async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();

            if (response.ok) {
                // Сохранение данных
                localStorage.setItem("authenticated", "true");
                localStorage.setItem("username", username);
                localStorage.setItem("currentUser", JSON.stringify(result.user));

                animateAndRedirect();
            } else {
                setErrorMessage(true);
                console.error("Ошибка входа:", result.message);
            }
        } catch (error) {
            console.error('Ошибка сети:', error);
            setErrorMessage(true);
        }
    };


    // Обработка регистрации
    const handleRegister = async (e) => {
        e.preventDefault();

        const newUsername = document.getElementById("newUsername").value.trim();
        const newEmail = document.getElementById("newEmail").value.trim();
        const newPhone = document.getElementById("newPhone").value.trim();
        const newPassword = document.getElementById("newPassword").value.trim();

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: newUsername, email: newEmail, phone: newPhone, password: newPassword }),
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem("authenticated", "true");
                localStorage.setItem("username", newUsername);
                localStorage.setItem("currentUser", JSON.stringify(result.user));

                animateAndRedirect();
            } else {
                alert(result.message || 'Ошибка регистрации');
            }
        } catch (error) {
            console.error('Ошибка регистрации:', error);
            alert('Произошла ошибка при регистрации');
        }
    };


    // Изменение пароля
    const handleForgotPassword = () => {
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
    };


    // Смена темы
    const toggleThemeOptions = () => {
        setThemeOptionsVisible(!themeOptionsVisible);
    };


    // Плавное появление страницы
    const animateSunbeamAndThemeChange = (selectedTheme) => {
        const overlay = document.createElement("div");
        overlay.classList.add("sunbeam-overlay");
        document.body.appendChild(overlay);

        overlay.style.animation = "sunbeamRotate 1.2s ease forwards";

        setTimeout(() => {
            applyTheme(selectedTheme);
            localStorage.setItem("theme", selectedTheme);
            setTheme(selectedTheme);
        }, 400);

        overlay.addEventListener("animationend", () => {
            overlay.remove();
        });

        setThemeOptionsVisible(false);
    };

    const applyTheme = (theme) => {
        const body = document.documentElement;

        if (theme === "dark") {
            // Темная тема
            body.style.setProperty('--bg-color', '#467649');
            body.style.setProperty('--text-color', '#264728');
            body.style.setProperty('--input-bg', '#1E1E1E');
            body.style.setProperty('--input-text-color', '#8DDC92');
            body.style.setProperty('--title-color', '#264728');
            body.style.setProperty('--button-bg', '#1E1E1E');
            body.style.setProperty('--auth-text-color', '#1E1E1E');
            body.style.setProperty('--auth-link-color', '#8DDC92');
            body.style.setProperty('--submit-button-bg', '#467649');
        } else if (theme === "light") {
            // Светлая тема
             body.style.setProperty('--bg-color', '#5ccd63b3');
             body.style.setProperty('--text-color', '#FFFFFF');
             body.style.setProperty('--input-bg', '#f5f5f5');
             body.style.setProperty('--input-text-color', '#333333');
             body.style.setProperty('--button-bg', '#f5f5f5');  
             body.style.setProperty('--title-color', '#f5f5f5');
             body.style.setProperty('--auth-text-color', '#f5f5f5');
             body.style.setProperty('--auth-link-color', '#467649');
             body.style.setProperty('--submit-button-bg', '#8DDC92');
        } else if (theme === "system") {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(prefersDark ? 'dark' : 'light');
            return;
        }
    };

    return (
        <>
        <div className='header-block'>
            <Link to="/" className='back-to-home'>&lt;</Link>
            <h1 className='header-h1'>GreenUp</h1>
            <div></div>
             <div className="theme-toggle" id="themeToggle">
                <button className={`theme-btn ${themeOptionsVisible ? "expanded" : ""}`} id="toggleButton" onClick={toggleThemeOptions}>
                    <img src="./light.png" alt="Иконка темы" style={{ width: "24px", height: "24px" }} />
                </button>
                {themeOptionsVisible && (
                    <div className="theme-options" id="themeOptions">
                        <button onClick={() => animateSunbeamAndThemeChange("light")}>Светлая</button>
                        <button onClick={() => animateSunbeamAndThemeChange("dark")}>Тёмная</button>
                        <button onClick={() => animateSunbeamAndThemeChange("system")}>Системная</button>
                    </div>
                )}
            </div>
        </div>
        <div className="auth-container">
            <div className="login-wrapper" id="loginWrapper">
                {showLogin ? (
                    <form className="login-form" id="loginForm" onSubmit={handleLogin}>
                        <h1>Вход</h1>
                        <input type="text" id="username" placeholder="Имя" required />
                        <input type="password" id="password" placeholder="Пароль" required />
                        <button type="submit">Войти</button>
                        {errorMessage && <div className="error-message">Неверный логин или пароль</div>}
                        <p className='auth-link-text'>
                            Нет аккаунта? <button 
                                type="button" 
                                id="showRegister" 
                                onClick={() => setShowLogin(false)}
                            >
                                Зарегистрироваться
                            </button>
                        </p>
                        <p style={{ textAlign: "center", marginTop: "10px" }}>
                            <button type="button" id="forgotPassword" onClick={handleForgotPassword}>
                                Забыли пароль?
                            </button>
                        </p>
                    </form>
                ) : (
                    <form className="login-form" id="registerForm" onSubmit={handleRegister}>
                        <h1>Регистрация</h1>
                        <input type="text" id="newUsername" placeholder="Имя" required />
                        <input type="email" id="newEmail" placeholder="Почта" required />
                        <input type="phone" id="newPhone" placeholder="Телефон" required />
                        <input type="password" id="newPassword" placeholder="Пароль" required />
                        <button type="submit">Зарегистрироваться</button>
                        <p className='auth-link-text'>
                            Есть аккаунт? <button 
                                type="button" 
                                id="showLogin" 
                                onClick={() => setShowLogin(true)}
                            >
                                Войти
                            </button>
                        </p>
                        <p style={{ textAlign: "center", marginTop: "10px" }}>
                            <button type="button" id="forgotPassword" onClick={handleForgotPassword}>
                                Забыли пароль?
                            </button>
                        </p>
                    </form>
                )}
            </div>
        </div>
        </>
    );
}

export default AuthPage;
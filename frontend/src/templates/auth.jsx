import React, { useState, useEffect } from 'react';
import Inputmask from 'inputmask';
import '../static/auth.css'
import { Link, useNavigate } from 'react-router-dom';

function AuthPage() {
    const API_URL = 'http://localhost:5173';


    const [showLogin, setShowLogin] = useState(true);
    const [errorMessage, setErrorMessage] = useState(false);
    const [themeOptionsVisible, setThemeOptionsVisible] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "system");

    const navigate = useNavigate();

    // Прокрутка в начало страницы при переходе
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    // Очистка ошибок после ввода
    useEffect(() => {
        const usernameInput = document.getElementById("username");
        const passwordInput = document.getElementById("password");

        const clearError = () => {
            const loginError = document.getElementById("loginError");
            if (loginError) loginError.textContent = "";
        }

        usernameInput?.addEventListener("input", clearError);
        passwordInput?.addEventListener("input", clearError);

        return () => {
            usernameInput?.removeEventListener("input", clearError);
            passwordInput?.removeEventListener("input", clearError);
        };
    }, []);

    // Инициализация маски
    useEffect(() => {
        const phoneInput = document.getElementById("newPhone");
        if (phoneInput) {
            const maskOptions = {
                mask: "+7 (999) 999-99-99",
                showMaskOnHover: false,
                autoUnmask: true
            };
            Inputmask(maskOptions).mask(phoneInput);
        }
    }, [showLogin]);

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

        // Переход на главную страницу при успешной регистрации/авторизации
        setTimeout(() => {
            naviagate = "/"; 
        }, 500);
    };

    // Обработка авторизации
    const handleLogin = async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        const submitBtn = document.getElementById("loginSubmitBtn");

        if (submitBtn.disabled) return;

        submitBtn.disabled = true;
        submitBtn.textContent = "Загрузка...";

        const isValidUsername = /^[a-zA-Z0-9_\-@.]+$/i.test(username);

        if (!isValidUsername) {
            loginError.textContent = "Логин содержить недопустимые символы";
            return;
        }

        const loginError = document.getElementById("password-error");
        loginError.textContent = ''; // Очистка предыдущего сообщения

        if (username.length < 3 || username.length > 20) {
            loginError.textContent = "Логин должен быть от 3 до 20 символов"
        }
        if (password.length < 9) {
            loginError.textContent = "Пароль слишком короткий"
        }

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

        // Проверка пароля
        const hasLatinLetters = /[a-zA-Z]/.test(newPassword);
        const hasUpperCase = /[A-Z]/.test(newPassword);
        const hasDigit = /\d/.test(newPassword);

        const passwordError = document.getElementById("password-error");
        passwordError.textContent = ''; // Очистка предыдущего сообщения

        if (newPassword.length < 9) {
            passwordError.textContent = "Пароль должен содержать не менее 9 символов";
            return;
        }

        if (!hasLatinLetters) {
            passwordError.textContent = "Пароль должен содержать английские буквы";
            return;
        }

        if (!hasUpperCase) {
            passwordError.textContent = "Пароль должен содержать хотя бы одну заглавную букву";
            return;
        }

        if (!hasDigit) {
            passwordError.textContent = "Пароль должен содержать хотя бы одну цифру";
            return;
        }

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
            body.classList.add("dark");
            body.classList.remove("light");
        } else if (theme === "light") {
            body.classList.add("light");
            body.classList.remove("dark");
        } else if (theme === "system") {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(prefersDark ? 'dark' : 'light');
            return;
        }

        localStorage.setItem("theme", theme);
    };

    return (
        <>
        <div className="auth-page-container">
              <div className="theme-toggle" id="themeToggle">
                <button className={`theme-btn ${themeOptionsVisible ? "expanded" : ""}`} id="toggleButton" onClick={toggleThemeOptions}>
                    <img src={theme === 'dark' ? './black.svg' : './white.svg'} alt="Иконка темы" />
                </button>
                {themeOptionsVisible && (
                    <div className="theme-options" id="themeOptions">
                        <button onClick={() => animateSunbeamAndThemeChange("light")}>Светлая</button>
                        <button onClick={() => animateSunbeamAndThemeChange("dark")}>Тёмная</button>
                        <button onClick={() => animateSunbeamAndThemeChange("system")}>Системная</button>
                    </div>
                )}
            </div>
        <div className='header-block'>
            <Link to="/" className='back-to-home'>&lt;</Link>
            <h1 className='header-h1'>GreenUp</h1>
        </div>
        <div className="auth-container">
            <div className="login-wrapper" id="loginWrapper">
                {showLogin ? (
                    <form className="login-form" id="loginForm" onSubmit={handleLogin}>
                        <h1>Вход</h1>
                        <input type="text" id="username" placeholder="Имя" required />
                        <input type="password" id="password" placeholder="Пароль" required />
                        <button type="submit">Войти</button>
                        <div id='loginError' style={{ color: "#ff5959", fontSize: '1em', letterSpacing: '1px'}}></div>
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
                            <button type="button" id="forgotPassword">
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
                        <div id='password-error' style={{ color: '#ff5959', fontSize: '1em', letterSpacing: '1px'}}></div>
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
                            <button type="button" id="forgotPassword">
                                Забыли пароль?
                            </button>
                        </p>
                    </form>
                )}
            </div>
        </div>
        </div>
        </>
    );
}

export default AuthPage;
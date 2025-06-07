import { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import '../static/header.css';

function Header() {
    const [isFixed, setIsFixed] = useState(false);
    const [direction, setDirection] = useState('up');
    const [prevScrollY, setPrevScrollY] = useState(0); 
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 300) {
                setIsFixed(true);
                if (currentScrollY > prevScrollY) {
                    setDirection('up');
                } else {
                    setDirection('down');
                }
            } else {
                setIsFixed(false);
                setDirection('up');
            }

            setPrevScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollY]);

    useEffect(() => {
        if (isBurgerOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.paddingRight = '';
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.paddingRight = '';
            document.body.style.overflow = '';
        };
    }, [isBurgerOpen]);

    return (
        <>
            <header className={`desktop-header ${isFixed ? 'fixed' : ''} ${isFixed && direction === 'down' ? 'hide' : ''}`.trim()}>
                <div className="left-block">
                    <h1 className='h1-header'>GreenUp</h1>
                    <div className="menu">
                        <input type="checkbox" id="burger-checkbox" className="burger-checkbox" checked={isBurgerOpen} onChange={(e) => setIsBurgerOpen(e.target.checked)}/>
                        <label htmlFor="burger-checkbox" className="burger"></label>
                    </div>
                    <div className='search-block'>
                        <input 
                        type="text" 
                        placeholder='Поиск...'
                        className='search-input'
                        />
                    </div>

                    <div className="language-block">
                        {/* <img className='language-img' src="./RUS.svg" alt="" /> */}
                        <button className='btn-language'>RU</button>
                    </div>

                    <div className="favourites">
                        <a href="#">ИЗБРАННОЕ</a>
                    </div>
                </div>

                <div className="right-block">
                    <div className="profile">
                        <Link to="/login" className='btn-profile'>
                            ГОСТЬ
                            <span className='icon-wrapper'>
                                <img src="./icon.svg" alt="" />
                            </span>
                        </Link>
                    </div>

                    <div className="basket-block">
                        <img className='basket-img' src="./Basket.svg" alt="" />
                    </div>

                    <div className='geo-block'>
                        <img className='geo-img' src="./geo.svg" alt="" />
                    </div>
                </div> 
            </header>

            
            <div className='mobile-bottom-bar'>
                <div className="mobile-nav-item favourites">
                    <img src="./favourites.svg" alt="" />
                </div>
                <div className='mobile-nav-item basket'>
                    <img src="./Basket 2.svg" alt="" />
                </div>
                <div className="mobile-nav-item menu">
                    <input type="checkbox" id="burger-checkbox" className="burger-checkbox" checked={isBurgerOpen} onChange={(e) => setIsBurgerOpen(e.target.checked)} />
                    <label htmlFor="burger-checkbox" className="burger"></label>
                </div>
            </div>

            {isFixed && <div className="header-placeholder"></div>}

            <nav className={`burger-menu ${isBurgerOpen ? 'active' : ''}`}>
                <button className='close-burger' onClick={() => setIsBurgerOpen(false)}>
                    &times;
                </button>

                <ul>
                    <li><a href="#">Главная</a></li>
                    <li><a href="#">Каталог</a></li>
                    <li><a href="#">О нас</a></li>
                    <li><a href="#">Контакты</a></li>
                </ul>
            </nav>
        </>
    )
}

export default Header;
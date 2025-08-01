import React, { useEffect, useState, useRef } from 'react';
// import '../static/filter_sidebar.css';
import '../static/products_page.css';

function FilterSidebar() {
    const [minPrice, setMinPrice] = useState(200);
    const [maxPrice, setMaxPrice] = useState(500);
    const minGap = 100;

     const handleMinPriceChange = (e) => {
        const value = parseInt(e.target.value);
        if (value <= maxPrice - minGap) {
            setMinPrice(value);
        }
    };

    const handleMaxPriceChange = (e) => {
        const value = parseInt(e.target.value);
        if (value <= maxPrice + minGap) {
            setMaxPrice(value);
        }
    };


    return (
        <div className='filter'>
            <div className='category-block'>
                <h1>Категория</h1>
                <ul className='category-list'>
                    <li><button type='button'>Мужчины</button></li>
                    <li><button type='button'>Женщины</button></li>
                    <li><button type='button'>Дети</button></li>
                    <li><button type='button'>Унисекс</button></li>
                </ul>
            </div>

            <div className='price-block'>
                <h1>Акции и скидки</h1>

                <ul className='discount-list'>
                    <li><button type='button'>Все скидки</button></li>
                    <li><button type='button'>Сегодняшние предложения</button></li>
                </ul>

                <h1>Цена</h1>
                <div className='price-slider-container'>
                <div className="slider-wrapper">
                        <div className="slider-track">
                            <div className='slider-inactive-left' style={{ width: `${(minPrice / 1000) * 100}%` }}></div>
                            <div className='slider-active' style={{ 
                                left: `${(minPrice / 1000) * 100}%`,
                                width: `${((maxPrice - minPrice) / 1000) * 100}%`
                            }}></div>
                            <div className='slider-inactive-right' style={{ 
                                left: `${(maxPrice / 1000) * 100}%`,
                                width: `${100 - (maxPrice / 1000) * 100}%`
                            }}></div>

                            <input
                                type="range"
                                className="slider-thumb"
                                min="0"
                                max="1000"
                                step="10"
                                value={minPrice}
                                onChange={handleMinPriceChange}
                            />
                            <div className='price-bubble' style={{ left: `${(minPrice / 1000) * 100}%` }}>
                                {minPrice} ₽
                            </div>

                            <input
                                type="range"
                                className="slider-thumb"
                                min="0"
                                max="1000"
                                step="10"
                                value={maxPrice}
                                onChange={handleMaxPriceChange}
                            />
                            <div className='price-bubble' style={{ left: `${(maxPrice / 1000) * 100}%` }}>
                                {maxPrice} ₽
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <h1>Отдел</h1>
        </div>
    );
}

export default FilterSidebar;
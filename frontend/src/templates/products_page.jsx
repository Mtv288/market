import { useState, useEffect } from 'react'
import '../static/products_page.css';
import { useContext } from 'react';
import { LoadingContext } from './loading_context';

function ProductsPage () {
    const { setLoading } = useContext(LoadingContext);

    useEffect(() => {
        setLoading(true);

        //Эмуляция загрузки данных
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
        <div className='cards-block fade-in'>
            <ul className='cards'>
                <li className='card'>
                    <div className='img-wrapper'>
                        <img className='img-card' src="https://www.gizmochina.com/wp-content/uploads/2023/01/upcoming-iphone-15-pro-design-changes.jpeg" alt="" />
                    </div>
                    <div className='inform-block'>
                        <h1 className='name-card'>Iphone 15 pro MAX</h1>
                        <p className='description-card'>Новый ультрасовременный телефон от Apple</p>
                        <p className='price'>80000Р</p>
                    </div>
                    <div className='btn-block-card'>
                        <button className='btn-card'>КУПИТЬ</button>
                        <button className='btn-card'>В КОРЗИНУ</button>
                    </div>
                </li>
                 <li className='card'>
                    <div className="img-wrapper">
                        <img className='img-card' src="https://i5.walmartimages.com/asr/92bb596e-b4df-4a69-9c16-f68af1cc24a3.6fedcc84f6c5373cad70f5549bcc389f.jpeg" alt="" />
                    </div>
                    <div className="inform-block">
                        <h1 className='name-card'>Iphone 15 pro MAX</h1>
                        <p className='description-card'>Новый ультрасовременный телефон от Apple</p>
                        <p className='price'>80000Р</p>
                    </div>
                    <div className='btn-block-card'>
                        <button className='btn-card'>КУПИТЬ</button>
                        <button className='btn-card'>В КОРЗИНУ</button>
                    </div>
                </li>
                 <li className='card'>
                    <div className="img-wrapper">
                        <img className='img-card' src="https://i5.walmartimages.com/asr/92bb596e-b4df-4a69-9c16-f68af1cc24a3.6fedcc84f6c5373cad70f5549bcc389f.jpeg" alt="" />
                    </div>
                    <div className="inform-block">
                        <h1 className='name-card'>Iphone 15 pro MAX</h1>
                        <p className='description-card'>Новый ультрасовременный телефон от Apple</p>
                        <p className='price'>80000Р</p>
                    </div>
                    <div className='btn-block-card'>
                        <button className='btn-card'>КУПИТЬ</button>
                        <button className='btn-card'>В КОРЗИНУ</button>
                    </div>
                </li>
                 <li className='card'>
                    <div className="img-wrapper">
                        <img className='img-card' src="https://i5.walmartimages.com/asr/92bb596e-b4df-4a69-9c16-f68af1cc24a3.6fedcc84f6c5373cad70f5549bcc389f.jpeg" alt="" />
                    </div>
                    <div className="inform-block">
                        <h1 className='name-card'>Iphone 15 pro MAX</h1>
                        <p className='description-card'>Новый ультрасовременный телефон от Apple</p>
                        <p className='price'>80000Р</p>
                    </div>  
                    <div className='btn-block-card'>
                        <button className='btn-card'>КУПИТЬ</button>
                        <button className='btn-card'>В КОРЗИНУ</button>
                    </div>
                </li>
                 <li className='card'>
                    <div className="img-wrapper">
                        <img className='img-card' src="https://i5.walmartimages.com/asr/92bb596e-b4df-4a69-9c16-f68af1cc24a3.6fedcc84f6c5373cad70f5549bcc389f.jpeg" alt="" />
                    </div>
                    <div className="inform-block">
                        <h1 className='name-card'>Iphone 15 pro MAX</h1>
                        <p className='description-card'>Новый ультрасовременный телефон от Apple</p>
                        <p className='price'>80000Р</p>
                    </div>
                    <div className='btn-block-card'>
                        <button className='btn-card'>КУПИТЬ</button>
                        <button className='btn-card'>В КОРЗИНУ</button>
                    </div>
                </li>
                 <li className='card'>
                    <div className="img-wrapper">
                        <img className='img-card' src="https://i5.walmartimages.com/asr/92bb596e-b4df-4a69-9c16-f68af1cc24a3.6fedcc84f6c5373cad70f5549bcc389f.jpeg" alt="" />
                    </div>
                    <div className="inform-block">
                        <h1 className='name-card'>Iphone 15 pro MAX</h1>
                        <p className='description-card'>Новый ультрасовременный телефон от Apple</p>
                        <p className='price'>80000Р</p>
                    </div>
                    <div className='btn-block-card'>
                        <button className='btn-card'>КУПИТЬ</button>
                        <button className='btn-card'>В КОРЗИНУ</button>
                    </div>
                </li>
                 <li className='card'>
                    <div className='img-wrapper'>
                        <img className='img-card' src="https://www.gizmochina.com/wp-content/uploads/2023/01/upcoming-iphone-15-pro-design-changes.jpeg" alt="" />
                    </div>
                    <div className='inform-block'>
                        <h1 className='name-card'>Iphone 15 pro MAX</h1>
                        <p className='description-card'>Новый ультрасовременный телефон от Apple</p>
                        <p className='price'>80000Р</p>
                    </div>
                    <div className='btn-block-card'>
                        <button className='btn-card'>КУПИТЬ</button>
                        <button className='btn-card'>В КОРЗИНУ</button>
                    </div>
                </li>
                 <li className='card'>
                    <div className="img-wrapper">
                        <img className='img-card' src="https://i5.walmartimages.com/asr/92bb596e-b4df-4a69-9c16-f68af1cc24a3.6fedcc84f6c5373cad70f5549bcc389f.jpeg" alt="" />
                    </div>
                    <div className="inform-block">
                        <h1 className='name-card'>Iphone 15 pro MAX</h1>
                        <p className='description-card'>Новый ультрасовременный телефон от Apple</p>
                        <p className='price'>80000Р</p>
                    </div>
                    <div className='btn-block-card'>
                        <button className='btn-card'>КУПИТЬ</button>
                        <button className='btn-card'>В КОРЗИНУ</button>
                    </div>
                </li>
                 <li className='card'>
                    <div className="img-wrapper">
                        <img className='img-card' src="https://i5.walmartimages.com/asr/92bb596e-b4df-4a69-9c16-f68af1cc24a3.6fedcc84f6c5373cad70f5549bcc389f.jpeg" alt="" />
                    </div>
                    <div className="inform-block">
                        <h1 className='name-card'>Iphone 15 pro MAX</h1>
                        <p className='description-card'>Новый ультрасовременный телефон от Apple</p>
                        <p className='price'>80000Р</p>
                    </div>
                    <div className='btn-block-card'>
                        <button className='btn-card'>КУПИТЬ</button>
                        <button className='btn-card'>В КОРЗИНУ</button>
                    </div>
                </li>
                 <li className='card'>
                    <div className="img-wrapper">
                        <img className='img-card' src="https://i5.walmartimages.com/asr/92bb596e-b4df-4a69-9c16-f68af1cc24a3.6fedcc84f6c5373cad70f5549bcc389f.jpeg" alt="" />
                    </div>
                    <div className="inform-block">
                        <h1 className='name-card'>Iphone 15 pro MAX</h1>
                        <p className='description-card'>Новый ультрасовременный телефон от Apple</p>
                        <p className='price'>80000Р</p>
                    </div>  
                    <div className='btn-block-card'>
                        <button className='btn-card'>КУПИТЬ</button>
                        <button className='btn-card'>В КОРЗИНУ</button>
                    </div>
                </li>
                 <li className='card'>
                    <div className="img-wrapper">
                        <img className='img-card' src="https://i5.walmartimages.com/asr/92bb596e-b4df-4a69-9c16-f68af1cc24a3.6fedcc84f6c5373cad70f5549bcc389f.jpeg" alt="" />
                    </div>
                    <div className="inform-block">
                        <h1 className='name-card'>Iphone 15 pro MAX</h1>
                        <p className='description-card'>Новый ультрасовременный телефон от Apple</p>
                        <p className='price'>80000Р</p>
                    </div>
                    <div className='btn-block-card'>
                        <button className='btn-card'>КУПИТЬ</button>
                        <button className='btn-card'>В КОРЗИНУ</button>
                    </div>
                </li>
                 <li className='card'>
                    <div className="img-wrapper">
                        <img className='img-card' src="https://i5.walmartimages.com/asr/92bb596e-b4df-4a69-9c16-f68af1cc24a3.6fedcc84f6c5373cad70f5549bcc389f.jpeg" alt="" />
                    </div>
                    <div className="inform-block">
                        <h1 className='name-card'>Iphone 15 pro MAX</h1>
                        <p className='description-card'>Новый ультрасовременный телефон от Apple</p>
                        <p className='price'>80000Р</p>
                    </div>
                    <div className='btn-block-card'>
                        <button className='btn-card'>КУПИТЬ</button>
                        <button className='btn-card'>В КОРЗИНУ</button>
                    </div>
                </li>
            </ul>
        </div>
        </>
    )
}

export default ProductsPage
import React from 'react';
import '../static/loading_page.css';

const LoaderPage = () => {
    return (
        <div className='loader-page'>
            <div className="loader-content">
                <h1 className='logo'>GreenUp</h1>
                <div className='spinner'></div>
            </div>
        </div>
    );
};

export default LoaderPage;
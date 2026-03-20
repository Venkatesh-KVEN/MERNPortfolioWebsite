import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import '../intro/intro.css';

function Intro() {
    // All Hooks must be called at the top level, before any conditional returns
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const { portfolioData } = useSelector((state) => state.root);
    
    // Handle loading state with a simple check - but keep hooks above
    if (!portfolioData) {
        return <div className="loader">Loading Intro...</div>;
    }
    
    const { intro, socialLink } = portfolioData;
    const { firstName, captions, description, welcomeText } = intro || {};
    console.log(captions)
    // const captionArray = captions ? captions.split(',').map(item => item.trim()) : ['Developer', 'Designer', 'Creator'];
    
    return (
        <div className="bg-dark text-secondary px-4 py-5 text-center heroGredBackground pt-5 d-flex justify-content-center align-items-center" id="home">
            <div className="py-5">
                <h6 className='welcome-text' data-aos="fade-up" data-aos-easing="ease-in-sine" >{welcomeText}</h6>
                <h1 className="display-3 fw-normal text-white" data-aos="fade-up" data-aos-easing="ease-in-sine">{firstName}</h1>
                <div data-aos="fade-up" data-aos-easing="ease-in-sine">
                    <div className='intro-typed-text-one'>
                       <span className='hero-title-gradient-text pe-2'>I'm a</span>
                        {(typeof captions === 'string' ? captions.split(',').map(s => s.trim()) : captions || [])?.map?.((text, index) => (
                        <span key={index} className={`hero-title-gradient-text pe-2 hero-title-gradient-text-${index}`}>
                            {text}
                        </span>
                        ))}
                    </div>
                </div>
                                    
                <div className="col-lg-12 mx-auto mt-3">
                    <p className="fs-6 mb-4 w-50 mx-auto text-center" data-aos="fade-up" data-aos-easing="ease-in-sine">{description}</p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center align-items-center">
                        <a href='#projects' className="btn btn-primary btn-sm custom-into-btn py-2" data-aos="zoom-in" data-aos-easing="ease-in-sine">View My Work</a>
                        <div className='social-icons-wrapper'>
                            {
                                socialLink?.map((item, index) => {
                                    return (
                                        <a key={index} href={item.url} target="_blank" rel="noopener noreferrer" className="btn btn-md btn-dark m-1 rounded-circle custom-icon-btn" data-aos="zoom-in" data-aos-easing="ease-in-sine">
                                            <i className={`bi bi-${item.icon}`}></i>
                                        </a>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Intro
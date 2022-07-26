import React, { useEffect, useState } from 'react';
import './home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Home = (prop) => {
    const [imgSlide, setImgSlide] = useState(1);

    var next = () => {
        (imgSlide === 4 ) ? setImgSlide(1) : setImgSlide(imgSlide + 1);
    }
    var prev = () => {
        (imgSlide === 1 ) ? setImgSlide(4) : setImgSlide(imgSlide - 1);
    }
    useEffect(() => {
        const interval = setInterval(next, 3000);
        return () => clearInterval(interval);
      }, [imgSlide]);

    return (
        <div className="home_page">
            <div className="bgr_slide">
                <img src={"./imgs/imgSlide" + imgSlide + ".jpg"}/>
                <div className='control_slide'>
                    <div className='display_flex'>
                        <div onClick={prev}><FontAwesomeIcon icon={faAngleLeft}/></div>
                        <div onClick={next}><FontAwesomeIcon icon={faAngleRight}/></div>
                    </div>
                </div>
            </div>
            <div className="bgr_content">
                <div className="bgr_feeds">
                    <p>Các bài viết sẽ nằm ở đây</p>
                </div>
                <div className="bgr_about">
                    <div className='img_admin'>
                        {(prop.img_admin === "") ? (<FontAwesomeIcon icon={faCircleUser}/>) :
                        (<img src={prop.img_admin} alt="This is the Admin profile."/>)
                        }
                    </div>
                    <div>
                        <h3>Hồ Văn Nhân</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Home;
import React from 'react';
import './home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';

const Home = (prop) => {
    return (
        <div className="home_page">
            <div className="bgr_slide">
                <p>Slide hình ảnh ở đây</p>
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
                        <p>content</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Home;
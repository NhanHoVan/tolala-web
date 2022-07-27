import React, { useEffect, useState } from 'react';
import './home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faMessage, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const Home = (props) => {
    //image slide show
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
    // eslint-disable-next-line
    }, [imgSlide]);

    //user information.
    const relationship = (para) => {
        switch(para){
            case 2:
            return "Đang trong hai mối quan hệ"
            case 3: 
            return "Đã cưới"
            default:
            return "Độc thân"
        }
    }

    return (
        <div className="home_page">
            <div className="bgr_slide">
                <img src={"./imgs/imgSlide" + imgSlide + ".jpg"} alt="slide show"/>
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
                    <div className='display_flex_col_center'>
                        <div className='profile_img'>
                            {(props.avatar.img_admin === "") ? (<img src={props.avatar.icon_user} alt="This is the User profile."/>) :
                            (<img src={props.avatar.img_admin} alt="This is the User profile."/>)
                            }
                        </div>
                        <div>
                            <h3>{props.user.name}</h3>
                        </div>
                    </div>
                    <div className='profile_inf'>
                        <p>Tuổi: {props.user.birthday}</p>
                        <p>Sở thích: {props.user.hobby}</p>
                        <p>Tình trạng: {relationship(props.user.relationship)}</p>
                    </div>
                    <div className='profile_act'>
                        <Link to='/friends'><FontAwesomeIcon className='icon' icon={faUserPlus} /></Link>
                        <Link to='/messenger'><FontAwesomeIcon className='icon' icon={faMessage}/></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Home;
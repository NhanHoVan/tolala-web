import React, { useEffect, useState } from 'react';
import './home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faGlobe, faHeart, faImages, faLock, faMessage, faSquarePlus, faUserGroup, faUserPlus, faUserTag } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import moment from 'moment';

const arrFeed = [{
    id: 0,
    title: "",
    content: "",
    image: "",
    author: "",
    createDate: new Date(),
    updateDate: new Date(),
    shareTo: 0,
    like: 0
  }]

const feedList = [{
    id: 1,
    title: "Cá voi xanh dài 12m bất ngờ xuất hiện ở biển Đề Gi",
    content: "Chiều 26-7, ông Đình Thành Tiến, chủ tịch UBND xã Cát Khánh, huyện Phù Cát (Bình Định) cho biết vào sáng cùng ngày tại khu vực Hòn Trâu, thuộc vùng biển Đề Gi xuất hiện 2 con cá voi xanh trước sự kinh ngạc của nhiều du khách và hướng dẫn viên.",
    image: "./imgs/feed1.jpg",
    author: "aaaaas1",
    createDate: 2022/7/24,
    updateDate: "",
    shareTo: 1,
    like: 23
  },
  {
    id: 2,
    title: "Động vật ăn tạp lớn nhất thế giới",
    content: "Cá mập voi là loài ăn lọc và từ lâu giới khoa học đã quan sát chúng ăn nhuyễn thể ở rạn san hô Ningaloo ngoài khơi Tây Australia. Nhưng khi các nhà nghiên cứu phân tích mẫu sinh thiết từ cá mập voi sống quanh rạn san hô, họ phát hiện thực chất chúng ăn rất nhiều thực vật.",
    image: "./imgs/feed2.jpg",
    author: "aaaaas1",
    createDate: 2022/7/25,
    updateDate: "",
    shareTo: 0,
    like: 0
  },
]

const Home = (props) => {
    const [imgSlide, setImgSlide] = useState(1);
    const [feeds, setFeeds] = useState(arrFeed);
    const [img, setImg] = useState("");

    //Set list feed
    useEffect(() => {
      setFeeds(feedList)
    }, [feeds])

    //Reload page
    const reload =() =>{
        window.location.reload();
    }
    //image slide show
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
    const relationship = (param) => {
        switch(param){
            case 2:
            return "Đang trong hai mối quan hệ"
            case 3: 
            return "Đã cưới"
            default:
            return "Độc thân"
        }
    }

    //feed
    const shareTo = (param) => {
        switch (param) {
            case 0:
                return <FontAwesomeIcon icon={faLock}/>
            case 1:
                return <FontAwesomeIcon icon={faGlobe}/>
            default:
                return <FontAwesomeIcon icon={faUserGroup}/>
        }
    }
    const addLike = () => {

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
                    <div className='bgr_addNewFeed'>
                        <div className='img_feed'>
                            {(img === "") ? ("") :
                                (<img src={img.uri} alt="This is the new feed's img"/>)
                                }
                        </div>
                        <textarea rows="4" placeholder='Bạn đang nghĩ gì?'></textarea>
                        <div className='display_flex_right'>
                            <p><FontAwesomeIcon icon={faUserTag}/></p>
                            <p><FontAwesomeIcon icon={faImages}/></p>
                            <p><FontAwesomeIcon icon={faSquarePlus}/></p>
                        </div>
                    </div>
                    {feeds.map((feed)=> (
                        <div className='feed' key={feed.id}>
                            <h3 className='title_feed'>{feed.title}</h3>
                            <p>{moment(feed.createDate).startOf('day').fromNow()} - {shareTo(feed.shareTo)}</p>
                            <div className='img_feed'>
                                {(feed.image === "") ? ("") :
                                    (<img src={feed.image} alt="This is the feed's img"/>)
                                    }
                            </div>
                            <p>{feed.content}</p>
                            <div onClick={addLike}><FontAwesomeIcon className='iconHeart' icon={faHeart}/> {feed.like}</div>
                        </div>
                    )) }
                </div>
                <div className="bgr_about">
                    <div className='display_flex_col_center'>
                        <div className='profile_img'>
                            {(props.user.avatar === "") ? (<img src="./imgs/icon_user.png" alt="This is the User profile."/>) :
                            (<img src={props.user.avatar} alt="This is the User profile."/>)
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
                    <div className='profile_act' onClick={reload}>
                        <Link to='/friends'><FontAwesomeIcon className='icon' icon={faUserPlus} /></Link>
                        <Link to='/messenger'><FontAwesomeIcon className='icon' icon={faMessage}/></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Home;
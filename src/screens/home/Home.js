import React, { useEffect, useState, useRef } from 'react';
import './home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faEllipsis, faGlobe, faHeart, faIcons, faImages, faLock, faSquarePlus, faUserGroup, faUserTag} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { getToken, getUser } from '../utils/Common';
import axios from 'axios';
import moment from 'moment';

const token = getToken();
const user = getUser();


const UpdateDeleteFeed = ({id, editFeed, deleteFeed}) => (
    <div id={id} className='btn_update_delete'>
        <p onClick={editFeed}>Edit</p>
        <p onClick={deleteFeed}>Delete</p>
    </div>
)


const Home = (props) => {
    const [imgSlide, setImgSlide] = useState(1);
    const [feedList, setFeedList] = useState([]);
    const [feeds, setFeeds] = useState([]);
    const [selectImg, setSelectImg] = useState("");
    const [selectFeed, setSelectFeed] = useState("");
    const [content, setContent] = useState("");
    const [share, setShare] = useState("1");
    const [mess, setMess] = useState("");
    const [infUser, setInfUser] = useState({});
    const hiddenImgInput = useRef("");

    //Set list feed
    useEffect(() => {
        (user === null) ? (
            setFeeds(listFeedAccess(feedList.filter((item)=> item.shareTo === "1")))
        ):(
            setFeeds(listFeedAccess(feedList))
        )

    }, [feedList])

    // Set list feed
    useEffect(() => {
        getFeeds();
    }, [])
    
    const cleanFormFeed = () => {
        setContent("");
        setShare("1");
        setMess("");
        cleanImg();
    }

    //------GET API FEED-------

    //get list Feeds.
    const getFeeds = () => {
        axios.get('http://localhost:4000/feeds').then(response => {
            setFeedList(response.data.feeds);
        }).catch(e => {
            console.log("Get API Feeds Error"+ e);
        });
    }

    //add new feed.
    const addNewFeed = () => {
        if (content === "") {
            setMess("Bạn đang nghĩ gì?")
        } else {
            let setId = 1;
            if (feedList.length !== 0) {
                let ids = feedList.map(f => {return f.id;});
                setId = Math.max(...ids) + 1;
            }

            let data = JSON.stringify({
                "id": setId,
                "content": content,
                "image": ((selectImg) === "" ? ("") : (URL.createObjectURL(selectImg))),
                "authorId": user.id,
                "createDate": new Date(),
                "updateDate": "",
                "shareTo": share,
                "like": 0,
                "token": token
            });
    
            let configPost = {
                method: 'POST',
                url: 'http://localhost:4000/feeds/add-new-feed',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
    
            axios(configPost)
                .then((response) => {
                    setFeedList(response.data.feeds);
                    cleanFormFeed();
                })
                .catch((e) => {
                    alert("Có lỗi xảy ra" + e)
                });
        }
    }

    //Edit delete feed
    //Edit
    const editFeed = () => {
        return null;
    }
    //Delete
    const deleteFeed = (f) => {
        let data = JSON.stringify({
            "token": token,
            "id": f.id,
        });

        let configPost = {
            method: 'POST',
            url: 'http://localhost:4000/feeds/delete-feed',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(configPost)
            .then((response) => {
                setFeedList(response.data.feeds)
                getFeeds();
                setSelectFeed("");
            })
            .catch((e) => {
                alert("Có lỗi xảy ra" + e);
            });
    }

    //--------END--------

    //image slide show
    const next = () => {
        (imgSlide === 4 ) ? setImgSlide(1) : setImgSlide(imgSlide + 1);
    }
    const prev = () => {
        (imgSlide === 1 ) ? setImgSlide(4) : setImgSlide(imgSlide - 1);
    }
    useEffect(() => {
        const interval = setInterval(next, 3000);
        return () => clearInterval(interval);
    // eslint-disable-next-line
    }, [imgSlide]);

    //Infor user
    const userInf = (id) => {
        for (const u of props.infUsers) {
            if (id === u.id) {
                return u;
            }
        }
        return null;
    }
    useEffect(() => {
        if (user != null) {
            setInfUser(userInf(user.id));
        }
    }, [user])
    const showInfUser = (iU) => {
        return (
            <div className='bgr_profile'>
                <div className='display_flex_col_center'>
                    <div className='profile_img'>
                        { showAvatar(iU) }
                    </div>
                    <div>
                        <h3>{iU.name}</h3>
                    </div>
                </div>
                <div className='profile_inf'>
                    <p>Tuổi: {iU.birthday}</p>
                    <p>Sở thích: {iU.hobby}</p>
                    <p>Tình trạng: {relationship(iU.relationship)}</p>
                </div>
            </div>
        )
    }

    //user information.
    const relationship = (p) => {
        switch(p){
            case 2:
            return "Đang trong hai mối quan hệ"
            case 3: 
            return "Đã cưới"
            default:
            return "Độc thân"
        }
    }
    //show avata
    const showAvatar = (inf) => {
        if (inf !== null && inf.avatar !== "") {
            return <img src={inf.avatar} alt="This is the User profile."/>;
        }
        return <img src="./imgs/icon_user.png" alt="This is the User profile."/>;
    }

    //feed
    const shareTo = (p) => { switch (p) {
            case "0":
                return <FontAwesomeIcon icon={faLock}/>;
            case "1":
                return <FontAwesomeIcon icon={faGlobe}/>;
            default:
                return <FontAwesomeIcon icon={faUserGroup}/>;
        }
    }
    const addLike = () => {
        return null
    }
    const visibleBtnAct = (u, f) => {
        if (u !== null) {
            if (isPermissionShowAct(f)) {
                return <p id={f.id} onClick={selectFeed === "" ? showBtnUpdateDeleteFeed : hideBtnUpdateDeleteFeed }><FontAwesomeIcon icon={faEllipsis}/></p>
            }
        }
        return null;
    }

    //pick image
    const handleClickImg = () => {
        hiddenImgInput.current.click();
    }
    const handleChangeImg = (e) => {
        setSelectImg(e.target.files[0]);
    };
    const cleanImg = () => {
        setSelectImg("");
    }
    const showImgChoose = (sI) => {
        if (sI !== "") {
            return <div className='bgr_img_feed'><img src={URL.createObjectURL(sI)} alt="This is the new feed's img"/><p onClick={cleanImg}>x</p></div>
        }
        return null;
    }

    //Show button acction
    const showBtnUpdateDeleteFeed = (e) => {
        document.getElementById(e.currentTarget.id + "ud").classList.add("showBtn");
        setSelectFeed( parseInt(e.currentTarget.id));
    }
    const hideBtnUpdateDeleteFeed = (e) => {
        document.getElementById(e.currentTarget.id + "ud").classList.remove("showBtn");
        setSelectFeed("");
    }

    //Set permission
    const isPermissionShowAct = (f) => { let permission = false;
        if (user.id === 0 || f.authorId === user.id) {
            permission = true;
        }
        return permission;
    }
    const listFeedAccess = (fs) => {
        if (user !== null) {
            let feedListHide = [];
            if (user.id !== 0) {
                for (const feed of fs) {
                    if (feed.authorId !== user.id && feed.shareTo === "0") {
                        feedListHide = feedListHide.concat(fs.filter((item)=>item.id === feed.id));
                    }
                }
                if (feedListHide !== null) {
                    return fs.filter(feed => !feedListHide.includes(feed));
                }
            }
        }
        return fs;
        
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
                    { user? (
                        <div className='bgr_addNewFeed'>
                            <div className='img_feed'>
                                {showImgChoose(selectImg)}
                            </div>
                            {mess && <p className='mess'>{mess}</p>}
                            <textarea
                                rows="4"
                                placeholder='Bạn đang nghĩ gì?'
                                required
                                value={content}
                                onChange={(e)=> setContent(e.target.value)}
                            ></textarea>
                            <div className='display_flex'>
                                <div className='display_flex_left'>
                                    {(share === "1") ? (<FontAwesomeIcon icon={faGlobe}/>) : (<FontAwesomeIcon icon={faLock}/>)}
                                    <select
                                        value={share}
                                        onChange={(e) => setShare(e.target.value)}
                                    >
                                        <option value={"0"} name={"Private"}>Private</option>
                                        <option value={"1"} name={"Public"}>Public </option>
                                    </select>
                                </div>
                                <div className='display_flex_right'>
                                    <p><FontAwesomeIcon icon={faIcons}/></p>
                                    <p><FontAwesomeIcon icon={faUserTag}/></p>
                                    <p onClick={handleClickImg}><FontAwesomeIcon icon={faImages}/></p>
                                    <input
                                        type={'file'}
                                        style={{display:'none'}}
                                        ref={hiddenImgInput}
                                        onChange={handleChangeImg}
                                    ></input>
                                    <p onClick={addNewFeed}><FontAwesomeIcon icon={faSquarePlus}/></p>
                                </div>
                            </div>
                        </div>
                    ): null }
                    {feeds.map((feed)=> (
                        <div className='feed' key={feed.id}>
                            <div className='display_flex_space'>
                                <div className='update_delete_feed'>
                                    {visibleBtnAct(user, feed)}
                                    <UpdateDeleteFeed id={feed.id +"ud"} editFeed={()=>editFeed()} deleteFeed={()=>deleteFeed(feed)}/>
                                </div>
                                <p>{moment(feed.createDate).startOf('day').fromNow()} - {shareTo(feed.shareTo)}</p>
                            </div>
                            <div className='img_feed'>
                                {(feed.image === "") ? ("") :
                                    (<img src={feed.image} alt="This is the feed's img"/>)
                                    }
                            </div>
                            <p>{feed.content}</p>
                            <div className='display_flex_space'>
                                <p onClick={addLike}><FontAwesomeIcon className='iconHeart' icon={faHeart}/> {feed.like}</p>
                                <p>{userInf(feed.authorId) && userInf(feed.authorId).name}</p>
                            </div>
                        </div>
                    )) }
                </div>
                <div className="bgr_about">
                    {
                        user === null ? (
                            <div className='profile_img'>
                                <NavLink to='/login' >
                                    <img src="./imgs/icon_user.png" alt="This is the User profile."/>
                                    <p>Đăng nhập để hiển thị thông tin</p>
                                </NavLink>
                            </div>
                        ):(
                            infUser && showInfUser(infUser)
                        )
                    }
                </div>
            </div>
            <div className='bgr_footer'>
                <p>Copyright@ VanNhan</p>
            </div>
        </div>
    );
}
 
export default Home;
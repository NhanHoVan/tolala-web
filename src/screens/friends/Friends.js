import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faSearch, faUserGroup, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { getUser } from '../utils/Common';
import './friends.css';

const user = getUser();

const ModalUnfriend =({ id, title, pressOk, pressCancel }) => (
    <div id={id} className='modal'>
        <p>{title}</p>
        <div className='display_flex_space'>
            <button className='btn_Ok' onClick={pressOk}>Ok</button>
            <button className='btn_Cancel' onClick={pressCancel}>Cancel</button>
        </div>
    </div>
)

const Friends = (props) => {
    const [friends, setFriends] = useState([]);
    const [userInf, setUserInf] = useState([]);
    const [mess, setMess] = useState("");
    const [select, setSelect] = useState("");
    const [searchFor, setSearchFor] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setFriends(props.infUsers.filter((i)=>i.userId !== user.userId));

        if (user !== null) {
            for (const u of props.infUsers) {
                if (user.userId === u.userId) {
                    setUserInf(u);
                }
            }
        }
    }, [])

    //Check is friend
    const isFriend = (f) => {
        let arrFriends = userInf.friends;
        if (arrFriends !== null) {
            for (const ele of arrFriends) {
                if (ele === f.userId.toString()) {
                    return true
                }
            }
        }
        return false;
    }

    //Unfriend
    const showModalUnfriend = (e) => {
        document.getElementById(e.currentTarget.id + "mf").classList.add("showModal");
        setSelect(e.currentTarget.id);
    }
    const hidenModalUnfriend = () => {
        document.getElementById(select + "mf").classList.remove("showModal");
        setSelect("");
    }
    const unFriend = (id) => {
        for (let j = 0; j < friends.length; j++) {
            let friend = friends[j];
            if (friend.id === id) {
                friends.splice(j, 1);
                setMess("Bỏ theo dõi " + friend.name + " thành công");
                setSelect("");
            }
        }
    }

    //Search friends.
    const searchFriend = () => {
        setLoading(true);
    }

    return (
        <div className="friends_page">
            <div className="mess">
                {mess && <p>{mess}</p>}
            </div>
            <div className='searchFriend'>
                <input 
                    type="text" 
                    placeholder='Search for ...'
                    value={searchFor}
                    onChange={(e)=> setSearchFor(e.target.value)}
                />
                <p onClick={searchFriend}><FontAwesomeIcon icon={faSearch}/></p>
            </div>
            {loading && <p>Is loading ...</p>}
            <div className="list_friends">
                <div className="bgr_friends">
                    { friends.map((friend) => (
                        <div className='bgr_friend' key={friend.userId}>
                            <div className='display_flex'>
                                <div>
                                    <h3>{friend.name}</h3>
                                    <p>" {friend.slogan} "</p>
                                </div>
                                <div className='bgr_icon'>
                                    { isFriend(friend) ? (
                                        <div className={'iconMess'}>
                                            <Link to={`/messenger/${friend.userId}`}>
                                                <FontAwesomeIcon className='icon' icon={faMessage}/>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className={'iconMess hidden'}>
                                            <FontAwesomeIcon className='icon' icon={faMessage}/>
                                        </div>
                                    )}
                                    
                                    <div className='iconFriend'>
                                        { isFriend(friend) ? (
                                            <div className='bgr_del_friend'>
                                                { !select && <p id={friend.userId} onClick={showModalUnfriend}><FontAwesomeIcon className='icon' icon={faUserGroup}/></p>}
                                                <ModalUnfriend id={friend.userId+'mf'} title={`Bạn chắc chắn muốn bỏ theo dõi ${friend.name}`}
                                                    pressOk={()=>unFriend(friend.userId)}
                                                    pressCancel={hidenModalUnfriend}/>
                                            </div>
                                            ) : (
                                                <div onClick={()=>{alert("Gửi lời mời kết bạn thành công!")}}>
                                                    <FontAwesomeIcon className='icon' icon={faUserPlus}/>
                                                </div>
                                            ) }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) }
                </div>
            </div>
        </div>
    );
}
 
export default Friends;
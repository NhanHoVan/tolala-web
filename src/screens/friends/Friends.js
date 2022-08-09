import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faSearch } from '@fortawesome/free-solid-svg-icons';
import './friends.css';

const friendsList = [{
    id: 1,
    fName: "Nguyen Van A",
    sologan: "ahihi"
},
{
    id: 3,
    fName: "Nguyen Thanh Thao",
    sologan: "ahihi"
},
{
    id: 5,
    fName: "Nguyen Van B",
    sologan: "ahihi"
}]

const ModalUnfriend =({ id, title, pressOk, pressCancel }) => (
    <div id={id} className='modal'>
        <p>{title}</p>
        <div className='display_flex_space'>
            <button className='btn_Ok' onClick={pressOk}>Ok</button>
            <button className='btn_Cancel' onClick={pressCancel}>Cancel</button>
        </div>
    </div>
)

const Friends = () => {
    const [friends, setFriends] = useState([]);
    const [mess, setMess] = useState("");
    const [select, setSelect] = useState("");
    const [searchFor, setSearchFor] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setFriends(friendsList);
    }, [])

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
                setMess("Bỏ theo dõi " + friend.fName + " thành công");
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
                        <div className='bgr_friend' key={friend.id}>
                            <div className='bgr_del_friend'>
                                { !select && <p className='pDel' id={friend.id} onClick={showModalUnfriend}>x</p>}
                                <ModalUnfriend id={friend.id+'mf'} title={"Bạn chắc chắn muốn bỏ theo dõi " + friend.fName}
                                    pressOk={()=>unFriend(friend.id)}
                                    pressCancel={hidenModalUnfriend}/>
                            </div>
                            <div className='display_flex'>
                                <div>
                                    <h3>{friend.fName}</h3>
                                    <p>" {friend.sologan} "</p>
                                </div>
                                <div>
                                    <Link to={'/messenger/:'+ friend.id}>
                                        <FontAwesomeIcon className='icon' icon={faMessage}/>
                                    </Link>
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
import { faHome, faMessage, faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser, removeUserSession } from '../utils/Common';
import { createBrowserHistory } from "history";
import './navbar.css';

const history = createBrowserHistory({ window });
let user = getUser();

const UserAct = ({handleLogout}) => (
    <div id='act_user' className='act_user'>
        <p>Đổi ảnh đại diện</p>
        <p>Cài đặt chung</p>
        <p onClick={handleLogout}>Đăng xuất</p>
    </div>
)

const Navbar = (props) => {
    const [selected, setSelected] = useState(false);
    const [infUser, setInfUser] = useState({});

    //Reload page
    const reload =() =>{
        window.location.reload();
    }

    //Infor user
    const userInf = (id) => {
        for (const u of props.infUsers) {
            if (id === u.id) {
                return u;
            }
        }
        return null;
    }
    useEffect(()=>{
        if (user !== null) {
            setInfUser(userInf(user.id));
        }
    },[])

    //Show button user acction
    const showBtnUserAct = () => {
        document.getElementById("act_user").classList.add("showBtn");
        setSelected(true);
    }
    const hideBtnUserAct = () => {
        document.getElementById("act_user").classList.remove("showBtn");
        setSelected(false);
    }

    // handle click event of logout button
    const handleLogout = () => {
        removeUserSession();
        history.push('/');
        reload();
    }

    //show Avatar in icon user
    const showAvatar = (iU) => {
        if (iU !== null && iU.avatar !== "") {
            return <img src={iU.avatar} alt='avatar user'/>;
        }
        return <div className='user_icon'><FontAwesomeIcon className='icon' icon={faUser}/></div>;
    }
    
    return (
        <div className="navbar">
            <div ><NavLink to='/'><h1 className="title_page">Tolala</h1></NavLink></div>
            <div className='display_flex_right'>
                <div className='nav_list'>
                    <NavLink style={({ isActive }) => ({ backgroundColor: isActive ? '#F26618' : '#faebd7' })} to='/'>
                        <FontAwesomeIcon className='icon' icon={faHome}/>
                    </NavLink>
                    <NavLink style={({ isActive }) => ({ backgroundColor: isActive ? '#F26618' : '#faebd7' })} to='/friends'>
                        <FontAwesomeIcon className='icon' icon={faUserGroup}/>
                    </NavLink>
                    <NavLink style={({ isActive }) => ({ backgroundColor: isActive ? '#F26618' : '#faebd7' })} to='/messenger'>
                        <FontAwesomeIcon className='icon' icon={faMessage}/>
                    </NavLink>
                </div>
                {
                    user === null ? (
                        <div className='user_icon'>
                            <NavLink to='/login' >
                                <FontAwesomeIcon className='icon' icon={faUser}/>
                            </NavLink>
                        </div>
                    ): (
                        <div className='user_avatar' >
                            <div className='avatar' onClick={!selected ? showBtnUserAct : hideBtnUserAct }>
                                { showAvatar(infUser) }
                            </div>
                            <UserAct handleLogout={()=>handleLogout()} />
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Navbar;
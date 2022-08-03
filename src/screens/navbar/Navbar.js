import { faHome, faMessage, faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser, removeUserSession } from '../utils/Common';
import { createBrowserHistory } from "history";
import './navbar.css';

const history = createBrowserHistory({ window });

const UserAct = ({handleLogout}) => (
    <div id='act_user' className='act_user'>
        <p>Đổi ảnh đại diện</p>
        <p>Cài đặt chung</p>
        <p onClick={handleLogout}>Đăng xuất</p>
    </div>
)

const Navbar = () => {
    const [selected, setSelected] = useState(false);
    const user = getUser();

    //Reload page
    const reload =() =>{
        window.location.reload();
    }

    //Show button user acction
    const showBtnUserAct = (e) => {
        document.getElementById("act_user").classList.add("showBtn");
        setSelected(true);
    }
    const hideBtnUserAct = (e) => {
        document.getElementById("act_user").classList.remove("showBtn");
        setSelected(false);
    }

    // handle click event of logout button
    const handleLogout = () => {
        removeUserSession();
        history.push('/');
        reload();
    }
    
    return (
        <div className="navbar">
            <div onClick={reload}><NavLink to='/'><h1 className="title_page">Tolala</h1></NavLink></div>
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
                            <div className='avatar' onClick={!selected? showBtnUserAct : hideBtnUserAct }>
                                {user.avatar !== "" ? <img src={user.avatar} alt='avatar user'/>: <div className='user_icon'><FontAwesomeIcon className='icon' icon={faUser}/></div>}
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
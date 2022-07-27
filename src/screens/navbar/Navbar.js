import { faHome, faMessage, faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
    //Reload page
    const reload =() =>{
        window.location.reload();
    }

    //get pathname
    const selected = window.location.pathname;
    useEffect(() => {
        console.log(selected);
      }, [selected]);

    const setStyle =(selected, path) => {
        return (selected === path) ? ({backgroundColor: '#F26618'}) : ({backgroundColor: '#faebd7'});
    }
    
    return (
        <div className="navbar">
            <div onClick={reload}><Link to='/'><h1 className="title_page">Tolala</h1></Link></div>
            <div className='display_flex_right'>
                <ul>
                    <li style={setStyle(selected, "/")} onClick={reload}>
                        <Link to='/'>
                            <FontAwesomeIcon className='icon' icon={faHome}/>
                        </Link>
                    </li>
                    <li style={setStyle(selected, "/friends")} onClick={reload}>
                        <Link to='/friends'>
                            <FontAwesomeIcon className='icon' icon={faUserGroup}/>
                        </Link>
                    </li>
                    <li style={setStyle(selected, "/messenger")} onClick={reload}>
                        <Link to='/messenger'>
                            <FontAwesomeIcon className='icon' icon={faMessage}/>
                        </Link>
                    </li>
                </ul>
                <div className='user_icon' onClick={reload}>
                    <Link to='/user' >
                        <FontAwesomeIcon className='icon' icon={faUser}/>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
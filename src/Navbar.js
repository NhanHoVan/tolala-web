import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar">
            <Link to='/'><h1 className="title_page">Tolala</h1></Link>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/blogs'>Blogs</Link>
                </li>
                <li>
                    <Link to='/login'>
                        <FontAwesomeIcon icon={faArrowRightToBracket} />
                    </Link>
                </li>
            </ul>
        </div>
    );
}
 
export default Navbar;
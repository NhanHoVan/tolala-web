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
                        
                    </Link>
                </li>
            </ul>
        </div>
    );
}
 
export default Navbar;
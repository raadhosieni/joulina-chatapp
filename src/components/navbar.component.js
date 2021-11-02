import logout from '../helpers/logout';
import { AuthContext } from '../App';
import { useContext, useEffect, useState } from 'react';

// Styles
import styles from '../styles/navbar.module.css';




const Navbar = ({ handleShowUsers }) => {
    const [ showMenu, setShowMenu ] = useState(false);
    
    const authContext = useContext(AuthContext);

    const username = authContext.user.username;

    function handleShowMenu() {
        setShowMenu(!showMenu);
    }

    return (
        <nav className={styles.navbar}>
            <h2 className={styles.logo}>Joulina App</h2>
            <div>
                <ul>
                    <li>
                        <h3 className={styles.username}>
                            {username}
                        </h3>
                    </li>
                    {username && <li>
                        <button 
                            className={styles.link}
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </li>}
                    <li className={styles.icon} onClick={handleShowMenu}>
                        <i className="fas fa-bars"></i>
                    </li>
                    {showMenu && 
                        <ul className={styles.menu}>
                            <li onClick={logout}>Logout</li>
                            <li onClick={handleShowUsers}>Users</li>
                        </ul>
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;
import { useEffect } from 'react';

// Styles 
import styles from '../styles/chatting_sidebar.module.css';

const ChattingSidebar = ({ room, users }) => {

    useEffect(() => {
        console.log(users);
    }, []);

    return (
        <div className={styles.chatting_side}>
            
            <div className={styles.room_name}>
                <h2>Room</h2>
                <h3 id="room-name">{room}</h3>
            </div>
            <div className={styles.users}>
                <h2>Users</h2>
                <ul id="users">
                    {users.map(user => (
                        <li key={user.id}>{user.username}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ChattingSidebar;
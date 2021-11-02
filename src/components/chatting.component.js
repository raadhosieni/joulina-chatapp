import React, { useState, useEffect, useContext } from "react";
import { socket, socketId } from "../socket";
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../App";
import Navbar from "./navbar.component";
import axios from 'axios';
import { rootUrl } from "../globals";

// Components
import ChattingSidebar from './chatting_sidebar.component';

// Utils
import moment from 'moment';

// Syles
import styles from '../styles/chatting.module.css';


const Chatting = ({ username, room, setRoom, users, setUsers, showUsers, setShowUsers }) => { 
    
    const [ message, setMessage ] = useState('');
    const [ messages, setMessages ] = useState([]);
    const history = useHistory();
    const authContext = useContext(AuthContext);

    useEffect(() => {
        if(authContext.login){// User logged in successfully

            socket.emit("joinRoom", {username, room});
            
            // Get all room messages from db
            axios.get(`${rootUrl}messages/${room}`)
                .then(res => setMessages(res.data));  

        }
        else // Invalid user redirect to login
            history.push("/");

        if(window.innerWidth > 778) {
            setShowUsers(true);
        }

        // Hide sidebar on small screens
        window.addEventListener('resize', () => {
            if(window.innerWidth < 778) {
                setShowUsers(false);
            } else {
                setShowUsers(true);
            }
        });

    }, []);

    useEffect(() => {
        const messagesContainer = document.getElementById('messages');
        
        socket.on("message", msg => {
            
            // Update messages array
            setMessages([...messages, msg]);
            
            if(msg.userId === socketId) {
                // Add new message to db
                axios.post(`${rootUrl}messages/add`, msg)
                    .then(res => console.log(res.data))
                    .catch(err => console.error(err));
            }
            
            // Scroll to new message
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        });

        socket.on('roomUsers', ({ room, users }) => {
            setRoom(room);
            setUsers(users);
        });

        return () => {
            socket.off('message');
        }

    }, [messages.length]);

    const onSubmit = (e) => {

        e.preventDefault();

        if (e.target.children.message.value) {
            // Send message to server
            socket.emit('chatMessage', message);
            e.target.children.message.value = '';
        }
    }

    const onChangeMessage = (e) => {
        setMessage(e.target.value);
    }

    return (         
            <div className={styles.chatting_container}>
                <main className={styles.chatting_main}>
                    <div className={styles.messages} id="messages">
                        { messages.map( (msg, index) => {
                            
                            return (    
                                <>
                                    {(new Date((messages[index - 1] || 0).date)).getDate() !== (new Date(messages[index].date)).getDate() 
                                    && 
                                    <div className={styles.date_splitter} key={(new Date(msg.date)).getTime() + 1}>{moment(msg.date).format("MMMM Do YYYY")}</div>}
                                    <Message message={msg}  key={(new Date(msg.date)).getTime()} username={username}/>
                                </>
                            )
                        })}
                    </div>
                    <form className={styles.chatting_form} onSubmit={onSubmit}>
                        <input
                            type="text"
                            id="message"
                            name="message"
                            className={styles.text_input}
                            autoComplete="off"
                            onChange={onChangeMessage}
                        />
                        <input
                            type="submit"
                            value="Send"
                            id="submit"
                            className={styles.btn}
                        />
                    </form>
                </main>
                {showUsers && <ChattingSidebar username={username} room={room} users={users} />}
            </div>
        
    )
}

const Message = ({ message, username }) => {
    return (
        <div className={message.username === username
            ?[styles.message, styles.left].join(' ')
            :[styles.message, styles.right].join(' ')}>
            <div className={styles.info}>
                <span className={styles.username}>
                    {message.username === username? 'You': message.username}
                </span>
                <span className={styles.timestamp}>
                    {moment(message.date).format('h:mm:ss a')}
                </span>
            </div>
            <div className={styles.text}>
                {message.text}
            </div>
        </div>
    )
}



export default Chatting;
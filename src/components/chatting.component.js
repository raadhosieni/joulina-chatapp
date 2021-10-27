import React, { useState, useEffect, useContext } from "react";
import { socket, socketId } from "../socket";
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../App";
import logout from '../helpers/logout';
import Navbar from "./navbar.component";
import axios from 'axios';
import { rootUrl } from "../globals";



const Chatting = ({ username, room, password, setRoom, login }) => { 
    
    const [ message, setMessage ] = useState('');
    const [ messages, setMessages ] = useState([]);
    const [ users, setUsers ] = useState([]);
    const history = useHistory();
    const authContext = useContext(AuthContext);

    useEffect(() => {
        if(authContext.login){// User logged in successfully
            socket.emit("joinRoom", {username, room});
        }
        else // Invalid user redirect to login
            history.push("/");

    }, []);

    useEffect(() => {
        const messagesContainer = document.getElementById('messages');
        
        socket.on("message", msg => {
            setMessages([...messages, msg]);
            if(msg.userId === socketId) {
                // Add message to db
                axios.post(`${rootUrl}messages/add`, msg)
                    .then(res => console.log(res.data))
                    .catch(err => console.log(err));
            }
            
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
            <div className="chatting-container">
                <main className="chatting-main">
                    <Navbar />
                    <div className="messages" id="messages">
                        { messages.map( msg => {
                            return <Message message={msg}  key={msg.time} />
                        })}
                    </div>
                    <form className="chatting-form" onSubmit={onSubmit}>
                    <input
                        type="text"
                        id="message"
                        name="message"
                        className="message-input"
                        autoComplete="off"
                        onChange={onChangeMessage}
                    />
                    <input
                        type="submit"
                        value="Send"
                        id="submit"
                        className="btn"
                    />
                </form>
                </main>
                <ChattingSide username={username} room={room} users={users} />
            </div>
        
    )
}

const Message = ({ message }) => {
    return (
        <div className={ message.userId === socketId? "message left": "message right"}>
            <div className="info">
                <span className="username">
                    {message.userId === socketId? 'You': message.username}
                </span>
                <span className="timestamp">
                    {message.time}
                </span>
            </div>
            <div className="text">
                {message.text}
            </div>
        </div>
    )
}

const ChattingSide = ({ username, room, users}) => {
    return (
        <div className="chatting-side">
            <div className="header">
                <h3 className="username">
                    {username}
                </h3>
                <span>
                    <button 
                        className="link"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </span>
            </div>
            <div className="room-name">
                <h2>Room Name</h2>
                <h3 id="room-name">{room}</h3>
            </div>
            <div className="users">
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

export default Chatting;
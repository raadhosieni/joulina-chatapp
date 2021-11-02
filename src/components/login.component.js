import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../App";
import Navbar from './navbar.component';
import { rootUrl } from '../globals';


const Login = ({ username, password, room, setUsername, setPassword, setRoom, setShowChatting, toggleLoginRegister, hideLoginRegister }) => {

    const [ rooms, setRooms ] = useState(['javascript', 'php', 'python', 'html']);
    const [ response, setResponse ] = useState('');

    const history = useHistory();

    const authContext = useContext(AuthContext);

    useEffect(() => {
        setRoom(rooms[0]);
    }, [])

    function onSubmit(e) {
        e.preventDefault();

        // Check authintication
        axios.post(`${rootUrl}auth/login`, {
            username, password
        })
        .then(res => { // Check server response
            if (res.data.login) { // login successfully
                console.log('login successfully');
                authContext.login = true;
                authContext.user = res.data.users[0];
                setShowChatting(true);
                hideLoginRegister();
            } else { // login failed
                setResponse(res.data.message);
            }
        })
        .catch(err => console.log(err));
        
    }

    return (    
        <>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        required
                        name="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        required
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="room">Room: </label>
                    <select 
                        name="room"
                        id="room"
                        onChange={(e) => {
                            setRoom(e.target.value);
                        }}
                        value={room}
                    >
                        {rooms.map(rm => (
                            <option 
                                value={rm} 
                                key={rm}
                            >
                                {rm.toLocaleUpperCase()}
                            </option>
                        ))}
                    </select>
                </div>
                {response && <div>{response}</div>}
                <div className="form-control">
                    <input 
                        type="submit"
                        value="Login"
                        id="login"
                        className="btn"
                    />
                    <button onClick={toggleLoginRegister} className="link" >Register</button> 
                           
                </div>
                
            </form>
            
        </>
        
    )
}

export default Login;
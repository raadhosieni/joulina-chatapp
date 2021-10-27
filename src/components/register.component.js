import { useState, useEffect } from "react";
import axios from 'axios';
import { rootUrl } from "../globals";

const Register = () => {
    const [ firstname, setFirstname ] = useState('');
    const [ lastname, setLastname ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ response, setResponse ] =useState('');

    function onChangeFirstname(e) {
        setFirstname(e.target.value);
    }

    function onChangeLastname(e) {
        setLastname(e.target.value);
    }

    function onChangeEmail(e) {
        setEmail(e.target.value);
    }

    function onChangeUsername(e) {
        setUsername(e.target.value);
    }

    function onChangePassword(e) {
        setPassword(e.target.value);
    }

    function onChangeConfirmPassword(e) {
        setConfirmPassword(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();

        const user = {firstname, lastname, email, username, password}

        if(password === confirmPassword) {
            // Send request to the server to register the user
            axios.post(`${rootUrl}auth/registery`, user)
                .then(res => setResponse(res.data))
                .catch(err => console.log(err));
        }
    }

    return (    
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="first-name">Firstname: </label>
                    <input
                        type="text"
                        required
                        name="first-name"
                        id="first-name"
                        value={firstname}
                        onChange={onChangeFirstname}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="last-name">Lastname: </label>
                    <input
                        type="text"
                        required
                        name="last-name"
                        id="last-name"
                        value={lastname}
                        onChange={onChangeLastname}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        required
                        name="email"
                        id="email"
                        value={email}
                        onChange={onChangeEmail}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        required
                        name="username"
                        id="username"
                        value={username}
                        onChange={onChangeUsername}
                    />
                    {response && <span>{response}</span>}
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        required
                        name="password"
                        id="password"
                        value={password}
                        onChange={onChangePassword}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="confirm-password">Confirm Password: </label>
                    <input
                        type="password"
                        required
                        name="confirm-password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={onChangeConfirmPassword}
                    />
                    {password !== confirmPassword? <span>passwords do not match</span> : ''}
                </div>
                
                <div className="form-control">
                    <input 
                        type="submit"
                        value="Register"
                        id="login"
                        className="btn"
                    />
                </div>
            </form>
        </div>
        
    )
}

export default Register;
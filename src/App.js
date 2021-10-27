import './App.css';
import React, { useState, useEffect } from 'react';

// Components
import Login from './components/login.component';
import Register from './components/register.component';
import Chatting from './components/chatting.component';
import { useContext } from 'react';

const user = {
  username: '',
  login: false
}

const AuthContext = React.createContext(user);

function App() {
  
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ room, setRoom ] = useState('');
  const [ showLogin, setShowLogin ] = useState(true);
  const [ showChatting, setShowChatting ] = useState(false);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const username = window.sessionStorage.getItem('username');
    
    if(username) {
      setUsername(username);
      setShowChatting(true);
      authContext.login = true;
    }
  }, []);

  function handleShowLogin() {
    setShowLogin(!showLogin);
  }

  return (
    
    <AuthContext.Provider value={user} className="App">

        { (!showChatting && showLogin) && (
          <div className="container">
            <Login 
              setUsername={setUsername} 
              setPassword={setPassword} 
              setRoom={setRoom} 
              username={username}
              password={password}
              room={room}
              setShowChatting={setShowChatting}
            />
            <button onClick={handleShowLogin} className="link" >Register</button>
          </div>
        )}
        
        {showLogin || (
          <div className="container">
            <Register />
            <button onClick={handleShowLogin} className="link" >Login</button>
          </div>
        ) }

        {showChatting && (
            <Chatting 
              username={username}
              room={room}
              password={password}
              setRoom={setRoom}
          />
        )}
    </AuthContext.Provider>
    
  );
}

export default App;
export { AuthContext };

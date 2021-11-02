import React, { useState, useEffect, useContext } from 'react';

// Components
import Login from './components/login.component';
import Register from './components/register.component';
import Chatting from './components/chatting.component';
import ChattingSidebar from './components/chatting_sidebar.component';
import Navbar from './components/navbar.component';

const auth = {
  user: {},
  login: false
}

const AuthContext = React.createContext(auth);

function App() {
  
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ room, setRoom ] = useState('');
  const [ showLogin, setShowLogin ] = useState(true);
  const [ showRegister, setShowRegister ] = useState(false);
  const [ showChatting, setShowChatting ] = useState(false);
  const [ showUsers, setShowUsers ] = useState(false);
  const [ users, setUsers ] = useState([]);
  
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const username = window.sessionStorage.getItem('username');
    
    if(username) {
      setUsername(username);
      setShowChatting(true);
      setShowLogin(false);
      authContext.login = true;
    }
  }, []);

  function toggleLoginRegister() {
    setShowLogin(!showLogin);
    setShowRegister(!showRegister);
  }

  function hideLoginRegister() {
    setShowLogin(false);
    setShowRegister(false);
    console.log('hide');
  }

  function handleShowUsers() {
      setShowUsers(!showUsers);
  }

  return (
    
    <AuthContext.Provider value={auth} >
        <div className="container">
        <Navbar handleShowUsers={handleShowUsers} />
        { showLogin && (
          
            <Login 
              setUsername={setUsername} 
              setPassword={setPassword} 
              setRoom={setRoom} 
              username={username}
              password={password}
              room={room}
              setShowChatting={setShowChatting}
              toggleLoginRegister={toggleLoginRegister}
              hideLoginRegister={hideLoginRegister}
            />
          
        )}
        
        {showRegister && (
          
            <Register 
              toggleLoginRegister={toggleLoginRegister}
            />
          
        ) }

        {showChatting && (
            <Chatting 
              username={username}
              room={room}
              password={password}
              setRoom={setRoom}
              showUsers={showUsers}
              users={users}
              setUsers={setUsers}
              setShowUsers={setShowUsers}
            />       
        )}
        
        </div>
    </AuthContext.Provider>
    
  );
}

export default App;
export { AuthContext };

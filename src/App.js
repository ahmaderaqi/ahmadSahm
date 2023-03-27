import logo from './logo.svg';
import './App.css';
import Donations from './component/Donations';
import 'bootstrap/dist/css/bootstrap.min.css';
import Switch from './component/Switch';
import LoginButton from './LogIn/LogIn';
import LogoutButton from './LogIn/LogOut';
import Profile from './LogIn/Profile';



function App() {
  return (
    <>
      
      <main>
        <h1>Auth0 Login</h1>
        <LoginButton/>
        <LogoutButton/>
        <Profile/>
        <Donations/>
        {/* <Switch/> */}
      </main>

    </>
  );
}

export default App;

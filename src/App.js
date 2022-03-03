import { useEffect } from 'react';
import './App.css';
import SideBar from './components/SideBar';
import Title from './components/Title';
import CallForLoginOrHandleRedirect from './config/azure-ad/settings';
import axiosClient from './config/axios';
import Cedula from './components/Cedula';

function App() {
  useEffect(() => {
    (async function mounted(){
      await CallForLoginOrHandleRedirect(onLoggedIn);
    })();
  }, []);

  const onLoggedIn = async (tokenResponse) => {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.accessToken}`;
    console.log(tokenResponse);
    localStorage.setItem("token", tokenResponse.accessToken);
    localStorage.setItem("username", tokenResponse.account.username);
  };

  return (
    <div className="App">
      <Cedula />
    </div>
  );
}

export default App;

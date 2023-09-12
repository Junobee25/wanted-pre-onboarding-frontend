import {Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function Home() {
  return (
    <div>
      <div>로그인</div>
      <div>회원가입</div>
      <div>투두 리스트</div>
    </div>
  )
}

function App() {
  return (
    <div className='App'>
    <Routes>
      <Route path='/' element = {<Home/>}/>
      <Route path="/signin" element={<LoginPage/>}/>
      <Route path="/signup" element={<RegisterPage/>}/>
    </Routes>
    </div>

  );
}

export default App;

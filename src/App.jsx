import {Routes, Route} from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TodoPage from './pages/TodoPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button ,Row,Col} from 'react-bootstrap';

function Home() {
  return (
    <div style={{position:'relative', marginTop:'100px'}}>
      <Row style={{display:"flex", flexDirection:'column'}}>
        <Col style={{margin:'5px'}}><Button href='/signin'>로그인</Button></Col>
        <Col style={{margin:'5px'}}><Button href='/signup'>회원가입</Button></Col>
        <Col style={{margin:'5px'}}><Button href='/todo'>투두리스트</Button></Col>
      </Row>
    </div>

  )
}

function App() {
  return (
    <div className='App'>
    <Routes>
      <Route path='/' element = {<Home/>}/>
      <Route path="/signin" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/todo" element={<TodoPage />}/>
    </Routes>
    </div>

  );
}

export default App;

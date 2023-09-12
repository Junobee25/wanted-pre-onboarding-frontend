import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // 에러메세지 -> 처음 상태 => 빈값 
    // 이메일, 비밀번호 마다 => 에러메세지 렌더링 필요할 듯
    // const [emailerror, setEmailError] = useState("");
    // const [passworderror, setPasswordError] = useState("");


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // 유효성 검사 변수
    let checkValid = true


    // 유효성 확인 => disable => false
    if (email.includes("@") && password.length>=8) {
        checkValid = false
    }

    const handleOnClickEvent = function() {
        navigate('/signin');
    };


    return (
    <div>
        EMAIL : <input data-testid="email-input" value={email} onChange={handleEmailChange}/>
        PASSWORD : <input data-testid="password-input" type="password" value={password} onChange={handlePasswordChange}/>
        <button data-testid="signin-button" onClick={handleOnClickEvent} disabled={checkValid}>로그인</button>

        
    </div>
    )
}


export default LoginPage;
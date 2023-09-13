import React, {useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
    const navigate = useNavigate();
    const jwtToken = localStorage.getItem('jwtToken');
    useEffect(() => {

        if (!jwtToken) {
            navigate('/signin');
        }
        else{
            navigate('/todo')
        }
    }, [jwtToken,navigate]); // 빈 배열을 전달하여 컴포넌트가 마운트된 후에 한 번만 실행
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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

    // state 처음에 "" 값이므로 값을 바꿔줘야 함
    // 그리고 외부 api로 호출해야함
    // 자동완성 된걸로 회원가입하면 400 오류
    // 페이지에서 1초정도 기다렸다가 바꾸고 회원가입해야지 400안뜸
    const handleSignInClick = async () => {
        console.log(email,password)
        // 회원가입 데이터
        try {
        const signupData = {
            email: email, // 이메일 값 입력
            password: password,      // 비밀번호 값 입력
        };
        console.log(signupData)

        const response = await axios.post('https://www.pre-onboarding-selection-task.shop/auth/signup/',
        signupData, { headers: {'Content-Type':'application/json'}});

        if (response.status){
            console.log("회원가입 성공")
            navigate('/signin')
        } else {
            console.log("회원가입 실패")
        }
        } catch (error) {
        console.log(error)
        }
    }
    return (
    <div>
        EMAIL : <input data-testid="email-input" value={email} onChange={handleEmailChange}/>
        PASSWORD : <input data-testid="password-input" type="password" value={password} onChange={handlePasswordChange}/>
        <button data-testid="signup-button" onClick={handleSignInClick} disabled={checkValid}>회원가입</button>        
    </div>
        )
    }


export default RegisterPage;
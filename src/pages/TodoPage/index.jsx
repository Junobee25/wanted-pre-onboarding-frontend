import React, {useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TodoPage() {
    const navigate = useNavigate();
    const jwtToken = localStorage.getItem('jwtToken');
    useEffect(() => {

        if (!jwtToken) {
            navigate('/signin');
        }
    }, [jwtToken,navigate]); // 빈 배열을 전달하여 컴포넌트가 마운트된 후에 한 번만 실행

    return (
    <div>
        <li>
            <label>
                <input type="checkbox" />
                <span>TODO 1</span>
            </label>
        </li>
        <li>
            <label>
                <input type="checkbox" />
                <span>TODO 2</span>
            </label>
        </li>
    </div>
    )
}


export default TodoPage;
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

    const [todos, setTodos] = useState([]); // Todo 목록을 저장하는 상태
    const [newTodoText, setNewTodoText] = useState(""); // 새로운 Todo의 텍스트를 저장하는 상태
    const [editingTodoId, setEditingTodoId] = useState(null); // 수정 중인 Todo의 ID를 저장하는 상태
    const [editingTodoText, setEditingTodoText] = useState(""); // 수정 중인 Todo의 텍스트를 저장하는 상태
    
       useEffect(() => {
        // Todo 목록을 가져오는 API 호출
        axios
            .get("https://www.pre-onboarding-selection-task.shop/todos", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                },
            })
            .then((response) => {
                setTodos(response.data); // API 응답에서 Todo 목록을 가져와 상태 업데이트
            })
            .catch((error) => {
                console.error("Todo 목록 가져오기 오류:", error);
            });
    }, []); // 컴포넌트가 마운트될 때만 실행

    const handleCheckboxChange = (e, todoId) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === todoId
                ? { ...todo, isCompleted: e.target.checked }
                : todo
        );
        setTodos(updatedTodos);
        console.log(updatedTodos)
    
        // API 호출을 사용하여 서버에 체크박스 상태를 업데이트할 수도 있습니다.
        // 예: updateTodoAPI(todoId, e.target.checked);
    };

    const handleAddTodo = () => {
        // 새로운 Todo를 추가하는 API 호출
        console.log(newTodoText)
        axios
            .post(
                "https://www.pre-onboarding-selection-task.shop/todos",
                { todo: newTodoText },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "jwtToken"
                        )}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                setNewTodoText(""); // 입력 필드 초기화
                console.log(response.data)
                setTodos([...todos, response.data]); // 새로운 Todo를 목록에 추가
            })
            .catch((error) => {
                console.error("Todo 추가 오류:", error);
            });
    };

    const handleEditClick = (todo) => {
        setEditingTodoId(todo.id);
        setEditingTodoText(todo.todo);
    };

    const handleCancelEdit = () => {
        setEditingTodoId(null);
        setEditingTodoText("");
    };

    const handleSaveEdit = () => {
        console.log(editingTodoId)
        
        // 수정 중인 Todo를 업데이트하는 API 호출
        axios
            .put(
                `https://www.pre-onboarding-selection-task.shop/todos/${editingTodoId}`,
                { todo: editingTodoText ,isCompleted : true},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "jwtToken"
                        )}`,
                        "Content-Type": "application/json",
                    },
                }
            )

            .then((response) => {
                // 수정 중인 Todo의 내용과 상태 업데이트
                const updatedTodos = todos.map((todo) =>
                    todo.id === editingTodoId
                        ? { ...todo, todo: editingTodoText }
                        : todo
                );
                setTodos(updatedTodos);
                // 수정 상태 초기화
                setEditingTodoId(null);
                setEditingTodoText("");
            })
            .catch((error) => {
                console.error("Todo 수정 오류:", error);
            });
    };

    const handleDeleteTodo = (todoId) => {
        // DELETE 요청을 보내서 Todo 삭제
        axios
          .delete(`https://www.pre-onboarding-selection-task.shop/todos/${todoId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          })
          .then((response) => {
            // Todo 목록에서 삭제
            const updatedTodos = todos.filter((todo) => todo.id !== todoId);
            setTodos(updatedTodos);
          })
          .catch((error) => {
            console.error("Todo 삭제 오류:", error);
          });
      };

    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            <div>
            <input type="text" data-testid="new-todo-input" value={newTodoText} onChange={(e) => setNewTodoText(e.target.value)}/>
            <button data-testid="new-todo-add-button" onClick={handleAddTodo}>추가</button>
            </div>
            <div style={{display:"flex", justifyContent:"center", marginTop:"10px"}}>
            <ul> {todos.map((todo) => (
                    <li key={todo.id}>
                        {editingTodoId === todo.id ? (
                            <>
                                <input
                                    data-testid="modify-input"
                                    type="text"
                                    value={editingTodoText}
                                    onChange={(e) =>
                                        setEditingTodoText(e.target.value)
                                    }
                                />
                                <button
                                    data-testid="submit-button"
                                    onClick={handleSaveEdit}
                                >
                                    제출
                                </button>
                                <button
                                    data-testid="cancel-button"
                                    onClick={handleCancelEdit}
                                >
                                    취소
                                </button>
                            </>
                        ) : (
                            <>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={todo.isCompleted}
                                        onChange={(e) => handleCheckboxChange(e, todo.id)} // handleCheckboxChange 함수 호출
                                    />
                                    <span>{todo.todo}</span>
                                </label>
                                <button
                                    onClick={() => handleEditClick(todo)}
                                >
                                    수정
                                </button>
                                <button onClick={() => handleDeleteTodo(todo.id)}>삭제</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
}

export default TodoPage;
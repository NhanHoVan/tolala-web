import React, { useState } from "react";
import './login.css';

const Login = () => {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const users = [
        {
            id: 0,
            username: "user1",
            password: "pass1"
        },
        {   
            id: 1,
            username: "user2",
            password: "pass2"
        }
    ];

    const errors = {
        uname: "Tên đăng nhập không đúng.",
        pass: "Mật khẩu không đúng."
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        var { uname, pass } = document.forms[0];

        const userData = users.find((user) => user.username === uname.value);

        if (userData) {
            if (userData.password !== pass.value) {
                setErrorMessages({ name: "pass", message: errors.pass });
            } else {
                setIsSubmitted(true);
            }
        } else {
        setErrorMessages({ name: "uname", message: errors.uname });
        }
    };

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
        <div className="error">{errorMessages.message}</div>
        );

    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input_container">
                    <label>Tên người dùng: </label>
                    <input type="text" name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input_container">
                    <label>Mật khẩu: </label>
                    <input type="password" name="pass" required />
                    {renderErrorMessage("pass")}
                </div>
                <div className="button_container">
                    <input type="submit" value={"Đăng nhập"}/>
                </div>
            </form>
        </div>
    );

    return (
        <div className="bgr_login">
            <div className="form_login">
                {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
            </div>
        </div>
    );
}
 
export default Login;
import React, { useState } from "react";
import { setUserSession } from '../utils/Common';
import axios from 'axios';
import './login.css';

const Login = (props) => {
    const username = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // const users = [
    //     {
    //         id: 0,
    //         username: "user1",
    //         password: "pass1"
    //     },
    //     {
    //         id: 1,
    //         username: "user2",
    //         password: "pass2"
    //     }
    // ];

    // const errors = {
    //     uname: "Tên đăng nhập không đúng.",
    //     pass: "Mật khẩu không đúng."
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     var { uname, pass } = document.forms[0];

    //     const userData = users.find((user) => user.username === uname.value);

    //     if (userData) {
    //         if (userData.password !== pass.value) {
    //             setError({ name: "pass", message: errors.pass });
    //         } else {
    //             setIsSubmitted(true);
    //         }
    //     } else {
    //     setError({ name: "uname", message: errors.uname });
    //     }
    // };

    // const renderError = (name) =>
    //     name === error.name && (
    //     <div className="error">{error.message}</div>
    //     );
    // handle button click of login form
    const handleSubmit = () => {
        setError(null);
        setLoading(true);

        const data = {
            username: username.value,
            password: password.value
        };

        axios.post('http://localhost:4000/users/signin', data)
        .then(response => {
            setLoading(false);
            setUserSession(response.data.token, response.data.user);
            props.history.push('/');
        }).catch(error => {
            setLoading(false);
            if (error.response.status === 401) setError(error.response.data.message);
            else setError("Something went wrong. Please try again later.");
        });
    }

    return (
        <div className="bgr_login">
            <div className="form_login">
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <div className="input_container">
                            <label>Tên đăng nhập: </label>
                            <input type="text" {...username} autoComplete="new-password" required />
                            {/* {renderError("uname")} */}
                        </div>
                        <div className="input_container">
                            <label>Mật khẩu: </label>
                            <input type="password" {...password} autoComplete="new-password" required />
                            {/* {renderError("pass")} */}
                        </div>
                        <div className="button_container">
                            <input type="submit" value={loading ? "Loading...": "Đăng nhập"} disabled={loading}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);
   
    const handleChange = e => {
      setValue(e.target.value);
    }
    return {
      value,
      onChange: handleChange
    }
  }
 
export default Login;
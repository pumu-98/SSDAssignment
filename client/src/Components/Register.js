import React, { useState, useRef, useEffect } from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';
import login from '../img/login3.jpg';

const Register = props => {
    const [user, setUser] = useState({ username: "", password: "", role: "" });
    const [message, setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timerID);
        }
    }, []);

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const resetForm = () => {
        setUser({ username: "", password: "", role: "" });
    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.register(user).then(data => {
            const { message } = data;
            setMessage(message);
            resetForm();
            if (!message.msgError) {
                timerID = setTimeout(() => {
                    props.history.push('/');
                }, 2000)
            }
        });
    }



    return (
        <div>


            <div class="row">

                <div class="column">
                    
                    <img src={login} alt="BigCo Inc. logo" style={{ marginBottom: '20px', marginTop: '20px' }} />

                </div>
                <div class="column"> 
                <form onSubmit={onSubmit} style={{
                    border: '2px solid #D3D3D3 ',
                    marginRight: '100px', width: '400px', paddingTop: '30px', height: '500px',
                    paddingBottom: '50px', borderRadius: '10px'
                }} >
                    <h4 style={{ marginLeft: '70px', marginTop: '30px', marginBottom: '60px' }}>Add Worker or Manager</h4>
                    {/* <label htmlFor="username" className="sr-only">Username: </label> */}
                    <input type="text"
                        name="username"
                        value={user.username}
                        onChange={onChange}
                        className="form-control"
                        placeholder="Enter Username"
                        style={{ width: '300px', marginLeft: '50px', marginTop: '20px' }} />
                    {/* <label htmlFor="password" className="sr-only">Password: </label> */}
                    <input type="password"
                        name="password"
                        value={user.password}
                        onChange={onChange}
                        className="form-control"
                        placeholder="Enter Password"
                        style={{ width: '300px', marginLeft: '50px', marginTop: '20px' }} />
                    {/* <label htmlFor="role" className="sr-only">Role: </label> */}
                    <input type="text"
                        name="role"
                        value={user.role}
                        onChange={onChange}
                        className="form-control"
                        placeholder="Enter role (worker/manager)"
                        style={{ width: '300px', marginLeft: '50px', marginTop: '20px' }} />
                    <button className="btn btn-dark btn-block"
                        type="submit" style={{ width: '300px', marginTop: '50px', marginLeft: '50px' }}>Submit</button>
                </form></div>
            </div>


            {message ? <Message message={message} style={{ marginTop: '30px' }}/> : null}
        </div>
    )
}

export default Register;
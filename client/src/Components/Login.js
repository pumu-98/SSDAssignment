import React, { useState, useContext } from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';
import { AuthContext } from '../Context/AuthContext';
import login from '../img/login4.png';

const Login = props => {
    const [user, setUser] = useState({ username: "", password: "" });
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.login(user).then(data => {
            console.log(data);
            const { isAuthenticated, user, message } = data;
            if (isAuthenticated) {
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push('/todos');
            }
            else
                setMessage(message);
        });
    }



    return (
        <div>


            <div class="row">
                <div class="column"><form onSubmit={onSubmit} style={{
                    border: '2px solid #D3D3D3 ',
                    marginLeft: '100px', width: '400px', paddingTop: '30px', height: '430px',
                    paddingBottom: '50px', borderRadius: '10px', marginTop: '20px',
                }} >
                    <h3 style={{ marginLeft: '150px', marginTop: '30px' }}>Login</h3>
                    {/* <label htmlFor="username" className="sr-only" style={{ marginTop: '50px', marginLeft : '50px'}}>Username: </label> */}
                    <input type="text"
                        name="username"
                        onChange={onChange}
                        className="form-control"
                        placeholder="Enter Username"
                        style={{ width: '300px', marginTop: '40px', marginLeft: '50px' }} />
                    {/* <label htmlFor="password" className="sr-only">Password: </label> */}
                    <input type="password"
                        name="password"
                        onChange={onChange}
                        className="form-control"
                        placeholder="Enter Password"
                        style={{ width: '300px', marginLeft: '50px', marginTop: '20px' }} />
                    <button className="btn btn-dark btn-block"
                        type="submit" style={{ width: '300px', marginTop: '50px', marginLeft: '50px' }}>Log in </button>
                </form>
                </div>
                <div class="column">

                <img src={login} alt="BigCo Inc. logo" style={{ marginBottom : '20px', marginTop : '20px'}}/>
                </div>



            </div>
            
            {message ? <Message message={message} style={{ marginTop: '30px' }}/> : null}
        </div>
    )
}

export default Login;
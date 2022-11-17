import React from 'react';
import home from '../img/home.gif';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

const AdminLogin = () => (
    <div>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value="admin@gmail.com" disabled/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value="admin123" disabled />
            </Form.Group>

            <Button variant="dark" type="submit">
                <Link to="/register" style={{ color: 'white' }}>
                    Submit
                </Link>
            </Button>
        </Form>

        
    </div>
)

export default AdminLogin;
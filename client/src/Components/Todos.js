import React, { useState, useContext, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoService from '../Services/TodoService';
import Message from './Message';
import { AuthContext } from '../Context/AuthContext';

import Container from '@material-ui/core/Container';
import axios from 'axios';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import upload from '../img/upload.png';

const useStyles = makeStyles(theme => createStyles({
    root: {
        padding: '50px 0',
    },
    container: {
        margin: 'auto'
    },
    containerUpload: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: '250px',
        width: '900px',
        backgroundColor: 'white',
        borderRadius: '10px',
        border: '2px solid #D3D3D3',
        '& h3': {
            color: 'black',
        },
        '& i': {
            color: 'white',
            padding: '10px 0'
        },
        '& label': {
            backgroundColor: '#009933',
            color: 'white',
            borderRadius: '5px',
            padding: '5px 20px'
        },
        '& label:hover': {
            backgroundColor: '#00b33c',
            cursor: 'pointer'
        },
        '& label:active': {
            backgroundColor: 'white',
        },
        '& label input': {
            overflow: 'hidden',
            width: '0'
        }
    },
    containerUploadHover: {
        backgroundColor: '#0059b3',
    },
    containerGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        '& img': {
            width: '200px',
            height: '150px',
            margin: '15px 20px 15px 0',
            borderRadius: '3px'
        }
    },
}));

const Todos = props => {
    const [todo, setTodo] = useState({ name: "" });
    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const classes = useStyles();

    const { user } = useContext(AuthContext);

    useEffect(() => {
        TodoService.getTodos().then(data => {
            setTodos(data.todos);
        });
    }, []);

    const onSubmit = e => {
        e.preventDefault();
        TodoService.postTodo(todo).then(data => {
            const { message } = data;
            resetForm();
            if (!message.msgError) {
                TodoService.getTodos().then(getData => {
                    setTodos(getData.todos);
                    setMessage(message);
                });
            }
            else if (message.msgBody === "UnAuthorized") {
                setMessage(message);
                authContext.setUser({ username: "", role: "" });
                authContext.setIsAuthenticated(false);
            }
            else {
                setMessage(message);
            }
        });
    }

    const onChange = e => {
        setTodo({ name: e.target.value });
    }

    const resetForm = () => {
        setTodo({ name: "" });
    }


    const [avatars, setAvatars] = useState([]);
    const [isDragOver, setDragOver] = useState(false);




    const handleSubmit = file => {

        const encodeImage = (mimetype, arrayBuffer) => {
            let u8 = new Uint8Array(arrayBuffer)
            const b64encoded = btoa([].reduce.call(new Uint8Array(arrayBuffer), function (p, c) { return p + String.fromCharCode(c) }, ''))
            return "data:" + mimetype + ";base64," + b64encoded;
        }

        const uploadImage = async () => {
            const data = new FormData();
            data.append('file', file);
            data.append('filename', file.name);

            // POST request
            const result = await axios.post('http://localhost:3000/upload', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // console.log(result);
            const dataURL = encodeImage(result.data.mimetype, result.data.buffer.data);
            // console.log(dataURL);
            setAvatars([...avatars, { name: result.data.name, url: dataURL }]);
        }

        uploadImage();
    };

    const handleDragOver = evt => {
        evt.stopPropagation();
        evt.preventDefault();

        setDragOver(true);
    };

    const handleDrop = evt => {
        evt.stopPropagation();
        evt.preventDefault();

        setDragOver(false);

        const file = evt.dataTransfer.files[0];
        handleSubmit(file);
    };




    return (
        <div>
            <ul className="list-group">
                {
                    todos.map(todo => {
                        return <TodoItem key={todo._id} todo={todo} />
                    })
                }
            </ul>
            <br />
            <form onSubmit={onSubmit} style={{
                border: '2px solid #D3D3D3 ',
                margin: 'auto', width: '900px', paddingTop: '30px',
                paddingBottom: '50px', borderRadius: '10px'
            }} >

                <label htmlFor="todo" style={{ fontSize: 20, marginLeft: '35px' }}>Enter Todo</label>

                <div class="row">
                    <div class="column">
                        <input type="text"
                            name="todo"
                            value={todo.name}
                            onChange={onChange}
                            className="form-control"
                            placeholder="Please Enter Todo"
                            style={{ width: '600px', marginLeft: '50px' }}
                        /> </div>

                    <div class="column"><button className="btn btn-success"
                        type="submit" style={{ width: '200px', marginLeft: '20px' }}>Submit</button></div>
                </div>

                {/* <input type="text"
                    name="todo"
                    value={todo.name}
                    onChange={onChange}
                    className="form-control"
                    placeholder="Please Enter Todo" />
                <button className="btn  btn-dark" style={{ marginTop: '30px' }}
                    type="submit">Submit</button> */}
            </form>
            {message ? <Message message={message} /> : null}


            <div>
                {
                    user.role === "manager" ?
                        <div>
                            <Container maxWidth="lg" className={classes.root}>
                                <section id="image-upload"
                                    className={`${classes.container} ${classes.containerUpload} ${isDragOver ? classes.containerUploadHover : ''}`}
                                    onDragOver={evt => handleDragOver(evt)}
                                    onDrop={handleDrop}>
                                    <img src={upload} alt="BigCo Inc. logo" style={{ marginBottom: '20px', marginTop: '20px' }} />
                                    <label>
                                        <input type="file" name="avatar" onChange={e => handleSubmit(e.target.files[0])} />
                                        Choose file to upload
                                    </label>
                                    <h4 style={{ color: '#404040', marginTop: '10px', marginBottom: '40px' }}>or drag and drop them here</h4>
                                </section>

                                <section id="image-grid" className={`${classes.container}`} style={{ marginLeft: '135px', marginTop: '40px', color: '#404040' }}>
                                    <h3>Uploads</h3>
                                    <div className={`${classes.containerGrid}`}>
                                        {avatars.map((avatar, idx) => <img key={`${avatar.name}-${idx}`} src={avatar.url} />)}
                                    </div>
                                </section>
                            </Container>



                        </div> : null

                }
            </div>

        </div>
    );

}

export default Todos;
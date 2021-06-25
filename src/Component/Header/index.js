import { Button, Card, FormGroup, Input, makeStyles, Modal } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { PostList } from '../../Context';
import { auth } from '../../Firebase';
const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        height: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));
function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

function Header() {
    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);
    const { email, setEmail, password, setPassword, userName, setUserName, user, address, setAddress } = useContext(PostList)

    console.log(userName, "userName")
    const handleOpen = () => {
        setOpen(true);
    };
    const handleOpenSignIn = () => {
        setOpenSignIn(true);
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        let err = false;
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return (authUser.user.updateProfile({
                    displayName: userName,
                    displayAddress: address,
                }));
            })
            .catch((error) => {
                alert(error.message);
                err = true;
            })
        console.log(email, password, "signup");
        setTimeout(() => {
            if (err) {
                console.log("object")
            } else {
                setEmail('')
                setPassword('')
                setOpen(false)
                setUserName('')

            }
        }, 500)
    }
    const handleSignIn = (e) => {
        e.preventDefault();
        let err = false;
        auth.signInWithEmailAndPassword(email, password)
            .catch(error => {
                alert(error.message);
                err = true;
                console.log(err, "er1")
            })
        console.log(err, "error")
        setTimeout(() => {
            if (err) {
                console.log("object")
            } else {
                setUserName('')
                setEmail('')
                setPassword('')
                setOpenSignIn(false)

            }
        }, 500)
    }
    return (
        <Card className="header">

            <img id="logo" src="https://lh4.googleusercontent.com/proxy/vv83F0q4eBmqw8d1el59y8MgLPIC6TyBag3Kb5BK9nc_uRoMXJhMVyiLQKYSZI2XFhzEZ7cE3WQCagFbIp7oH43ssuWqVZONGHm-vy0dGrq3FA=s0-d" alt="logo" />
            <FormGroup className="group__button">
                <div>
                    <Modal
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <form onSubmit={handleSignUp}>
                                <center>
                                    <img id="logo" src="https://lh4.googleusercontent.com/proxy/vv83F0q4eBmqw8d1el59y8MgLPIC6TyBag3Kb5BK9nc_uRoMXJhMVyiLQKYSZI2XFhzEZ7cE3WQCagFbIp7oH43ssuWqVZONGHm-vy0dGrq3FA=s0-d" alt="logo" />
                                    <Input
                                        style={{ margin: "1.5rem", display: 'block' }}
                                        placeholder="email"
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Input
                                        style={{ margin: "1.5rem", display: 'block' }}
                                        placeholder="userName"
                                        type="text"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />

                                    <Input
                                        style={{ margin: "1.5rem", display: 'block' }}
                                        placeholder="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Button type="submit" variant="contained" color="secondary" onClick={handleSignUp}>Sig up</Button>
                                </center>

                            </form>

                        </div>
                    </Modal>
                    <Modal
                        open={openSignIn}
                        onClose={() => setOpenSignIn(false)}

                    >
                        <div style={modalStyle} className={classes.paper}>
                            <form onSubmit={handleSignIn}>
                                <center>
                                    <img id="logo" src="https://lh4.googleusercontent.com/proxy/vv83F0q4eBmqw8d1el59y8MgLPIC6TyBag3Kb5BK9nc_uRoMXJhMVyiLQKYSZI2XFhzEZ7cE3WQCagFbIp7oH43ssuWqVZONGHm-vy0dGrq3FA=s0-d" alt="logo" />
                                    <Input
                                        style={{ margin: "1.5rem", display: 'block' }}
                                        placeholder="email"
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                    <Input
                                        style={{ margin: "1.5rem", display: 'block' }}
                                        placeholder="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Button type="submit" variant="contained" color="secondary" onClick={handleSignIn}>Sign in</Button>
                                </center>

                            </form>

                        </div>
                    </Modal>
                </div>

                {user ? (<Button variant="contained" onClick={() => auth.signOut()}>LogOut</Button>) :
                    (
                        <div className="form__loginContainer">
                            <Button variant="contained" onClick={handleOpen}>Sig up</Button>
                            <Button variant="contained" onClick={handleOpenSignIn}>Sig In</Button>
                        </div>
                    )}

            </FormGroup>


        </Card>
    )
}

export default Header

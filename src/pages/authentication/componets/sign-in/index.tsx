import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { auth, createUserDocumentFromAuth, signInWithGooglePopup, } from "../../../../service/firebase/firebase";
import { login } from "../../../../store/auth/auth";
import Button from "../../../../components/button";
import './style.scss'


function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const SignWithEmailPassword = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(
                    login({
                        email: user.email,
                        uid: user.uid,
                        userName: user.displayName,
                        image: user.photoURL,
                        favorites: [],
                        isLogged: true
                    })
                );
            })
            .catch((err) => {
                alert(err);
            });
    };

    const SignWithGoolge = async (e) => {
        e.preventDefault();

        await signInWithGooglePopup()
            .then(({ user }) => {
                dispatch(
                    login({
                        email: user.email,
                        uid: user.uid,
                        userName: user.displayName,
                        image: user.photoURL,
                        favorites: [],
                        isLogged: true
                    })
                );
                createUserDocumentFromAuth(user, { favorites: [] })
            })
            .catch((err) => {
                alert(err);
            });;
    }

    return (
        <form action="" className="sign-in">
            <h2 className="sign-in__title mb-2">Alredy have an account?</h2>
            <span>Sign in With your email and password</span>

            <div className="input-box mb-2">
                <input className="input" type="email" value={email} onChange={(e) => handleEmail(e)} />
                <input className="input" type="password" name="password" value={password} onChange={(e) => handlePassword(e)} />
            </div>

            <div className="sign-in__btns">
                <Button onClick={(e) => SignWithEmailPassword(e)}>
                    Sign in
                </Button>

                <Button onClick={(e) => SignWithGoolge(e)}>
                    Sign with Google
                </Button>
            </div>
        </form>
    );
}

export default SignIn;

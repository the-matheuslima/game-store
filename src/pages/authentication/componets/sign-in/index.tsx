import React, { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, createUserDocumentFromAuth, signInWithGooglePopup, } from "../../../../service/firebase/firebase";

import { useDispatch } from "react-redux";
import { login } from "../../../../store/auth/auth";
import Button from "../../../../components/button";

import './style.scss'

function SignIn() {

    const defaultFormFields = {
        email: '',
        password: '',
    }

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const dispatch = useDispatch();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
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
                <input className="input" type="email" name="email" placeholder="Email" value={email} onChange={handleChange} />
                <input className="input" type="password" name="password" placeholder="Password" value={password} onChange={handleChange} />
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

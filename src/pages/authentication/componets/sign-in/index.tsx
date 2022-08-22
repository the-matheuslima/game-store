import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { createUserDocumentFromAuth, signInWithGooglePopup, signWithPasswordAndEmail } from "../../../../store/auth/auth";
import Button from "../../../../components/button";

import { AppDispatch, RootState } from "../../../../store/store";

import './style.scss'

function SignIn() {
    const defaultFormFields = {
        email: '',
        password: '',
    }

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector((state: RootState) => state.auth.user);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    const SignWithEmailPassword = (e) => {
        e.preventDefault();
        dispatch(signWithPasswordAndEmail({ email, password }))
    };

    const SignWithGoolge = async (e) => {
        e.preventDefault();
        dispatch(signInWithGooglePopup())
            .then(({ payload }: any) => {
                console.log(payload);

                const { displayName, email, uid, photoURL } = payload;

                const authenticatedUser = {
                    uid: uid,
                    email: email,
                    displayName: displayName,
                    photoURL: photoURL,
                    favorites: [],
                    isLogged: true,
                };

                dispatch(createUserDocumentFromAuth(authenticatedUser))
            })
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

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth, createUserDocumentFromAuth, createUserWithEmailAndPassword } from "../../../../service/firebase/firebase";
import { login } from "../../../../store/auth/auth";

import './style.scss'

type Props = {};

function SignUp({ }: Props) {
    const defaultFormFields = {
        displayName: '',
        email: '',
        password: '',
        image: '',
    }

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password } = formFields;
    const dispatch = useDispatch();


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userAuth) => {
                dispatch(
                    login({
                        uid: userAuth.user.uid,
                        email: userAuth.user.email,
                        userName: userAuth.user.displayName,
                        image: '',
                        favorites: [],
                        isLogged: true
                    })
                )
                createUserDocumentFromAuth(userAuth.user, { favorites: [] })
            })
            .catch((error) => {

                alert(error);
            });
    }

    return (
        <section className="sign-up mb-2">
            <h2 className="sign-up__title">Dont't have an account?</h2>
            <p>Sign up With your email and password</p>

            <form onSubmit={(event) => { handleSubmit(event) }} className='sign-up__form'>
                <div className="input-box">
                    <input className="input" type="text" name="displayName" placeholder="Display Name" value={displayName} onChange={handleChange} />
                    <input className="input" type="email" name="email" placeholder="Email" value={email} onChange={handleChange} />
                    <input className="input" type="password" name="password" placeholder="Password" value={password} onChange={handleChange} />
                </div>

                <p onSubmit={(event) => { handleSubmit(event) }}>
                    Sign up
                </p>
            </form>
        </section>
    );
}

export default SignUp;

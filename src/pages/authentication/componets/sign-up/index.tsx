import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUserWithPasswordAndEmail } from "../../../../store/auth/auth";
import { AppDispatch } from "../../../../store/store";

import './style.scss'

type Props = {};

function SignUp({ }: Props) {
    const defaultFormFields = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const dispatch = useDispatch<AppDispatch>();


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) return alert('Password incorrect')

        dispatch(createUserWithPasswordAndEmail({ email, password }))
    }

    return (
        <section className="sign-up mb-2">
            <h2 className="sign-up__title">Dont't have an account?</h2>
            <p>Sign up With your email and password</p>

            <form onSubmit={(event) => { handleSubmit(event) }} className='sign-up__form'>
                <div className="input-box">
                    <input className="input" type="text" name="displayName" placeholder="Display Name" value={displayName} required onChange={handleChange} />
                    <input className="input" type="email" name="email" placeholder="Email" value={email} required onChange={handleChange} />
                    <input className="input" type="password" name="password" placeholder="Password" required value={password} onChange={handleChange} />
                    <input className="input" type="password" name="confirmPassword" placeholder="confirm password" required value={confirmPassword} onChange={handleChange} />
                </div>

                <button type="submit">
                    Sign up
                </button>
            </form>
        </section>
    );
}

export default SignUp;

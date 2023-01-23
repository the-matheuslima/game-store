import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

import UserDefault from '../../assets/image/user-default.png';
import UserNoImg from '../../assets/image/user-no-img.png';

import { logout } from "../../store/auth/auth";

import './style.scss'
import Button from "../button";


type Props = {};

function IsLogged({ }: Props) {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();

    const logoutOfApp = () => {
        dispatch(logout());
    };

    return (
        <div className="is-logged__content">
            <div className="is-logged__content-img">
                <img className="is-logged-img" src={user.isLogged ? user.photoURL : UserDefault} alt={`user ${user.displayName}`} />
            </div>

            <div className="is-logged__btns">
                {/* <Link to='/my-account'>
                    See acurrent
                </Link> */}

                <Button onClick={() => logoutOfApp()}>
                    Log out
                </Button>
            </div>
        </div>
    );
}

export default IsLogged;

import React from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import Button from "../button";
import IsLogged from "../is-logged";

import './style.scss'

function ModalUser() {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <div className="modal-user">
            {user.isLogged ? <IsLogged /> : <Link to='/auth'><Button>Sign up</Button></Link>}
        </div>
    );
}

export default ModalUser;

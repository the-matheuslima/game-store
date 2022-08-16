import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store/store";
import Button from "../button";
import IsLogged from "../is-logged";

import './style.scss'

function ModalUser() {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <div className="modal-user">
            {user.isLogged ? <IsLogged /> : <Button><Link to={'/auth'}>Sign up</Link></Button>}
        </div>
    );
}

export default ModalUser;

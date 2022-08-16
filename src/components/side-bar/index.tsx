import React, { useState } from "react";

import { MdOutlineHome, MdFavorite } from 'react-icons/md';
import { IoGameController } from 'react-icons/io5';
import { NavLink } from "react-router-dom";

import UserDefault from '../../assets/image/user-default.png'
import UserNoImg from '../../assets/image/user-no-img.png';

import ModalUser from "../modal-user";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import './style.scss'


export default function NavBarLeft() {
    const user = useSelector((state: RootState) => state.auth.user);

    const [sign, setSign] = useState(false);

    const handlerSignUser = () => {
        setSign(!sign)
    }

    return (
        <nav className="side-bar">
            <div className="side-bar__content">
                <div className="side-bar__login">
                    <div className="side-bar__logo" onClick={() => handlerSignUser()}>
                        <img className="is-logged-img" src={user.isLogged ? user.image === '' || user.image === null ? UserNoImg : user.image : UserDefault} alt="" />
                    </div>
                    {sign ? <ModalUser /> : null}
                </div>

                <ul className="side-bar__list">
                    <li className="side-bar__item" >
                        <NavLink to='/' className={({ isActive }) =>
                            isActive ? 'activeLink' : undefined
                        } >
                            <MdOutlineHome className="side-bar__icon" />
                        </NavLink>
                    </li>

                    <li className="side-bar__item">
                        <NavLink to='/catalog' className={({ isActive }) =>
                            isActive ? 'activeLink' : undefined
                        } >
                            <IoGameController className="side-bar__icon" />
                        </NavLink>
                    </li>

                    <li className="side-bar__item">
                        <NavLink to='/myLibrary' className={({ isActive }) =>
                            isActive ? 'activeLink' : undefined
                        } >
                            <MdFavorite className="side-bar__icon" />
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

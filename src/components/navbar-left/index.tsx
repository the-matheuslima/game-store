import React from "react";
import './style.scss'

import { MdOutlineHome, MdFavorite } from 'react-icons/md'
import { IoGameController } from 'react-icons/io5'
import { NavLink } from "react-router-dom";

export default function NavBarLeft() {
    return (
        <nav className="navbar-left">
            <ul className="navbar-left__list">
                <li className="navbar-left__item">
                    <NavLink to='/' className={({ isActive }) =>
                        isActive ? 'activeLink' : undefined
                    } >
                        <MdOutlineHome className="navbar-left__icon" />
                    </NavLink>
                </li>

                <li className="navbar-left__item">
                    <NavLink to='/catalog' className={({ isActive }) =>
                        isActive ? 'activeLink' : undefined
                    } >
                        <IoGameController className="navbar-left__icon" />
                    </NavLink>
                </li>

                <li className="navbar-left__item">
                    <NavLink to='/myLibrary' className={({ isActive }) =>
                        isActive ? 'activeLink' : undefined
                    } >
                        <MdFavorite className="navbar-left__icon" />
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

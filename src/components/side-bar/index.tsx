import React from "react";

import { MdOutlineHome, MdFavorite } from 'react-icons/md'
import { IoGameController } from 'react-icons/io5'
import { NavLink } from "react-router-dom";
import UserDefault from '../../assets/image/user-default.png'

import './style.scss'


export default function NavBarLeft() {
    return (
        <nav className="side-bar">
            <div className="side-bar__content">
                <div className="side-bar__logo">
                    <img src={UserDefault} alt="" />
                </div>

                <ul className="side-bar__list">
                    <li className="side-bar__item">
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

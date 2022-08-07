import React from "react";
import './style.scss'

import { MdOutlineHome, MdOutlineComputer } from 'react-icons/md'
import { FaPlaystation, FaXbox } from 'react-icons/fa'
import { Link } from "react-router-dom";

type Props = {};

export default function NavBarLeft({ }: Props) {
    return (
        <nav className="navbar-left">
            <ul className="navbar-left__list">
                <li className="navbar-left__item">
                    <Link to='/'>
                        <MdOutlineHome className="navbar-left__icon" />
                    </Link>
                </li>

                <li className="navbar-left__item">
                    <Link to='/plataform/playstation'>
                        <FaPlaystation className="navbar-left__icon" />
                    </Link>
                </li>

                <li className="navbar-left__item">
                    <Link to='/plataform/xbox'>
                        <FaXbox className="navbar-left__icon" />
                    </Link>
                </li>

                <li className="navbar-left__item">
                    <Link to='/plataform/pc' className="link">
                        <MdOutlineComputer className="navbar-left__icon" />
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

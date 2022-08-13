import React from "react";
import { Link } from "react-router-dom";
import './style.scss'

function ListHorizontal({ games }) {
    return (
        <div className="list">
            <div className="list__img-content">
                <Link to={`/catalog/${games.id}`}>
                    <img className="list__img" src={games.background_image} alt="" />
                </Link>
            </div>
        </div>
    );
}

export default ListHorizontal;

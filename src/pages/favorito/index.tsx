import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardGame from "../../components/card-game";
import { RootState } from "../../store/store";

import './style.scss'

function Library() {
    const FavoritesGames = useSelector((state: RootState) => state.favorites.favorite);

    return (
        <main className="library">
            <div className="library__list mb-2">
                <h2>MY FAVORITES</h2>
            </div>

            <div className="library__content">
                <ul className="library__list">
                    {FavoritesGames.length !== 0 ?
                        FavoritesGames.slice(1, FavoritesGames.length).map((game) => (
                            <CardGame key={game.id} games={game} />
                        )) : <h3>empty</h3>}
                </ul>
            </div>
        </main>
    );
}

export default Library;

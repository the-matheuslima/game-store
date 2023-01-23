import React from "react";
import { Games } from "../../interface/games";
import CarouselGames from "../carouselGames";
import GameList from "../game-list";

type Props = {
    title: string,
    game: Games
};

function SectionCategory({ title, game }: Props) {
    return (
        <section className=" mb-2">
            <h2 className=" mb-2">{title}</h2>
            <CarouselGames>
                {game.map((game, index) => (
                    <GameList games={game} key={index} />
                ))}
            </CarouselGames>
        </section>
    );
}

export default SectionCategory;

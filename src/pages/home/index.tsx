import { useEffect, useState } from "react";

import GameGrid from "../../components/games-grid";
import ListHorizontal from "../../components/list-horizontal";
import SectionCategory from "../../components/section-category";
import Loading from "../../components/loading";

import { api } from "../../service/api/api";
import { Games } from "../../interface/games";

import './style.scss'

export default function Home() {
    const [released, setReleased] = useState<Games | null>(null)
    const [popular, setPopular] = useState<Games | null>(null)
    const [indie, setIndie] = useState<Games | null>(null)
    const [rpg, setRpg] = useState<Games | null>(null)
    const [adventure, setAdventure] = useState<Games | null>(null)

    useEffect(() => {
        const getGamesReleased = async () => {
            const response = await api.getListReleased();
            setReleased(response.data.results)
        }
        getGamesReleased()
    }, []);

    useEffect(() => {
        const getGamesPopular = async () => {
            const response = await api.getPopularGames();
            setPopular(response.data.results)
        };
        getGamesPopular()
    }, []);

    useEffect(() => {
        const getGamesIndie = async () => {
            const response = await api.getListByGenres('indie');
            setIndie(response.data.results)
        }
        getGamesIndie()
    }, []);

    useEffect(() => {
        const getGamesRpg = async () => {
            const response = await api.getListByGenres("role-playing-games-rpg");
            setRpg(response.data.results)
        }
        getGamesRpg()
    }, []);

    useEffect(() => {
        const getGamesAdventure = async () => {
            const response = await api.getListByGenres("strategy");
            setAdventure(response.data.results)
        }
        getGamesAdventure()
    }, []);

    return (
        <main className="home">
            {released && popular && rpg && adventure && indie ?
                <>
                    <section className="home__banner mb-2">
                        <ul className="list__horizont">
                            {released.map((game, index) => (
                                <ListHorizontal games={game} key={index} />
                            ))}
                        </ul>
                    </section>

                    <SectionCategory title='Released in 2022' game={released} />

                    <SectionCategory title='Popular Games' game={popular.slice(0, 15)} />

                    <section className="home__content-game">
                        <ul className="home__game-grid">
                            {released.slice(0, 3).map((game, index) => (
                                <GameGrid games={game} key={index} />
                            ))}
                        </ul>
                    </section>

                    <SectionCategory title='Indie games' game={indie} />

                    <SectionCategory title='RPG games' game={rpg} />

                    <SectionCategory title='strategy games' game={adventure} />
                </>
                : <Loading />}
        </main>
    );
}

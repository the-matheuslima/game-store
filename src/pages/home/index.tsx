import { useEffect, useState } from "react";
import CarouselGames from "../../components/carouselGames";
import GameList from "../../components/game-list";
import GameGrid from "../../components/games-grid";
import { api } from "../../service/api/api";
import './style.scss'

export default function Home() {
    const [games, setGames] = useState([]);
    const [released, setReleased] = useState([])
    const [popular, setPopular] = useState([])
    const [indie, setIndie] = useState([])
    const [rpg, setRpg] = useState([])
    const [adventure, setAdventure] = useState([])

    useEffect(() => {
        const getGames = async () => {
            const response = await api.getListGames();
            setGames(response.data.results)
        }
        getGames()
    }, []);

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
            <section className="home__released mb-2">
                <h2 className=" mb-2">Lançado em 2022</h2>
                <CarouselGames>
                    {released && released.map((game, index) => (
                        <GameList games={game} key={index} />
                    ))}
                </CarouselGames>
            </section>

            <section className="home__popular">
                <h2 className=" mb-2">Jogos Populares</h2>

                <CarouselGames>
                    {popular && popular.slice(0, 15).map((game, index) => (
                        <GameList games={game} key={index} />
                    ))}
                </CarouselGames>
            </section>

            <section>
                <ul className="home__game-grid">
                    {released && released.slice(0, 3).map((game, index) => (
                        <GameGrid games={game} key={index} />
                    ))}
                </ul>
            </section>

            <section className="home__indies mb-2">
                <h2 className=" mb-2">Jogos indies</h2>
                <CarouselGames>
                    {indie && indie.map((game, index) => (
                        <GameList games={game} key={index} />
                    ))}
                </CarouselGames>
            </section>

            <section className="home__indies mb-2">
                <h2 className=" mb-2">Jogos de rpg</h2>
                <CarouselGames>
                    {rpg && rpg.map((game, index) => (
                        <GameList games={game} key={index} />
                    ))}
                </CarouselGames>
            </section>

            <section className="home__indies mb-2">
                <h2 className=" mb-2">Jogos de estrategia</h2>
                <CarouselGames>
                    {adventure && adventure.map((game, index) => (
                        <GameList games={game} key={index} />
                    ))}
                </CarouselGames>
            </section>
        </main>
    );
}

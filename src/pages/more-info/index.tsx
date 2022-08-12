import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../service/api/api";
import DetalinsHead from "./component/detalins-head";
import './style.scss'
import { Games } from '../../types/games'
import CarouselGames from "../../components/carouselGames";
import GameList from "../../components/game-list";
import Loading from "../../components/loading";

export default function MoreInfo() {
    const { id } = useParams()
    const [detalins, setdetalins] = useState<Games | null>(null);
    const [trailer, setTrailer] = useState<any[]>([])
    const [screnshot, setScrenshot] = useState<any[]>([])
    const [related, setRelated] = useState<any[]>([]);
    const [achievements, setAchievements] = useState<any[]>([]);
    const [dlc, setDlc] = useState<any[]>([]);

    useEffect(() => {
        const getGamesDetalins = async () => {
            const response = await api.getDetalinsGame(id);
            setdetalins(response.data)
        }
        getGamesDetalins()

        const getGamesTreiler = async () => {
            const response = await api.getTreilerGame(id);
            setTrailer(response.data.results)

        }
        getGamesTreiler()

        const getGamesScreenshots = async () => {
            const response = await api.getGameScreenshots(id);
            setScrenshot(response.data.results)
        };
        getGamesScreenshots();

        const getGameRelated = async () => {
            const response = await api.getGameRelated(id);
            setRelated(response.data.results);
        };
        getGameRelated();

        const getGameAchievements = async () => {
            const response = await api.getGameAchievements(id);
            setAchievements(response.data.results);
        };
        getGameAchievements();

        const getGameDlc = async () => {
            const response = await api.getListDlc(id);
            setDlc(response.data.results);
        };
        getGameDlc();
    }, [id]);

    return (
        <>
            {dlc && achievements && related && screnshot && detalins && trailer ?
                <>
                    <div className="banner" style={{ backgroundImage: `url(${detalins?.background_image})` }}>
                        <div className="banner-blur"></div>
                    </div>
                    <main className="details">
                        <DetalinsHead detalins={detalins} />

                        {trailer.length !== 0 &&
                            <section className="details__trailer mb-2">
                                <ul className="details__trailer__list details__list">
                                    {trailer.map(trailer => (
                                        <li className="details__trailer__item" key={trailer.id}>
                                            <video src={trailer.data.max} width='310' height='300' poster={trailer.preview} controls />
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        }

                        <section className="details__screnshot  mb-2">
                            <ul className="details__screnshot-list details__list">
                                {screnshot.slice(0, 6).map(screnshot => (
                                    <li className="details__screnshot-list-item" key={screnshot.id}>
                                        <img src={screnshot.image} alt="" />
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {related.length !== 0 &&
                            <section className="details__related mb-2">
                                <h2 className="mb-2 details__title">Relacionados</h2>
                                <CarouselGames>
                                    {related.map((game, index) => (
                                        <GameList games={game} key={index} />
                                    ))}
                                </CarouselGames>
                            </section>
                        }

                        {achievements.length !== 0 &&
                            <section className="details__achievements  mb-2">
                                <h2 className="details__title mb-2">achievements</h2>
                                <ul className="details__achievements-list">
                                    {achievements.slice(0, 6).map(achievements => (
                                        <li className="details__achievements-item" key={achievements.id}>
                                            <div className="details__achievements-img">
                                                <img src={achievements.image} alt="" />
                                            </div>
                                            <div className="details__achievements-info">
                                                <p>{achievements.name}</p>
                                                <p>{achievements.description}</p>
                                                <p className="details__achievements-per">{achievements.percent}%</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        }

                        {dlc.length !== 0 &&
                            <section className="details__related mb-2">
                                <h2 className="mb-2 details__title">DLC</h2>
                                <CarouselGames>
                                    {dlc.map((game, index) => (
                                        <GameList games={game} key={index} />
                                    ))}
                                </CarouselGames>
                            </section>
                        }
                        <section className="details__tags">
                            <h2 className="details__title mb-2">Tags</h2>
                            <ul className="details__tags-list details__list">
                                {detalins && detalins.tags.map(tags => (
                                    <span key={tags.id} className="details__tag">{tags.name}</span>
                                ))}
                            </ul>
                        </section>
                    </main>
                </>
                : <Loading />}
        </>
    );
}


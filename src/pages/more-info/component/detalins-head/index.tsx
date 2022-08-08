import React, { useState } from "react";
import './style.scss';

export default function DetalinsHead({ detalins }) {
    const [collapsed, setCollapsed] = useState(true);

    const handleCollapsed = () => {
        setCollapsed(prev => !prev);
    };

    return (
        <>
            {detalins && (
                <section className="details__game details__container">
                    <div >
                        <div className="details__game-head">
                            <h2 className="details__game-title">{detalins.name}</h2>
                            <div className="details__game-publishers">
                                {detalins.publishers && detalins.publishers.map(publisher => (
                                    <p className="details__game-publisher">{publisher.name}</p>
                                ))}
                            </div>
                            <div className="details__game-banner">
                                <img className="img" src={detalins.background_image} alt="" />
                            </div>

                            <div className="details__game-meta">
                                <button>add na coleção</button>
                            </div>
                        </div>
                    </div>
                    <div className="details__game-info">
                        <div className="details__game-about">
                            <h2>About</h2>
                            <div className="details__game-about-box" dangerouslySetInnerHTML={{ __html: (collapsed ? detalins.description.length > 220 ? `${detalins.description.substring(0, 220)}...` : '' : `${detalins.description} `) }} />
                            <span onClick={handleCollapsed} className={`${detalins.description.length < 220 ? 'hidden' : ''} details__game-readmore`}>Ler mais</span>
                        </div>

                        <div className="details__game-meta">
                            <div className="details__game-meta-block">
                                <h4 className="details__game-meta-title">Metascore</h4>
                                <p className={`${Number(detalins.metacritic) > 50 ? 'green' : 'red'} details__game-metascore `}>{detalins.metacritic && detalins.metacritic}</p>
                            </div>

                            <div className="details__game-meta-block">
                                <h4 className="details__game-meta-title">Platforms</h4>
                                <ul className="details__game-meta-list">
                                    {detalins.platforms && detalins.platforms.map((platforms, i) => (
                                        <li className="details__game-meta-text text-item" key={i}>{platforms.platform.name && platforms.platform.name}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="details__game-meta-block">
                                <h4 className="details__game-meta-title">Genre</h4>
                                <ul className="details__game-meta-list">
                                    {detalins.genres && detalins.genres.map((genres, i) => (
                                        <li className="details__game-meta-text text-item" key={i}>{genres.name && genres.name}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="details__game-meta-block">
                                <h4 className="details__game-meta-title">publishers</h4>
                                <ul className="details__game-meta-list">
                                    {detalins.publishers && detalins.publishers.map((publisher, i) => (
                                        <li className="details__game-meta-text text-item" key={i}>{publisher.name && publisher.name}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="details__game-meta-block">
                                <h4 className="details__game-meta-title">Age ratings</h4>
                                <p className="details__game-meta-text">{detalins.esrb_rating && detalins.esrb_rating.name}</p>
                            </div>


                            <div className="details__game-meta-block">
                                <h4 className="details__game-meta-title">Release date</h4>
                                <p className="details__game-meta-text">{detalins.released}</p>
                            </div>

                            <div className="details__game-meta-block">
                                <h4 className="details__game-meta-title">website</h4>
                                <a href={detalins.website} target='_blank' rel="external" className="details__game-meta-text text-link">{detalins.website}</a>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>

    );
}

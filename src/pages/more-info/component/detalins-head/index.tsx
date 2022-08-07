import React, { useEffect, useState } from "react";
import './style.scss';

export default function DetalinsHead({ detalins }) {
    return (
        <>
            {detalins && (
                <section className="details__game details__container">
                    <div className="details__game-head">
                        <div className="details__game-head-left">
                            <h2 className="game_title">{detalins.name}</h2>
                            {/* {detalins.publishers && detalins.publishers.map(publisher => (
                                <p className="game_publisher">{publisher.name}</p>
                            ))} */}
                            <div className="details__game__banner">
                                <img className="img" src={detalins.background_image} alt="" />
                            </div>

                            <div className="details__game-meta">
                                <button style={{ padding: '5px 5rem ', margin: '1rem 0' }}>add na coleção</button>
                            </div>
                        </div>

                    </div>
                    <div className="details__game-about">
                        <div className="details__game-about-box">
                            <p className="details__game-about-text">{detalins.description_raw && detalins.description_raw}</p>
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
                                <div className="details__game-meta-list">
                                    {detalins.genres && detalins.genres.map((genres, i) => (
                                        <p className="details__game-meta-text" key={i}>{genres.name && genres.name + ', '}</p>
                                    ))}
                                </div>
                            </div>

                            <div className="details__game-meta-block">
                                <h4 className="details__game-meta-title">publishers</h4>
                                <div className="details__game-meta-list">
                                    {detalins.publishers && detalins.publishers.map((publisher, i) => (
                                        <p className="details__game-meta-text" key={i}>{publisher.name && publisher.name + ', '}</p>
                                    ))}
                                </div>
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

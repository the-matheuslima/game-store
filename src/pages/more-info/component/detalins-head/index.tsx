import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addInFavorites, removeInFavorites } from '../../../../store/my-favorite/my-favorite.store';
import { RootState } from '../../../../store/store';

import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import './style.scss';

export default function DetalinsHead({ detalins }) {
    const [collapsedAbout, setCollapsedAbout] = useState(true);
    const FavoritesGames = useSelector((state: RootState) => state.favorites.favorite);

    const [fvActive, setFvActive] = useState(false);
    const dispatch = useDispatch();

    const handleCollapsedAbout = () => {
        setCollapsedAbout(prev => !prev);
    };

    const handleFavorites = () => {
        if (fvActive) {
            dispatch(
                removeInFavorites(detalins.id)
            )
            setFvActive(false)
        } else {
            dispatch(
                addInFavorites({
                    id: detalins.id,
                    name: detalins.name,
                    background_image: detalins.background_image,
                    metacritic: detalins.metacritic,
                    released: detalins.released
                })
            );
            setFvActive(true)
        }
    };

    useEffect(() => {
        FavoritesGames.forEach(favorite => favorite.id === detalins.id ? setFvActive(true) : null)
    }, [])

    let res = detalins.description.length > 220 ? `${detalins.description.substring(0, 220)}...` : detalins.description

    return (
        <>
            {detalins && (
                <section className="details__game details__container">
                    <div >
                        <div className="details__game-head">
                            <h2 className="details__game-title">{detalins.name}</h2>
                            <ul className="details__game-publishers  mb-2">
                                {detalins.publishers && detalins.publishers.map(publisher => (
                                    <li key={publisher.id} className="details__game-publisher">{publisher.name}</li>
                                ))}
                            </ul>
                            <div className="details__game-banner mb-2">
                                <img className="img" src={detalins.background_image} alt="" />
                            </div>

                            <div className="details__game-meta" onClick={() => handleFavorites()}>
                                <button className='details__game-meta-btn'>
                                    <span className="details__game-meta-icon">{fvActive ? <MdFavorite /> : <MdFavoriteBorder />}</span>
                                    Favorite
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="details__game-info">
                        <div className="details__game-about">
                            <h2>About</h2>
                            <div className="details__game-about-box" dangerouslySetInnerHTML={{ __html: (collapsedAbout ? res : `${detalins.description} `) }} />

                            <span onClick={handleCollapsedAbout} className={`${detalins.description.length < 220 ? 'hidden' : ''} details__game-readmore`}>{collapsedAbout ? 'read more' : 'close'}</span>
                        </div>

                        <div className="details__game-meta">
                            <div className="details__game-meta-block">
                                <h4 className="details__game-meta-title">Metascore</h4>
                                <p className={`${Number(detalins.metacritic) > 50 ? 'green' : 'red'} details__game-metascore `}>{detalins.metacritic && detalins.metacritic}</p>
                            </div>

                            <div className="details__game-meta-block">
                                <h4 className="details__game-meta-title">Platforms</h4>
                                <ul className="details__game-meta-list">
                                    {detalins.platforms && detalins.platforms.map(({ platform }) => (
                                        <li className="details__game-meta-text text-item" key={platform.id}>{platform.name && platform.name}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="details__game-meta-block">
                                <h4 className="details__game-meta-title">Genre</h4>
                                <ul className="details__game-meta-list">
                                    {detalins.genres && detalins.genres.map((genres) => (
                                        <li className="details__game-meta-text text-item" key={genres.id}>{genres.name && genres.name}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="details__game-meta-block">
                                <h4 className="details__game-meta-title">publishers</h4>
                                <ul className="details__game-meta-list">
                                    {detalins.publishers && detalins.publishers.map((publisher) => (
                                        <li className="details__game-meta-text text-item" key={publisher.id}>{publisher.name && publisher.name}</li>
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

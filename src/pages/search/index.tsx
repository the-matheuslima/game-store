import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/loading";
import { api } from "../../service/api/api";
import { Games } from "../../types/games";
import './style.scss'


export default function Navigation() {
    const { id } = useParams()
    const [search, setsearch] = useState<Games[] | null>(null);
    const navigator = useNavigate()

    const handler = (id: number) => {
        navigator(`/catalog/${id}`)
    }

    useEffect(() => {
        const getSearch = async () => {
            const response = await api.getGamesBySearch(id);
            setsearch(response.data.results)
        }
        getSearch()
    }, [id]);

    return (
        <main className="search">
            {search ?
                <>
                    <ul className="search__list">
                        {search?.map(e => (
                            <li className="card__game">
                                <img className="card__game__img" src={e.background_image} alt="" />
                                <div className='card__game__info'>
                                    <p className='card__game__info__name'><span onClick={() => handler(e.id)}>{e.name}</span> <span className='gamelist__info__rating'>{e.rating} / 5</span> </p>
                                    <div>
                                        {e.genres.map(genres => (
                                            <span>{genres.name + ' '}</span>
                                        ))}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                </>
                : <Loading />}
        </main>
    );
}

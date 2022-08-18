import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { orderList } from "../../utils/filters-list";
import './style.scss'

type Props = {
    handlerFilterOrdering: (a: string) => void,
};

function Filter({ handlerFilterOrdering }: Props) {
    const [collapseOrder, setCollapseOrder] = useState(true);
    const [filterParams] = useSearchParams();

    const collapse = () => {
        setCollapseOrder(!collapseOrder)
    }

    return (
        <div className="catalog__filters">
            <div className="catalog__filters-box">
                <button className="catalog__filters-buttom" onClick={collapse}>
                    Order by: {filterParams.get('ordering')}
                </button>

                <ul className={`${collapseOrder ? 'hidden' : 'show'} catalog__filters-list`}>
                    {orderList.map(order => (
                        <li key={order.name} className="catalog__filters-item" onClick={() => handlerFilterOrdering(order.filter)}>{order.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Filter;

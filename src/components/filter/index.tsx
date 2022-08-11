import React, { useState } from "react";
import { orderList } from "../../utils/filters-list";
import './style.scss'

type Props = {
    handlerFilterOrder: (a: string, b: string) => void,
    orderName: string,
};

function Filter({ handlerFilterOrder, orderName }: Props) {
    const [collapseOrder, setCollapseOrder] = useState(true);

    const collapse = () => {
        setCollapseOrder(!collapseOrder)
    }

    return (
        <div className="catalog__filters">
            <div className="catalog__filters-box">
                <button className="catalog__filters-buttom" onClick={collapse}>
                    Order by: {orderName}
                </button>

                <ul className={`${collapseOrder ? 'hidden' : 'show'} catalog__filters-list`}>
                    {orderList.map(order => (
                        <li key={order.name} className="catalog__filters-item" onClick={() => handlerFilterOrder(order.filter, order.name)}>{order.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Filter;

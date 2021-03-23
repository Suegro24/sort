import React, { useEffect, useState } from 'react';

import './SortItem.scss';

export const SortItem = (props) => {

    const [heigth, setHeight] = useState()

    useEffect(() => {
        setHeight(props.number * 40);
    }, [props.number])

    return (
        <div className="sort-item" style={{height: heigth}}>
            <p>{props.number}</p>
        </div>
    )
}
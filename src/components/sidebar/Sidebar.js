import React, { useContext, useEffect } from 'react'

import './Sidebar.scss';

import { SortNumbersContext, SortingMethodContext, ShouldStartSortingContext } from '../../context/SortContext';

export const Sidebar = () => {

    useEffect(() => {
        generateNewNumbers();
    }, [])

    const [, setNumbers] = useContext(SortNumbersContext)
    const [, setSortingMethod] = useContext(SortingMethodContext)
    const [, setShouldStartSorting] = useContext(ShouldStartSortingContext);

    const generateNewNumbers = () => {
        const values = [];
        for (let i = 0; i < 10; i++) {
            values.push({
                id: i,
                number: Math.floor(Math.random() * 10) + 1,
            });
        }
        setNumbers(values)
    }

    const changeSortingMethod = (method) => {
        setSortingMethod(method);
    }

    const startSorting = () => {
        setShouldStartSorting((true))
    }

    return (
        <aside className="sidebar">
            <ul className="sidebar__list list">
                <li className="sidebar__list-item">
                    <h2 className="sidebar__list-title">Sort</h2>
                    <ul className="sidebar__list--nested">
                        <li id="startButton" className="sidebar__list-item--nested" role="button" onClick={startSorting}>Start sorting</li>
                    </ul>
                </li>
                <li className="sidebar__list-item">
                    <h2 className="sidebar__list-title">Sorting method</h2>
                    <ul className="sidebar__list--nested">
                        <li className="sidebar__list-item--nested sidebar__list-item--active" onClick={changeSortingMethod.bind('bubbleSort')}>Bubble sort</li>
                    </ul>
                </li>
                <li className="sidebar__list-item">
                    <h2 className="sidebar__list-title">Generate</h2>
                    <ul className="sidebar__list--nested">
                        <li className="sidebar__list-item--nested" onClick={generateNewNumbers}>New array</li>
                    </ul>
                </li>
            </ul>
        </aside>
    )
}
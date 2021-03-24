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
        const methodList = document.querySelector('#sidebarListSortingMethod');
        const methodListItems = methodList.querySelectorAll('.sidebar__list-item--nested');
        methodListItems.forEach(item => {
            item.classList.remove('sidebar__list-item--active');
            return null;
        })
        document.querySelector(`#${method}`).classList.add('sidebar__list-item--active');
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
                    <ul id="sidebarListSortingMethod" className="sidebar__list--nested">
                        <li id="bubbleSort" className="sidebar__list-item--nested sidebar__list-item--active" onClick={changeSortingMethod.bind(null, 'bubbleSort')}>Bubble sort</li>
                        <li id="selectionSort" className="sidebar__list-item--nested" onClick={changeSortingMethod.bind(null, 'selectionSort')}>Selection sort</li>
                        <li id="insertionSort" className="sidebar__list-item--nested" onClick={changeSortingMethod.bind(null, 'insertionSort')}>Insertion sort</li>
                        <li id="mergeSort" className="sidebar__list-item--nested" onClick={changeSortingMethod.bind(null, 'mergeSort')}>Merge sort</li>
                        <li id="quickSort" className="sidebar__list-item--nested" onClick={changeSortingMethod.bind(null, 'quickSort')}>Quick sort</li>
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
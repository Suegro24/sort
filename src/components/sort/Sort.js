import React, { useContext, useEffect } from 'react'

import './Sort.scss'

import { SortItem } from '../sortItem/SortItem';

import { SortNumbersContext, SortingMethodContext, ShouldStartSortingContext } from '../../context/SortContext';

export const Sort = () => {

    const [numbers, setNumbers] = useContext(SortNumbersContext);
    const [sortingMethod] = useContext(SortingMethodContext);
    const [shouldStartSorting] = useContext(ShouldStartSortingContext);

    const timeout = (delay) => {
        return new Promise(res => setTimeout(res, delay));
    }

    const highlightItem = async (...itemsId) => {
        for (let id of itemsId) {
            document.querySelectorAll('.sort-item')[id].classList.add('sort-item--highlight');
        }
        await timeout(100);
    }

    const unHighlightItem = async (...itemsId) => {
        await timeout(100);
        for (let id of itemsId) {
            document.querySelectorAll('.sort-item')[id].classList.remove('sort-item--highlight');
        }
    }

    const bubbleSort = async () => {
        for (let i = 0; i < numbers.length; i++) {
            for (let j = 0; j < numbers.length - (i + 1); j++) {
                await highlightItem(j, j + 1)
                if (numbers[j].number > numbers[j + 1].number) {
                    const temp = numbers[j].number;
                    numbers[j].number = numbers[j + 1].number;
                    numbers[j + 1].number = temp;
                    setNumbers(numbers);
                }
                await unHighlightItem(j, j + 1);
            }
        }
        console.log(numbers);
    }

    const startSorting = () => {
        switch (sortingMethod) {
            case 'bubbleSort': {
                bubbleSort()
                break;
            }
            default: {
                throw new Error('Unknown sorting method: ' + sortingMethod)
            }
        }
        
    }

    useEffect(() => {
        if (shouldStartSorting) {
            startSorting()
        }
    }, [shouldStartSorting, numbers])

    return (
        <main className="sort-container">
            {numbers.map(number => {
                return (
                    <SortItem key={number.id} number={number.number}/>
                )
            })}
        </main>
    )
}
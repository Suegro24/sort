import React, { useContext, useEffect, useState } from 'react'

import './Sort.scss'

import { SortItem } from '../sortItem/SortItem';

import { SortNumbersContext, SortingMethodContext, ShouldStartSortingContext } from '../../context/SortContext';

export const Sort = () => {

    const [numbers, setNumbers] = useContext(SortNumbersContext);
    const [sortingMethod] = useContext(SortingMethodContext);
    const [shouldStartSorting, setShouldStartSorting] = useContext(ShouldStartSortingContext);
    const [render, setRender] = useState(false);

    const timeout = (delay) => {
        return new Promise(res => setTimeout(res, delay));
    }

    const highlightItem = async (...itemsId) => {
        for (let id of itemsId) {
            document.querySelectorAll('.sort-item')[id].classList.add('sort-item--highlight');
        }
        await timeout(100)
        for (let id of itemsId) {
            document.querySelectorAll('.sort-item')[id].classList.remove('sort-item--highlight');
        }
    }

    const markAsDoneItem = (...itemsId) => {
        for (let id of itemsId) {
            document.querySelectorAll('.sort-item')[id].classList.add('sort-item--completed');
        }
    }

    const swapNumbers = (index1, index2) => {
        const temp = numbers[index1];
        numbers[index1] = numbers[index2];
        numbers[index2] = temp;
        setNumbers(numbers);
    }

    const bubbleSort = async() => {
        for (let i = 0; i < numbers.length; i++) {
            for (let j = 0; j < numbers.length - (i + 1); j++) {
                await highlightItem(j, j + 1);
                if (numbers[j].number > numbers[j + 1].number) {
                    swapNumbers(j, j + 1);
                    setNumbers(numbers);
                }
                setRender(prevRender => !prevRender);
            }
            markAsDoneItem(numbers.length - (i + 1));
        }
    }

    const selectionSort = async() => {
        for (let i = 0; i < numbers.length; i++) {
            let minimum = {
                value: numbers[i].number,
                index: i
            }
            for (let j = (i + 1); j < numbers.length; j++) {
                await highlightItem(minimum.index, j)
                if (minimum.value > numbers[j].number) {
                    minimum.value = numbers[j].number;
                    minimum.index = j;
                }
            }
            if (i !== minimum.index) {
                swapNumbers(i, minimum.index);
            }
            markAsDoneItem(i);
        }
    }

    const insertionSort = async() => {
        for (let i = 1; i < numbers.length; i++) {
            for (let j = 0; j < i; j++) {
                await highlightItem(i, j);
                if (numbers[i].number < numbers[j].number) {
                    const temp = numbers[i];
                    numbers.splice(i, 1);
                    numbers.splice(j, 0, temp);
                    break;
                }
            }
            setRender(prevRender => !prevRender);
            setNumbers(numbers);
        }
    }

    const mergeSort = async (array) => {
        if (array.length <= 1) {
            return array;
        }

        const merge = async (leftArr, rightArr) => {
            const result = [];
            let leftIndex = 0;
            let rightIndex = 0;

            while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
                await highlightItem(leftIndex, leftArr.length + rightIndex);
                if (leftArr[leftIndex].number < rightArr[rightIndex].number) {
                    result.push(leftArr[leftIndex]);
                    leftIndex++;
                } else {
                    result.push(rightArr[rightIndex]);
                    rightIndex++;
                }
            }

            return [...result, ...leftArr.slice(leftIndex), ...rightArr.slice(rightIndex)];
        }

        const middleIndex = Math.floor(array.length / 2);
        const leftArr = array.slice(0, middleIndex);
        const rightArr = array.slice(middleIndex);

        return await merge(
            await mergeSort(leftArr),
            await mergeSort(rightArr)
        )
    }

    const quickSort = () => {

    }

    const startSorting = () => {
        switch (sortingMethod) {
            case 'bubbleSort': {
                bubbleSort();
                break;
            }
            case 'selectionSort': {
                selectionSort();
                break;
            }
            case 'insertionSort': {
                insertionSort();
                break;
            }
            case 'mergeSort': {
                mergeSort(numbers).then((res) => {
                    setNumbers(res);
                })
                // console.log(mergeSort(numbers));
                // console.log(numbers);
                break;
            }
            case 'quickSort': {
                quickSort();
                break;
            }
            default: {
                throw new Error('Unknown sorting method: ' + sortingMethod)
            }
        }
        setShouldStartSorting(false);
    }

    useEffect(() => {
        if (shouldStartSorting) {
            startSorting()
        }
    }, [shouldStartSorting, render])

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
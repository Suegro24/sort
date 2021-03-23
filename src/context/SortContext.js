import React, {createContext, useState} from 'react';

export const SortNumbersContext = createContext();
export const SortingMethodContext = createContext();
export const ShouldStartSortingContext = createContext();

export const SortProvider = ({ children }) => {
    const [numbers, setNumbers] = useState([]);
    const [sortingMethod, setSortingMethod] = useState('bubbleSort')
    const [shouldStartSorting, setShouldStartSorting] = useState(false);

    return (
        <SortNumbersContext.Provider value={[numbers, setNumbers]}>
            <SortingMethodContext.Provider value={[sortingMethod, setSortingMethod]}>
                <ShouldStartSortingContext.Provider value={[shouldStartSorting, setShouldStartSorting]}>
                    {children}
                </ShouldStartSortingContext.Provider>
            </SortingMethodContext.Provider>
        </SortNumbersContext.Provider>
    )
}
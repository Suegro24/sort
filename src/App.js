import React, { useEffect } from 'react'
import './App.scss';

import { Header } from './components/header/Header'
import { Sidebar } from './components/sidebar/Sidebar'
import { Sort } from './components/sort/Sort';

import { SortProvider } from './context/SortContext';

const App = () => {

  useEffect(() => {
    document.title = 'Sorting App'
  }, [])

  return (
    <div className="App">
      <Header />
      <SortProvider>
        <Sidebar />
        <Sort />
      </SortProvider>
    </div>
  );
}

export default App;

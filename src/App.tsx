import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import AddToWatchlist, { Stock } from './components/AddToWatchlist';
import { Watchlist } from './components/Watchlist';
import useFetch from './hooks/useFetch';

function App() {
  const [watchlist, setWatchlist] = useState<{items: Stock[]}>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [watchlistData, watchlistLoading, watchlistError] = useFetch("https://demomocktradingserver.azurewebsites.net/userdata/watchlist", "gareth.fentimen");

  const handleRemove = (newItem: Stock) => {
      const newitems = watchlist && watchlist.items.filter(s => s.symbol !== newItem.symbol);
      newitems && setWatchlist({ items: newitems });
  }

  const handleAdd = (newItem: Stock) => { 
    watchlist && watchlist.items.push(newItem);
    watchlist && setWatchlist({items: watchlist.items});
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>A watchlist</p>
      </header>
      
      <main role="main">
        {watchlistLoading ? <div>loading...</div> : 
          <Watchlist items={watchlistData as Stock[]} />
        }
        <AddToWatchlist onRemove={handleRemove} onAdd={handleAdd} />
      </main>
    </div>
  );
}

export default App;

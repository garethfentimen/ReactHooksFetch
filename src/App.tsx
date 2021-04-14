import React from 'react';
import logo from './logo.svg';
import './App.css';
import AddToWatchlist, { Stock } from './components/AddToWatchlist';
import { Watchlist } from './components/Watchlist';
import useFetch from './hooks/useFetch';

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [watchlistData, watchlistLoading, watchlistError, setWatchlistData] = useFetch<Stock[]>("https://demomocktradingserver.azurewebsites.net/userdata/watchlist", "gareth.fentimen");

  const handleRemove = (newItem: Stock) => {
      const newitems = watchlistData && watchlistData.filter(s => s.symbol !== newItem.symbol);
      newitems && setWatchlistData(newitems);
  }

  const handleAdd = (newItem: Stock) => {
    watchlistData && setWatchlistData([...watchlistData, ...[newItem]]);
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

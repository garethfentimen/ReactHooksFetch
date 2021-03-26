import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import AddToWatchlist, { Stock } from './components/AddToWatchlist';

function App() {
  const [watchlist, setWatchlist] = useState<{items: Stock[]}>();

  useEffect(() => {
    (async () => {
      const response = await fetch("https://demomocktradingserver.azurewebsites.net/userdata/watchlist",
        {
          headers: { 
            userid: "gareth.fentimen" 
          } 
        }
      );

      const jsonData = await response.json();
      setWatchlist({ items: jsonData });
    })();
  }, []);

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
        {!watchlist ? <div>loading...</div> : 
          watchlist.items.length ? 
            watchlist.items.map((item: Stock) => {
              return <div key={item.symbol}>{item.symbol}</div>;
            })
          : <div>watchlist is empty</div>}
        <AddToWatchlist onRemove={handleRemove} onAdd={handleAdd} />
      </main>
    </div>
  );
}

export default App;

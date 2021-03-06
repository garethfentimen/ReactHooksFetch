import React from 'react';

export interface Stock {
    symbol: string
}

function AddToWatchlist({ onAdd, onRemove } : AddToWatchlistProps) {
    const [stock, setStock] = React.useState<string>("");
    const addToWatchlist = async () => {
        const response = await fetch("https://demomocktradingserver.azurewebsites.net/userdata/watchlist",
            {
                body: JSON.stringify({
                    symbol: stock,
                    action: "ADD"
                }),
                method: 'POST',
                headers: { 
                    userid: "gareth.fentimen" 
                }
            }
        );

        const jsonResponse = await response.json();
        jsonResponse.success && onAdd({symbol: stock});
    };

    const removeFromWatchlist = async () => {
        const response = await fetch("https://demomocktradingserver.azurewebsites.net/userdata/watchlist",
            {
                body: JSON.stringify({
                    symbol: stock,
                    action: "REMOVE"
                }),
                method: 'POST',
                headers: { 
                    userid: "gareth.fentimen" 
                }
            }
        );

        const jsonResponse = await response.json();
        jsonResponse.success && onRemove({symbol: stock});
    };

    const handleAdd = (e: any) => {
        e.preventDefault();
        addToWatchlist();
    }

    const handleRemove = (e: any) => {
        e.preventDefault();
        removeFromWatchlist();
    }
      
    return (<div>
        <form onSubmit={(e: any) => e.preventDefault()}>
            <input type={'text'} id={'stock'} value={stock} onChange={(e: any) => { setStock(e.target.value); }} />
            <button onClick={handleAdd}>Add stock to watchlist</button>
            <button onClick={handleRemove}>Remove stock from watchlist</button>
        </form>
      </div>);
};

export default AddToWatchlist;

export interface OnAddFunction {
    (stockAdded: Stock) : void
}

export interface OnRemoveFunction {
    (stockAdded: Stock) : void
}

export interface AddToWatchlistProps {
    onAdd: OnAddFunction,
    onRemove: OnRemoveFunction
}
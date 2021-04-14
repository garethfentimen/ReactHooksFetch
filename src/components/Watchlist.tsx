import { Stock } from "./AddToWatchlist";

interface WatchlistInterface {
    items: Array<Stock>;
}

export function Watchlist({items}: WatchlistInterface) {
    return items && items.length ? 
            <>
                {items.map((item: Stock) => {
                    return <div key={item.symbol}>{item.symbol}</div>;
                })}
            </> 
            : <div>watchlist is empty</div>;
}
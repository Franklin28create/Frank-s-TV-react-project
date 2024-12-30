import { useState, useEffect } from "react";

const WatchlistList = {
  watchlist: [],
};

const useWatchlistList = () => {
  const [watchlist, setWatchlist] = useState(WatchlistList.watchlist);


  useEffect(() => {
    WatchlistList.watchlist = watchlist;
  }, [watchlist]);

  const addItem = (newItem) => {
    setWatchlist([
      ...watchlist,
      { ...newItem, inWatchlist: true },
    ]);
  };

  const removeItem = (index) => {
    setWatchlist((prevItems) => {
      return prevItems.filter((_, i) => i !== index);
    });
  };
  return { watchlist, addItem, removeItem };
};

export default useWatchlistList;

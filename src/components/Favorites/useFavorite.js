import { useEffect, useState } from "react";

const useFavoriteHook = movie => {
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    setMyList(movie);
  }, [movie]);

  return [{ myList }, setMyList];
};

export default useFavoriteHook;

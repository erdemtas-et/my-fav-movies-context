import { createContext, useState, useEffect } from "react";

import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [states, setStates] = useState({
    movies: [],
    favourites: [],
    text: "",
  });

  const userRef = collection(db, "users");

  useEffect(() => {
    const getFav = async () => {
      const data = await getDocs(userRef);
      data.docs.map((doc) => {
        console.log(doc);
        return;
      });
    };

    getFav();
  }, []);

  const [id, setId] = useState(null);

  const handleFavourite = (id) => {
    if (!states.favourites.includes(id)) {
      setStates((prev) => {
        return {
          ...prev,
          favourites: prev.favourites.concat(id),
        };
      });
    } else {
      setStates((prev) => {
        return {
          ...prev,
          favourites: states.favourites.filter((fav) => {
            return fav !== id;
          }),
        };
      });
    }
  };

  return (
    <MovieContext.Provider
      value={{ states, setStates, id, setId, handleFavourite }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;

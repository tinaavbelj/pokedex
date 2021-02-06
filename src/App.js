import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import { device, contentWidth, xMarginMobile } from "./constants/variables";
import { API_URL, LIMIT } from "./constants/api";
import AllPokemons from "./components/AllPokemons";
import Details from "./components/Details";
import MyPokemons from "./components/MyPokemons";
import Navigation from "./components/Navigation";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [myPokemons, setMyPokemons] = useState(new Set());

  const [offset, setOffset] = useState(0);
  const [error, setError] = useState("");

  const getPokemons = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_URL}?limit=${LIMIT}&offset=${offset}`
      );

      const data = {};
      for (const item of response.data.results) {
        data[item.name] = false;
      }
      setPokemons((prevPokemons) => ({ ...prevPokemons, ...data }));
    } catch (error) {
      setError(error.response.data);
    }
  }, [offset]);

  useEffect(() => {
    getPokemons();
  }, [getPokemons]);

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + LIMIT);
  };

  const handleAddPokemon = (name) => {
    setMyPokemons((prevMyPokemons) => {
      const newMyPokemons = new Set(prevMyPokemons);
      newMyPokemons.add(name);
      return newMyPokemons;
    });

    setPokemons((prevPokemons) => ({
      ...prevPokemons,
      [name]: true,
    }));
  };

  const handleRemovePokemon = (name) => {
    setMyPokemons((prevMyPokemons) => {
      const newMyPokemons = new Set(prevMyPokemons);
      newMyPokemons.delete(name);
      return newMyPokemons;
    });

    setPokemons((prevPokemons) => ({
      ...prevPokemons,
      [name]: false,
    }));
  };

  return (
    <Router>
      <Content>
        <Navigation />
        <Switch>
          <Route path="/my-pokemons">
            <MyPokemons
              myPokemons={myPokemons}
              onRemovePokemon={handleRemovePokemon}
              error={error}
            />
          </Route>
          <Route path="/pokemon/:name">
            <Details />
          </Route>
          <Route path="/">
            <AllPokemons
              pokemons={pokemons}
              onAddPokemon={handleAddPokemon}
              onRemovePokemon={handleRemovePokemon}
              onLoadMore={handleLoadMore}
            />
          </Route>
        </Switch>
      </Content>
    </Router>
  );
};

const Content = styled.div`
  max-width: ${contentWidth};
  padding: 40px ${xMarginMobile};
  margin: auto;

  @media ${device.laptop} {
    padding: 40px 0;
  }
`;

export default App;

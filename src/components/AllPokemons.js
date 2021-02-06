import React from "react";
import styled from "styled-components";

import { colors } from "../constants/variables";
import loader from "../assets/loader.svg";

import PokemonItem from "./shared/PokemonItem";

const AllPokemons = ({
  pokemons,
  onAddPokemon,
  onRemovePokemon,
  onLoadMore,
  hasNext,
  error,
}) => {
  const buttonAdd = { text: "Add to My Pokemons", action: onAddPokemon };
  const buttonRemove = {
    text: "Remove from My Pokemons",
    action: onRemovePokemon,
  };

  return (
    <Wrapper>
      {error && <div>{error}</div>}
      {Object.keys(pokemons).length > 0 && !error ? (
        Object.entries(pokemons).map(([name, favorite]) => (
          <PokemonItem
            key={name}
            name={name}
            button={favorite ? buttonRemove : buttonAdd}
          />
        ))
      ) : (
        <img src={loader} alt="loader" />
      )}
      {hasNext && (
        <LoadMoreWrapper>
          <LoadMoreButton onClick={onLoadMore}>Load more</LoadMoreButton>
        </LoadMoreWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadMoreWrapper = styled.div`
  margin-top: 48px;
`;

const LoadMoreButton = styled.button`
  cursor: pointer;
  border: 1px solid ${colors.primary};
  background-color: ${colors.white};
  color: ${colors.primary};
  padding: 10px 24px;
  border-radius: 8px;

  &:hover {
    background-color: ${colors.primary};
    color: ${colors.white};
  }
`;

export default AllPokemons;

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors } from "../constants/variables";

import PokemonItem from "./shared/PokemonItem";

const MyPokemons = ({ myPokemons, onRemovePokemon }) => {
  const button = { text: "Remove from My Pokemons", action: onRemovePokemon };
  return (
    <Wrapper>
      {myPokemons.size > 0 ? (
        <>
          <div>Total: {Array.from(myPokemons).length}</div>
          {Array.from(myPokemons).map((name) => (
            <PokemonItem key={name} name={name} button={button} />
          ))}
        </>
      ) : (
        <NoPokemonsWrapper>
          <NoPokemonsText>You don't have any Pokemons.</NoPokemonsText>
          <div>
            Go to <StyledLink to="/">All Pokemons</StyledLink> and add Pokemons.
          </div>
        </NoPokemonsWrapper>
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

const NoPokemonsWrapper = styled.div`
  text-align: center;
`;

const NoPokemonsText = styled.div`
  margin-bottom: 32px;
`;

const StyledLink = styled(Link)`
  color: ${colors.primary};
  &:hover {
    color: ${colors.primaryLight};
  }
`;

export default MyPokemons;

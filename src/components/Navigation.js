import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { colors } from "../constants/variables";

const Navigation = () => (
  <Wrapper>
    <Title>Pokedex</Title>
    <Links>
      <StyledLink to="/" exact={true} activeClassName="selected">
        All Pokemons
      </StyledLink>
      <StyledLink to="/my-pokemons" activeClassName="selected">
        My Pokemons
      </StyledLink>
    </Links>
  </Wrapper>
);

const Wrapper = styled.div`
  margin-bottom: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.div`
  margin-bottom: 20px;
  font-size: 32px;
  font-weight: 600;
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .selected {
    text-decoration: underline;
  }
`;

const StyledLink = styled(NavLink)`
  cursor: pointer;
  text-transform: uppercase;
  color: ${colors.text};
  &:not(:first-child) {
    margin-left: 20px;
  }

  &:hover {
    color: ${colors.primary};
  }
`;

export default Navigation;

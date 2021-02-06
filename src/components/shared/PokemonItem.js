import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors, device } from "../../constants/variables";

const PokemonItem = ({ name, button }) => {
  const handleClick = (event) => {
    event.preventDefault();
    button.action(name);
  };

  return (
    <StyledLink to={`/pokemon/${name}`}>
      <Item>
        <Name>{name}</Name>
        <Button onClick={handleClick}>{button.text}</Button>
      </Item>
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  width: 100%;
  color: ${colors.text};

  &:not(:first-child) {
    margin-top: 32px;
  }
`;

const Name = styled.div`
  text-transform: capitalize;
`;

const Item = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  box-shadow: 5px 5px 18px rgb(27, 5, 107, 0.1);
  transition: box-shadow 0.2s ease-out;

  @media ${device.laptop} {
    flex-direction: row;
  }

  &:hover {
    box-shadow: 5px 5px 18px rgb(27, 5, 107, 0.18);

    ${Name} {
      color: ${colors.primary};
    }
  }
`;

const Button = styled.button`
  cursor: pointer;
  border: 1px solid ${colors.primary};
  background-color: ${colors.white};
  color: ${colors.primary};
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  margin-top: 16px;

  &:hover {
    background-color: ${colors.primary};
    color: ${colors.white};
  }

  @media ${device.laptop} {
    margin-top: 0;
  }
`;

export default PokemonItem;

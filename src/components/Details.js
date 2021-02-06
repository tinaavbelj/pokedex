import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { API_URL } from "../constants/api";

const Details = () => {
  const { name } = useParams();

  const [pokemon, setPokemon] = useState();
  const [abilities, setAbilities] = useState();

  const [error, setError] = useState("");

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const response = await axios.get(`${API_URL}/${name}`);
        setPokemon(response.data);
      } catch (error) {
        setError(error.response.data);
      }
    };

    getPokemon();
  }, [name]);

  const getAbility = async (ability) => {
    try {
      const response = await axios.get(ability.url);
      setAbilities((prevAbilities) => ({
        ...prevAbilities,
        [ability.name]: response.data,
      }));
    } catch (error) {
      setError(error.response.data);
    }
  };

  useEffect(() => {
    if (pokemon) {
      pokemon.abilities.forEach((item) => getAbility(item.ability));
    }
  }, [pokemon]);

  const getAbilityInEnglish = (ability) => {
    for (const entry of ability.effect_entries) {
      if (entry.language.name === "en") {
        return entry.effect;
      }
    }
    return "";
  };

  return (
    <Wrapper>
      {error && <div>{error}</div>}
      {pokemon && !error && (
        <>
          <Name>{name}</Name>
          <Title>Stats</Title>
          <Text>{pokemon.stats.map((item) => item.stat.name).join(", ")}</Text>

          <Title>Moves</Title>
          <Text>{pokemon.moves.map((item) => item.move.name).join(", ")}</Text>

          {abilities && (
            <>
              <Title>Abilities</Title>
              {Object.keys(abilities).map((key) => (
                <Fragment key={key}>
                  <Text>{key}</Text>
                  <Description>
                    {getAbilityInEnglish(abilities[key])}
                  </Description>
                </Fragment>
              ))}
            </>
          )}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
`;

const Name = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  text-transform: capitalize;
  margin-bottom: 40px;
`;

const Title = styled.div`
  text-transform: uppercase;
  font-weight: 700;

  &:not(:first-child) {
    margin-top: 48px;
  }
`;

const Text = styled.div`
  margin-top: 16px;
  font-weight: 400;
`;

const Description = styled.div`
  margin-top: 4px;
  font-weight: 400;
  font-size: 13px;
`;

export default Details;

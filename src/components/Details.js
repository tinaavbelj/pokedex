import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { API_URL } from "../constants/api";
import loader from "../assets/loader.svg";

const Details = () => {
  const { name } = useParams();

  const [pokemon, setPokemon] = useState();
  const [abilities, setAbilities] = useState();
  const [species, setSpecies] = useState();
  const [images, setImages] = useState();

  const [isLoadingPokemon, setIsLoadingPokemon] = useState(true);
  const [isLoadingSpecies, setIsLoadingSpecies] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const getPokemon = async () => {
      setIsLoadingPokemon(true);
      try {
        const response = await axios.get(`${API_URL}/${name}`);
        setPokemon(response.data);
      } catch (error) {
        setError(error.response.data);
      }
      setIsLoadingPokemon(false);
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

  const getSpecies = async (species) => {
    setIsLoadingSpecies(true);
    try {
      const response = await axios.get(species.url);
      setSpecies(response.data);
    } catch (error) {
      setError(error.response.data);
    }
    setIsLoadingSpecies(false);
  };

  useEffect(() => {
    if (pokemon) {
      pokemon.abilities.forEach((item) => getAbility(item.ability));
      getSpecies(pokemon.species);

      const imageUrls = Object.entries(pokemon.sprites)
        .filter(([key, url]) => !["other", "versions"].includes(key))
        .map(([_, url]) => url)
        .filter((url) => Boolean(url));
      setImages(imageUrls);
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

  const isLoading = isLoadingPokemon || isLoadingSpecies;

  return (
    <Wrapper>
      {isLoading ? (
        <LoaderWrapper>
          <img src={loader} alt="loader" />
        </LoaderWrapper>
      ) : (
        <>
          {error && <div>{error}</div>}
          {pokemon && !error && (
            <>
              <Name>{name}</Name>

              {species && !error && (
                <Information>
                  <Item>
                    <Title>Height</Title>
                    <Text>{(pokemon.height * 0.1).toFixed(1) + " m"}</Text>
                  </Item>
                  <Item>
                    <Title>Weight</Title>
                    <Text>{(pokemon.weight * 0.1).toFixed(1) + " kg"}</Text>
                  </Item>
                  <Item>
                    <Title>Base experience</Title>
                    <Text>{pokemon.base_experience}</Text>
                  </Item>
                  <Item>
                    <Title>Color</Title>
                    <Text>{species.color.name}</Text>
                  </Item>
                  <Item>
                    <Title>Catch rate</Title>
                    <Text>{species.capture_rate}</Text>
                  </Item>
                  <Item>
                    <Title>Base happiness</Title>
                    <Text>{species.base_happiness}</Text>
                  </Item>
                  <Item>
                    <Title>Shape</Title>
                    <Text>{species.shape.name}</Text>
                  </Item>
                  <Item>
                    <Title>Habitat</Title>
                    <Text>{species.habitat.name.replace("-", " ")}</Text>
                  </Item>
                  <Item>
                    <Title>Egg groups</Title>
                    <Text>
                      {species.egg_groups.map((group) => group.name).join(", ")}
                    </Text>
                  </Item>
                </Information>
              )}

              {images && (
                <>
                  <ImagesWrapper>
                    {images.map((image, index) => (
                      <Image src={image} key={index} alt={"image"} />
                    ))}
                  </ImagesWrapper>
                </>
              )}

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

              <Title>Stats</Title>
              <Text>
                {pokemon.stats
                  .map((item) => item.stat.name.replace("-", " "))
                  .join(", ")}
              </Text>
              <Title>Moves</Title>
              <Text>
                {pokemon.moves
                  .map((item) => item.move.name.replace("-", " "))
                  .join(", ")}
              </Text>
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

const LoaderWrapper = styled.div`
  text-align: center;
`;

const Name = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  text-transform: capitalize;
  margin-bottom: 40px;
`;

const Information = styled.div`
  margin-top: 48px;
  display: grid;
  grid-gap: 32px 24px;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
`;

const Item = styled.div`
  box-shadow: 5px 5px 18px rgb(27, 5, 107, 0.1);
  padding: 16px;
  border-radius: 8px;
`;

const ImagesWrapper = styled.div`
  margin-top: 48px;
  text-align: center;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  margin: 8px;
  object-fit: cover;
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

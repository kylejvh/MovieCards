import React, { useState, useRef } from "react";
import styled from "styled-components";

import Cast from "./Cast";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  margin: 0 3em;
`;

const Heading = styled.h1`
  font-family: "Titillium Web", sans-serif;
  font-size: 1.5em;
  font-weight: 600;
  text-shadow: -1px -1px 1px #aaa, 0px 4px 1px rgba(0, 0, 0, 0.5),
    4px 4px 5px rgba(0, 0, 0, 0.7), 0px 0px 7px rgba(0, 0, 0, 0.4);
  margin: 0;
  padding: 0;
`;

const CastContainer = styled.div`
  display: flex;
  margin-bottom: 3em;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1.5em 1fr 1.5em;

  /* Direct children will be containerized with a 20px gap on both ends, keeping content off the edges */
`;

const HorizontalContainer = styled.div`
  display: flex;
  overflow-x: scroll;

  padding: 0;
  margin: 0;
`;

const CastCard = styled.div`
  margin: 1em 1.5em;
  display: flex;
  flex-flow: column;
  align-items: center;

  :first-child {
    margin: 1em 1.5em 1em 0;
    align-items: center;
  }
`;

const CastImg = styled.img`
  border-radius: 15px;
  :hover {
    cursor: pointer;
  }
  max-height: 10em;
  height: 6.5em;
`;

const Text = styled.p`
  margin: 0.5em 0;
`;

const CastText = styled(Text)`
  margin: 0.25em;
  text-align: center;
`;

const ActorText = styled(CastText)`
  margin-top: 0;
  color: grey;
`;

const CrewContainer = styled.div`
  display: flex;
  margin: 0.5em 0 1em 0;
`;

const CrewColumn = styled(CrewContainer)`
  flex-flow: column;
  margin: 0 2em 0 0;
`;

const Credits = props => {
  const tempPersonURL = "https://image.tmdb.org/t/p/w500";
  const { cast, crew } = props.credits;

  // const otherWriters = crew.writers.map(person => person.name).join(", ");

  // Styles for Cast info

  //   const findCrew = (arr, job, optJob) => {
  //     for (let i = 0; i < arr.length; i++) {
  //       if (arr[i].job === job) {

  //         return ...arr[i].name;
  //       } else if (optJob && arr[i].job === optJob) {
  //         return [...arr[i].name];
  //       }
  //     }
  //   };

  const director = crew.find(person => person.job === "Director").name;

  let composer;
  if (crew.find(person => person.job === "Original Music Composer")) {
    composer = crew.find(person => person.job === "Original Music Composer")
      .name;
  } else {
    composer = "Not Available";
  }

  const writers = crew
    .filter(person => person.job === "Screenplay" || person.job === "Writer")
    .map(person => person.name)
    .join(", ");

  const [canScrollRight, setCanScrollRight] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const checkForOverflow = () => {
    const { scrollWidth, clientWidth } = this.container;
    const hasOverflow = scrollWidth > clientWidth;

    this.setState({ hasOverflow });
  };

  const renderControls = () => {};

  const refContainer = useRef(null);

  const scrollContainerBy = distance => {
    refContainer.current.scrollBy({ left: distance, behavior: "smooth" });
  };

  /* {console.log(director, "d")}
            {console.log(composer, "c")}
            {console.log(crew, "crew")} */

  /* {crew ? (
              <div style={{ display: "flex", width: "100%" }}>
                {crew.slice(0, 5).map(person => {
                  return (
                    <CastContainer key={person.id}>
                      <CastImg
                        src={tempPersonURL + person.profile_path}
                        alt={`Cast member: ${person.name}`}
                      />
                      <CastText>{person.character}</CastText>
                      <CastPerson>{person.name}</CastPerson>
                    </CastContainer>
                  );
                })}
              </div> 
            ) : null} */

  return (
    <>
      <Wrapper>
        <Heading>Crew</Heading>
        <CrewContainer>
          <CrewColumn>
            <Text>Director: </Text>
            <Text> Screenplay: </Text>
            <Text>Music:</Text>
          </CrewColumn>
          <CrewColumn>
            <Text>{director} </Text>
            <Text> {writers} </Text>
            <Text>{composer}</Text>
          </CrewColumn>
        </CrewContainer>
        <Cast cast={cast} />
      </Wrapper>
    </>
  );
};

export default Credits;

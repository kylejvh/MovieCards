import React from "react";
import styled from "styled-components";

import { connect } from "react-redux";

const CrewContainer = styled.div`
  display: flex;
  position: relative;

  margin: auto 0 12em 2em;

  @media screen and (max-width: 1023px) {
    margin: auto 0 1em 2.5em;
  }

  @media screen and (max-width: 599px) {
    margin: auto 0 0.75em 1.5em;
  }

  @media screen and (max-width: 376px) {
    margin: auto 0 0.75em 3.5em;
    font-size: 12px;
  }
`;

const CrewColumn = styled(CrewContainer)`
  flex-flow: column;
  margin: 0 1em;

  @media screen and (max-width: 399px) {
    margin: 0 0.5em;
  }
`;

const CrewHeading = styled.h1`
  font-family: "Titillium Web", sans-serif;
  font-size: 1.1em;
  font-weight: 600;
  text-shadow: -1px -1px 1px #aaa, 0px 4px 1px rgba(0, 0, 0, 0.5),
    4px 4px 5px rgba(0, 0, 0, 0.7), 0px 0px 7px rgba(0, 0, 0, 0.4);
  margin: 0.5em 0;
  padding: 0;
`;

const CrewText = styled.p`
  font-size: 1em;
  margin: 0;
  padding: 0;
`;

const MainTitle = styled.h1`
  position: absolute;
  left: 1em;
  top: -5em;

  @media screen and (max-width: 1023px) {
    top: -2.5em;
  }
`;

const Crew = ({ crew = [] }) => {
  // Styles for Cast info

  // const CastPerson = {
  //   fontSize: ".7em",
  //   margin: 0,
  //   padding: 0,
  //   textAlign: "center",
  //   color: "grey"
  // };

  // const castLayout = cast.map((person, i) => {
  //   return (
  //     <CastContainer key={i}>
  //       <CastImg
  //         src={tempPersonURL + person.profile_path}
  //         alt={`Cast member: ${person.name}`}
  //       />
  //       <CastText>{person.character}</CastText>
  //       <CastPerson>{person.name}</CastPerson>
  //     </CastContainer>
  //   );
  // });

  const findPersonWithJob = (crew = [], jobName = "") => {
    let searchedPerson = crew.find((person) => person.job === jobName);

    if (searchedPerson) {
      return searchedPerson.name;
    } else {
      return "Not Available";
    }
  };

  const director = findPersonWithJob(crew, "Director");

  const composer = findPersonWithJob(crew, "Original Music Composer");

  const writers = crew
    .filter((person) => person.job === "Screenplay" || person.job === "Writer")
    .map((person) => person.name)
    .join(", ");

  return (
    <CrewContainer>
      <MainTitle>Cast & Crew</MainTitle>
      <CrewColumn>
        <CrewHeading>Director: </CrewHeading>
        <CrewText>{director} </CrewText>
      </CrewColumn>

      <CrewColumn>
        <CrewHeading> Screenplay: </CrewHeading>
        <CrewText> {writers} </CrewText>
      </CrewColumn>

      <CrewColumn>
        <CrewHeading>Music:</CrewHeading>
        <CrewText>{composer}</CrewText>
      </CrewColumn>

      {/* 
      <CrewColumn>
        <CrewHeading>Director: </CrewHeading>
        <CrewText>{director} </CrewText>
        <CrewHeading> Screenplay: </CrewHeading>
        <CrewText> {writers} </CrewText>
        <CrewHeading>Music:</CrewHeading>
        <CrewText>{composer}</CrewText>
      </CrewColumn> */}
    </CrewContainer>
  );
};

const mapStateToProps = ({ movie }) => ({
  crew: movie.credits.crew,
});

export default connect(mapStateToProps)(Crew);

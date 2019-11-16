import React from "react";

import styled from "styled-components";

const CastContainer = styled.div`
  margin: 0 0.25em 0em 0.25em;
  display: flex;
  flex-flow: column;
`;

const CastImg = styled.img`
  align-self: center;
  border-radius: 50%;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.27);
  height: auto;
  width: 3em;
`;

const CastText = styled.p`
  font-size: 0.7em;
  margin: 0.25em;
  padding: 0;
  text-align: center;
`;

const CastPerson = styled(CastText)`
  margin: 0;
  color: grey;
`;

const Crew = props => {
  const crew = props.crew;
  // Styles for Cast info

  //   const CastPerson = {
  //     fontSize: ".7em",
  //     margin: 0,
  //     padding: 0,
  //     textAlign: "center",
  //     color: "grey"
  //   };

  const writers = crew.map(person => {
    return <CastText>{person.name}</CastText>;
  });

  // prettier-ignore
  return (
    <>
    <CastText>Director: {crew.director.name}</CastText>
    <CastText>Music: {crew.composer.name}</CastText>
      <CastText>Writing: {writers}</CastText>
    </>
  );
};

export default Crew;

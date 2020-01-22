import React from "react";

import styled from "styled-components";

const CastContainer = styled.div`
  margin: 0 0.25em 0em 0.25em;
  display: flex;
  flex-flow: column;
  width: 7rem;
`;

const CastImg = styled.img`
  align-self: center;
  border-radius: 15%;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.27);
  height: 6rem;
  width: auto;
`;

const CastText = styled.p`
  font-size: 0.7rem;
  margin: 0.25em;

  padding: 0;
  text-align: center;
`;

const CastPerson = styled(CastText)`
  margin: 0;
  color: grey;
`;

const Cast = props => {
  const tempPersonURL = "https://image.tmdb.org/t/p/w500";
  const { cast } = props;

  // Styles for Cast info

  //   const CastPerson = {
  //     fontSize: ".7em",
  //     margin: 0,
  //     padding: 0,
  //     textAlign: "center",
  //     color: "grey"
  //   };

  const castLayout = cast.map(person => {
    return (
      <CastContainer>
        <CastImg
          src={tempPersonURL + person.profile_path}
          alt={`Cast member: ${person.name}`}
        />
        <CastText>{person.character}</CastText>
        <CastPerson>{person.name}</CastPerson>
      </CastContainer>
    );
  });

  // prettier-ignore
  return (
    <>
      {castLayout}
    </>
  );
};

export default Cast;

import React from "react";
import styled from "styled-components";

const CastContainer = styled.div`
  margin: 0 2em;
  display: flex;
  flex-flow: column;
`;

const CastImg = styled.img`
  align-self: center;
  border-radius: 15%;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.27);
  max-width: 100%;
  max-height: 100%;
`;

const CastText = styled.p`
  font-size: 1;
  margin: 0.25em;

  padding: 0;
  text-align: center;
`;

const CastPerson = styled(CastText)`
  margin: 0;
  color: grey;
`;

const Credits = props => {
  const { cast, crew } = props.credits;
  const tempPersonURL = "https://image.tmdb.org/t/p/w500";
  {
    console.log(cast);
  }
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

  const findCrew = (arr, key, optKey) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].job === key) {
        return arr[i].name;
      } else if (optKey && arr[i].job === optKey) {
        return arr[i].name;
      } else {
        return;
      }
    }
  };

  const director = findCrew(crew, "Director");

  const composer = findCrew(crew, "Composer", "Original Music Composer");

  const writers = findCrew(crew, "Writer", "Screenplay");

  // const otherWriters = crew.writers.map(person => person.name).join(", ");

  const crewDetails = (
    <>
      <CastText>Director: {director} </CastText>
      <CastText>Music: {composer} </CastText>
      {/* <CastText>Writing: {writers.join(", ")}</CastText> */}
    </>
  );

  return (
    <>
      {console.log(writers)}
      {console.log(director, "d")}
      {console.log(composer, "c")}
      {console.log(crew, "crew")}
      {cast ? (
        <div style={{ display: "flex", width: "100%" }}>
          {cast.slice(0, 5).map(person => {
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
      ) : null}
      ;
    </>
  );
};

export default Credits;

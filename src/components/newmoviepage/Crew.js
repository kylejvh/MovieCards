import React from "react";
import styled from "styled-components";

const CrewContainer = styled.div`
  display: flex;
`;

const CrewColumn = styled(CrewContainer)`
  flex-flow: column;
`;

const CrewHeading = styled.h1`
  font-family: "Titillium Web", sans-serif;
  font-size: 1.25em;
  font-weight: 600;
  text-shadow: -1px -1px 1px #aaa, 0px 4px 1px rgba(0, 0, 0, 0.5),
    4px 4px 5px rgba(0, 0, 0, 0.7), 0px 0px 7px rgba(0, 0, 0, 0.4);
  margin: 0;
  padding: 0;
`;

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

const CrewText = styled.p`
  font-size: 1;
  margin: 0.25em;
  padding: 0;
`;

const CastPerson = styled(CrewText)`
  margin: 0;
  color: grey;
`;

const Crew = props => {
  const { crew } = props;
  const tempPersonURL = "https://image.tmdb.org/t/p/w500";
  {
    console.log(crew, "From crew");
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

  //   const findCrew = (arr, job, optJob) => {
  //     for (let i = 0; i < arr.length; i++) {
  //       if (arr[i].job === job) {

  //         return ...arr[i].name;
  //       } else if (optJob && arr[i].job === optJob) {
  //         return [...arr[i].name];
  //       }
  //     }
  //   };

  //   const director = findCrew(crew, "Director");

  //   const composer = findCrew(crew, "Composer", "Original Music Composer");

  const director = crew.find(person => person.job === "Director").name;

  const composer = crew.find(person => person.job === "Original Music Composer")
    .name;

  //   const writers = crew.find(person => person.job === "Screenplay");

  const writers = crew
    .filter(person => person.job === "Screenplay" || person.job === "Writer")
    .map(person => person.name)
    .join(", ");

  // const otherWriters = crew.writers

  const crewDetails = (
    <>{/* <CastText>Writing: {writers.join(", ")}</CastText> */}</>
  );

  return (
    <>
      <CrewHeading>Crew</CrewHeading>
      <CrewContainer>
        <CrewColumn>
          <CrewText>Director: </CrewText>
          <CrewText> Screenplay: </CrewText>
          <CrewText>Music:</CrewText>
        </CrewColumn>
        <CrewColumn>
          <CrewText>{director} </CrewText>
          <CrewText> {writers} </CrewText>
          <CrewText>{composer}</CrewText>
        </CrewColumn>
      </CrewContainer>

      {/* {console.log(director, "d")}
      {console.log(composer, "c")}
      {console.log(crew, "crew")} */}
      {/* {crew ? (
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
      ) : null} */}
    </>
  );
};

export default Crew;

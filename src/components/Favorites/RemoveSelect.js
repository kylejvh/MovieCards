import React from "react";
import styled from "styled-components";

const StyledCheckbox = styled.input`
  width: 100px;
  height: 100px;
  background-color: red;
  color: red;
  position: absolute;
  top: 50%;
  right: 50%;
  text-shadow: #2c3949;
  margin: 0.25rem;
  padding: 0.3rem;
  border-radius: 10%;
`;

const RemoveSelect = props => {
  // need a button for
  // Remove Mode
  // Remove Confirm
  // Remove Select Checkbox
  // On click of input checkbox, delete the entry from mylist.
  // do this in an immutable fashion?

  // removeselect should be aware of the movie
  // and if the movie has state of checked
  // hangle it

  console.log();

  // pass in movie.id

  const handleCheck = event => {
    console.log(event.target);
  };

  return (
    <>
      <StyledCheckbox
        name="MarkedForDelete"
        type="checkbox"
        id="checkboxer"
        onChange={props.handleCheckboxChange}
      />
    </>
  );
};

export default RemoveSelect;

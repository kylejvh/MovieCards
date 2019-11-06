import React from "react";

const HeaderButton = props => {
  return (
    <div>
      <button onClick={props.onClick}>{props.buttonTitle}</button>
    </div>
  );
};

export default HeaderButton;

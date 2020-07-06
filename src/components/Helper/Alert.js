import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const StyledAlert = styled.div`
  margin: 0.5rem;
  padding: 0.3rem 0.5rem;
  border: none;
  outline: none;
  border-radius: 0.8em;
  color: white;
  font-size: 1.1rem;
  transition: background 250ms ease-in-out, transform 150ms ease;
  text-decoration: none;
  background: #2769b4;

  :hover {
    cursor: pointer;
    background: #008080;
  }

  :active {
    transform: scale(1.1);
  }
`;

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);

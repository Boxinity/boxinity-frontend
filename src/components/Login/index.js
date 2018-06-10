import React from "react";
import {
  Jumbotron,
  PageHeader,
  FormGroup,
  ControlLabel,
  FormControl,
  ButtonToolbar,
  Button,
  Alert,
} from "react-bootstrap";

const getValidationState = (username, password) => {
  if (!username && !password) return null;
  if (!username) return "warning";
  if (!password) return "warning";
  return "success";
};

const Login = ({
  username, password, email, errorMsg, wannaJoin,
  onChangeUsername, onChangePassword, onChangeEmail,
  onClickJoin, onClickLogin,
  toggleWannaJoin,
}) => {
  const pageType = wannaJoin ? "Join" : "Login";

  return (
    <Jumbotron>
      <PageHeader>Boxinity { pageType }</PageHeader>
      {
        errorMsg &&
        <Alert bsStyle="danger">
          <h4>Failed to {pageType}</h4>
          {errorMsg}
        </Alert>
      }

      <form>
        <FormGroup
          controlId="username"
          validationState={getValidationState(username, password)}
        >
          <ControlLabel>UserName</ControlLabel>
          <FormControl
            type="text"
            label="UserName"
            value={username}
            placeholder="Enter User Name"
            onChange={onChangeUsername}
          />
        </FormGroup>

        <FormGroup
          controlId="password"
          validationState={getValidationState(username, password)}
        >
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            label="Password"
            value={password}
            placeholder="Enter Password"
            onChange={onChangePassword}
          />
        </FormGroup>

        {
          wannaJoin && <FormGroup
            controlId="email"
            validationState={getValidationState(username, password, email)}
          >
            <ControlLabel>Email</ControlLabel>
            <FormControl
              type="email"
              label="email"
              value={email}
              placeholder="Enter Email"
              onChange={onChangeEmail}
            />
          </FormGroup>
        }

        <ButtonToolbar>
          <Button bsStyle="info" onClick={toggleWannaJoin}>
            {wannaJoin ? "Go to login" : "Go to join"}
          </Button>

          <Button bsStyle="primary" onClick={wannaJoin ? onClickJoin : onClickLogin}>
            {wannaJoin ? "Join" : "Login"}
          </Button>
        </ButtonToolbar>
      </form>
    </Jumbotron>
  );
};

export default Login;

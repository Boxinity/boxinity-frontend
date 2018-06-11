import React, {Component} from "react";
import Navbar from "../Navbar";
import Map from "../Map";
import Login from "../Login";
import autoBind from "react-autobind";
import axios from "axios";

import { API_URL } from "../../config";


class App extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      // user instance
      user: null,

      // login info
      username: "",
      password: "",
      email: "",
      errorMsg: "",

      // whether join page or not
      wannaJoin: false,
    };
  }

  // 회원가입 수행
  onClickJoin() {
    axios.post(`${API_URL}/users/`, {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
    }).then(res => {
      const user = {
        ...this.state,
        ...res.data
      };
      // 회원가입 성공
      this.setUser(user);
      this.clearJoinInfos();
    }).catch(error => {
      if (error.response) {
        const data = error.response.data;

        // 회원가입 실패. 실패 메시지 저장
        let errMsg = "";

        if (data.username) {
          errMsg += "UserName:" + data.username.join(", ") + "\n";
        }

        if (data.password) {
          errMsg += "Password:" + data.password.join(", ") + "\n";
        }

        if (data.email) {
          errMsg += "Email:" + data.email.join(", ") + "\n";
        }

        this.setErrorMsg(errMsg);
      }
    });
  }

  // 로그인 기능 수행
  onClickLogin() {
    axios.post(`${API_URL}/users/login/`, {
      username: this.state.username,
      password: this.state.password,
    }).then(res => {
      const user = {
        ...this.state,
        ...res.data
      };
      // 로그인 성공
      this.setUser(user);
      this.clearJoinInfos();
    }).catch(error => {
      if (error.response) {
        const data = error.response.data;
        // 로그인 실패
        let errMsg = "";

        if (data.non_field_errors) {
          errMsg += "Errors:" + data.non_field_errors.join(", ") + "\n";
        }

        if (data.username) {
          errMsg += "UserName:" + data.username.join(", ") + "\n";
        }

        if (data.password) {
          errMsg += "Password:" + data.password.join(", ") + "\n";
        }

        if (data.email) {
          errMsg += "Email:" + data.email.join(", ") + "\n";
        }

        this.setErrorMsg(errMsg);
      }
    });
  }


  // 상태 저장 함수들
  // 유저 정보 저장
  setUser(user) {
    this.setState({
      user: user,
    });
  }

  // 회원가입 정보 저장
  clearJoinInfos() {
    this.setState({
      username: "",
      password: "",
      email: "",
    });
  }
  onChangeUsername (e) {
    this.setState({ username: e.target.value });
  }

  onChangePassword (e) {
    this.setState({ password: e.target.value });
  }

  onChangeEmail (e) {
    this.setState({ email: e.target.value });
  }

  // 로그인 페이지 <-> 회원가입 페이지
  toggleWannaJoin() {
    this.setState({wannaJoin: !this.state.wannaJoin});
  }

  setErrorMsg(errorMsg) {
    this.setState({errorMsg: errorMsg});
  }

  logout() {
    this.setState({user: null});
  }


  render () {
    const { user, username, password, email, errorMsg, wannaJoin } = this.state;
    console.log("App", user);

    return (
      <div className="App">
        <Navbar user={user} logout={this.logout} />

        { !user &&
          <Login
            // states
            username={username} password={password} email={email} wannaJoin={wannaJoin}
            errorMsg={errorMsg}

            // setters
            onChangeUsername={this.onChangeUsername}
            onChangePassword={this.onChangePassword}
            onChangeEmail={this.onChangeEmail}
            onClickJoin={this.onClickJoin}
            onClickLogin={this.onClickLogin}
            toggleWannaJoin={this.toggleWannaJoin}
          />}
        { user && <Map user={user} />}
      </div>
    );
  }
}

export default App;

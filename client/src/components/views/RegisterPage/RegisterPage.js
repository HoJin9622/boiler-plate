import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_actions";
import { withRouter } from "react-router-dom";

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = event => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = event => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = event => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = event => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = event => {
    event.preventDefault(); // 페이지가 refresh 되는 것을 막아준다. 페이지가 refresh가 되면 원래 해야 할 것들을 못한다.

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    let body = {
      email: Email,
      password: Password,
      name: Name
    };

    dispatch(registerUser(body)).then(response => {
      // _actions 폴더에 user_actions.js 파일이 있어야함.
      if (response.payload.success) {
        props.history.push("/login");
      } else {
        alert("Failed to sign up");
      }
    });

    /*     axios.post("/api/users/login", body).then(response => {

    }) */ // 이 작업을 user_actions.js 에서 해줌.
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh"
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <label>Confirm Password</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />

        <br />
        <button type="submit">회원 가입</button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);

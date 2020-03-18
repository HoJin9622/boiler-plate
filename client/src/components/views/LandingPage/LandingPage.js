import React, { useEffect } from "react";
import axios from "axios";
import { PromiseProvider } from "mongoose";

function LandingPage(props) {
  useEffect(() => {
    axios.get("/api/hello").then(response => console.log(response)); // http://localhost:5000/api/hello 에 localhost를 빼줘야함
  }, []);

  const onClickHandler = () => {
    axios.get(`/api/users/logout`).then(response => {
      console.log(response.data);
      if (response.data.success) {
        props.history.push("/login");
      } else {
        alert("로그아웃 실패");
      }
    });
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
      <h2>시작페이지</h2>

      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  );
}

export default LandingPage;

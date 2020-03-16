import React, { useEffect } from "react";
import axios from "axios";

function LandingPage() {
  useEffect(() => {
    axios.get("/api/hello").then(response => console.log(response)); // http://localhost:5000/api/hello 에 localhost를 빼줘야함
  }, []);

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
    </div>
  );
}

export default LandingPage;

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_actions";

export default function(SpecificComponent, option, adminRoute = null) {
  // null option => 아무나 출입이 가능한 페이지
  // true option => login한 유저만 출입이 가능한 페이지
  // false option => login 한 유저는 출입 불가능한 페이지
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then(response => {
        console.log(response);
      });
    }, []);
  }

  return AuthenticationCheck;
}

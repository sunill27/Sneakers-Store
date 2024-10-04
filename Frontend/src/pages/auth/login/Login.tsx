import Form from "../Form";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { login, resetStatus } from "../../../store/authSlice";
import { Status } from "../../../globals/components/types/authType";
import { UserLoginData } from "../types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleLogin = async (data: UserLoginData) => {
    dispatch(login(data));
  };
  useEffect(() => {
    if (status === Status.SUCCESS) {
      dispatch(resetStatus());
      navigate("/");
    }
    // else {
    //   alert("Something went wrong");
    // }
  }, [status, navigate, dispatch]);
  return (
    <>
      <Form type="login" onSubmit={handleLogin} />
    </>
  );
};

export default Login;

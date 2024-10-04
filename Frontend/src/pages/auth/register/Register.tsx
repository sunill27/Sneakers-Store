import Form from "../Form";
import { UserData } from "../types";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { register, resetStatus } from "../../../store/authSlice"; // Adjust the path accordingly
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Status } from "../../../globals/components/types/authType";

const Register = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleRegister = async (data: UserData) => {
    console.log(data);
    dispatch(register(data));
  };
  useEffect(() => {
    if (status === Status.SUCCESS) {
      dispatch(resetStatus());
      navigate("/login");
    }
  }, [status, navigate, dispatch]);
  return (
    <>
      <Form type="register" onSubmit={handleRegister} />
    </>
  );
};

export default Register;

import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useUpdatePasswordMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

const UpdatePasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    const id = userInfo?.userId || userInfo._id;
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password == confirmPassword) {
      try {
        const res = await updatePassword({ oldPassword:currentPassword, newPassword:password }).unwrap();

        toast.info(res.msg);
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.msg || err.error);
      }
    } else {
      toast.error("Password do not match");
    }
  };
  return (
    <FormContainer>
      <h1>Update Password</h1>

      <Form onSubmit={submitHandler}>
       <Form.Group className="my-2" controlId="currentPassword">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {isLoading && <Loader />}

        <Button type="submit" variant="primary" className="mt-3">
          Update Password
        </Button>
      </Form>
    </FormContainer>
  );
};

export default UpdatePasswordScreen;

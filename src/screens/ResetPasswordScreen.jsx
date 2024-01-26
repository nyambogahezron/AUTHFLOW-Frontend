import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useResetpasswordMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [resetpassword, { isLoading }] = useResetpasswordMutation();

  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    setEmail(userInfo?.email);
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await resetpassword({
        email,
        token: code,
        password,
      }).unwrap();
      // dispatch(setCredentials({ ...res.user }));

      navigate("/login");
      toast.info(res.msg);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.msg || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Reset Password</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="code">
          <Form.Label>Verification Code</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
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
        <Form.Group className="my-2" controlId="confirm-password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Reset password
        </Button>
      </Form>
      {isLoading && <Loader />}

      <Row className="py-3">
        <Col>
          Remember password?<Link to="/login">Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default ResetPasswordScreen;

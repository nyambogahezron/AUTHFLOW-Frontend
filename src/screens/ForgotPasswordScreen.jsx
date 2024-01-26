import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useForgotpasswordMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [forgotpassword, { isLoading }] = useForgotpasswordMutation();

  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    setEmail(userInfo?.email);
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotpassword({ email }).unwrap();
      // dispatch(setCredentials({ ...res.user }));

      navigate("/reset-password");
      toast.info(res.msg);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.msg || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Forgot Password</h1>
      <p className="mt-4">Enter Your Email To Receive Code</p>

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

        <Button type="submit" variant="primary" className="mt-3">
          Send code
        </Button>
      </Form>
      {isLoading && <Loader />}

      <Row className="py-3">
        <Col>
          Remmber password?<Link to="/login">Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default ForgotPasswordScreen;

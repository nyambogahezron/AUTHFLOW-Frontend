import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useVerifyMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const VerifyEmailScreen = () => {
  const [email, setEmail] = useState('');
  const [verificationToken, setVerificationToken] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [verifyEmail, { isLoading }] = useVerifyMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
      setEmail(userInfo?.email || '')

  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await verifyEmail({ email, verificationToken }).unwrap();
      navigate('/login');
      toast.info(res.msg)
    } catch (err) {
      toast.error(err?.data?.msg || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Verify Email</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Verification Code</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter your code'
            value={verificationToken}
            onChange={(e) => setVerificationToken(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          type='submit'
          variant='primary'
          className='mt-3'
        >
         Veify Email
        </Button>
      </Form>
      {isLoading && <Loader />}

      <Row className='py-3'>
        <Col>
          <Link to='/login'>Back</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default VerifyEmailScreen;

import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { useCurrentUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [currentUser] = useCurrentUserMutation();

  const { userInfo } = useSelector((state) => state.auth);
    useEffect(() => {
    const id = userInfo?.userId || userInfo._id
     getUser(id)
    setEmail(userInfo?.email);
    setName(userInfo?.name);

  }, [navigate]);
  // const id = userInfo?.userId | userInfo._id
 
    const getUser = async (id) => {
      try {
        const res = await currentUser(id).unwrap();
        dispatch(setCredentials({ ...res.user }));
      } catch (err) {
        console.log(err);
      }
    };



  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser({ email, name }).unwrap();
      dispatch(setCredentials({ ...res.user }));

      toast.info(res.msg);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.msg || err.error);
    }
  };
  return (
    <FormContainer>
      <h1>Update Profile</h1>
      
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {isLoading && <Loader />}

        <Button type="submit" variant="primary" className="mt-3">
          Update
        </Button>
      </Form>
       <Button className='mt-5'>
        <Link to='update-password' className='btn btn-secondary"'>Update Password</Link>
        </Button>

    </FormContainer>
  );
};

export default ProfileScreen;

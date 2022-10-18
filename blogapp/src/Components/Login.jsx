import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Heading,
    Input,
    Flex,
  } from '@chakra-ui/react';
  import styles from "./Navbar.module.css";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { store } from "../store";
import { loginUser } from "../store/userAuth/userAuth.actions";  
import { useEffect } from "react";
import { ERROR_RESET } from "../store/userAuth/userAuth.types";

function Login() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { loading, token, error } = useSelector((store) => store.userAuth);

    const login = () => {
      dispatch(loginUser({ email, password }));
      setEmail("");
      setPassword("");
      console.log(token)
    };
    useEffect(() => {
      dispatch({ type: ERROR_RESET });
    }, [error]);
    return (
      <>
        <Button onClick={onOpen}  className={styles.loginButton}>Login</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Give your details here</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
               <Input  id="email-field"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address" />
                <Input
                    id="password-field"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                 />
                  <Flex m="1rem auto" justifyContent="center">
                    <Button isLoading={loading ? true : false} onClick={login}>
                      Submit
                      </Button>
                  </Flex>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost'>Login</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
  export default Login ;
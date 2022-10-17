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
  } from '@chakra-ui/react';
  import styles from "./Navbar.module.css"

function Register() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button onClick={onOpen} className={styles.loginButton}>Register</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Register here</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
               <Input placeholder="Enter your name here" />
               <Input mt="8" placeholder="Enter your age here" />
               <Input mt="8" placeholder="Enter password here" />
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost'>Register</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
  export default Register ;
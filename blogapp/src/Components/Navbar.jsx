import { Box, Button, Flex, Heading, Image, Input } from '@chakra-ui/react';
import React from 'react';
import Login from './Login';
import styles from "./Navbar.module.css"
import Register from './Register';

export const Navbar = () => {
  return (
    <Box className={styles.topBox}>
    <Box className={styles.mainBox}>
        <Box><Image src="https://play-lh.googleusercontent.com/cWG9-bk2_zLdKsN9vsYEdbCReVfzgXU6FeHUmLI8a24FoZ05TpOLYXInCQ278FTwCw" /></Box>
        <Box> <Input placeholder='Enter anything here' /> </Box>
        <Flex>
             <Box> <Login /> </Box>
             <Box> <Register /> </Box>
             <Button w="200" mt="5" ml="5"> <a href="https://github.com/login/oauth/authorize?client_id=8d2910b68c777f1f228a">Sign up with Github</a></Button>

        </Flex>
    </Box>
    </Box>
  ) 
}

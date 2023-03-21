import React from 'react';
import { Flex, Heading, Input, Button, useColorModeValue } from '@chakra-ui/react';
import { LoginModal } from './index';

export default function Login() {
  const formBackground = useColorModeValue("gray.100", "gray.700");
  
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" >
      <Flex direction="column" background={formBackground} p={12} rounded={6} boxShadow="dark-lg">
        <Heading mb={6}>Login</Heading>
          <Input placeholder="ex: contrate@rafaelperdigao.com" variant="filled" mb={3} type="email" />
          <Input placeholder="ex: $Test123" variant="filled" mb={6} type="password" />
          <Button onClick={() => <LoginModal />} colorScheme="teal" mb={6} type="submit">Login</Button>
      </Flex>
    </Flex>
  )
}

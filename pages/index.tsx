/* eslint-disable react/no-unescaped-entities */
import { Login, TopMenu } from '@/frontend/components'
import { prisma } from '@/lib/prisma'
import { User } from '@prisma/client'
import { GetServerSideProps } from 'next';
import { Text, Flex, Button, useColorModeValue } from '@chakra-ui/react';
import { PlusSquareIcon, BellIcon } from '@chakra-ui/icons';
import { Megrim } from 'next/font/google';

const megrim = Megrim({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
})

export default function Page() {
  const formBackground = useColorModeValue("gray.100", "gray.700");
  return (
  <main>
    <TopMenu />
    <Flex 
      height="80vh" 
      alignItems="center" 
      justifyContent="center" 
    >
      <Flex 
        direction="column" 
        background={formBackground} 
        p={12} 
        rounded={6} 
        boxShadow="dark-lg"
      >
        <Text
          className={megrim.className}
          fontSize='7xl' 
          mb={6}
        >
          ParaTo-Do's
        </Text>
          <Button 
          colorScheme="teal" 
          variant="outline" 
          mb={22} 
          mt={22}
          leftIcon={<BellIcon />} 
          >
            Cadastre-se
          </Button>
          <Button 
            colorScheme="teal"
            leftIcon={<PlusSquareIcon />}
          >
            Login
          </Button>
      </Flex>
    </Flex>
  </main>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = await prisma.user.findFirst({ select: { name: true, email: true, password: true }, where: { id: 1 } })

  return {
    props: {
      user
    }
  }
}

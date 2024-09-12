import { Button, Container, Flex, HStack, Text, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { TbCopyPlusFilled } from "react-icons/tb";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

export default function Navbar() {
    const {colorMode, toggleColorMode} = useColorMode();

    return (
        <Container maxW={"1140px"} px={4} >
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{base: "column", sm: "row"}}
            >
                <Text
                    bgGradient='linear(to-l, #ed7351, #2065ec)'
                    bgClip='text'
                    fontSize={{base: "22", sm: "28"}}
                    fontWeight='bold'
                    textTransform='uppercase'
                    textAlign='center'
                >
                    <Link to={"/"}>
                        Product Store 🛒
                    </Link>
                </Text>

                <HStack spacing={2} alignItems='center' >
                    <Link to={"/create"} >
                        <Button>
                            <TbCopyPlusFilled fontSize={{base: "22", sm: "28"}}/>
                        </Button>
                    </Link>
                    <Button onClick={toggleColorMode}>
                        { colorMode === "light" 
                            ? <IoMoon fontSize={{base: "20", sm: "26"}}/> 
                            : <LuSun fontSize={{base: "20", sm: "26"}}/> }
                    </Button>
                </HStack>
            </Flex>
        </Container>
    )
}

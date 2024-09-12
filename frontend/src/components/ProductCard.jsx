import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from '@chakra-ui/react';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useProductStore } from '../store/product';
import { useState } from 'react';

export default function ProductCard({product}) {
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");


    const [updatedProduct, setUpdatedProduct] = useState(product);
    const {deleteProduct, updateProduct} = useProductStore();
    const toast = useToast();
    const {isOpen, onOpen, onClose} = useDisclosure();

    async function handleDeleteProduct (pid) {
        if (!confirm("Are you sure you want to delete it?")) return;

        const {success, message} = await deleteProduct(pid);

        if(!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 10000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 5000,
                isClosable: true,
            })
        }
    }

    async function handleUpdateProduct (pid, updatedProduct) {
        const {success, message} = await updateProduct(pid, updatedProduct);
        onClose();

        if(!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 10000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 5000,
                isClosable: true,
            })
        }
    }

    return (
        <Box
            bg={bg}
            shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{transform: 'translateY(-5px)', shadow: 'xl'}}
        >
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

            <Box p={4} >
                <Heading as='h3' size='md' mb={2} >
                    {product.name}
                </Heading>

                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4} >
                    ${product.price}
                </Text>

                <HStack>
                    <IconButton 
                        icon={<FaEdit />} 
                        onClick={onOpen} 
                        colorScheme='blue' 
                    />
                    <IconButton 
                        icon={<RiDeleteBin2Fill />} 
                        onClick={() => handleDeleteProduct(product._id)} 
                        colorScheme='red'
                    />
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />

                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                    <VStack spacing={4}>
                        <Input
                            placeholder='Product Name'
                            name='name'
                            value={updatedProduct.name}
                            onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}
                        />
                        <Input
                            placeholder='Price'
                            name='price'
                            type='number'
                            value={updatedProduct.price}
                            onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}
                        />
                        <Input
                            placeholder='Image URL'
                            name='name'
                            value={updatedProduct.image}
                            onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}
                        />
                    </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}  >
                            Update
                        </Button>
                        <Button variant='ghost' onClick={onClose} >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

import React, { useState } from 'react'
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Text,
    useToast,
    VStack,
} from '@chakra-ui/react'
import { AuthState } from '../../Context/Auth/AuthContext'
import { useNavigate } from 'react-router-dom'
const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const { register, loading } = AuthState()
    const navigate = useNavigate()
    const toast = useToast()
    const submit = async () => {
        const { error, data } = await register(email, password, name)
        if (data) {
            toast({
                title: 'Success',
                description: 'You have successfully logged in',
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
            navigate('/')
        }
        if (error) {
            toast({
                title: 'An Error Occured',
                description: error.response
                    ? error.response.data.message
                    : error.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }
    }
    return (
        <Box
            h={'100vh'}
            w={'100%'}
            display="flex"
            bgColor={'facebook.500'}
            justifyContent={'center'}
            alignItems="center"
        >
            <Box
                w={'400px'}
                h={'500px'}
                bgColor="white"
                padding={'3'}
                margin="40px 0 15px 0"
                borderRadius={'10px'}
                boxShadow="dark-lg"
            >
                <Text fontSize={'5xl'} fontWeight="bold" color={'facebook.500'}>
                    Register
                </Text>
                <VStack spacing={'15px'} pt="30px">
                    <FormControl>
                        <FormLabel fontWeight={'bold'}>Name</FormLabel>
                        <Input
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel fontWeight={'bold'}>Email</FormLabel>
                        <Input
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel fontWeight={'bold'}>Password</FormLabel>
                        <Input
                            placeholder="Password"
                            type={'password'}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>
                    <Button
                        w={'100%'}
                        size="lg"
                        onClick={submit}
                        isLoading={loading}
                        colorScheme={'facebook'}
                    >
                        Register
                    </Button>
                    <Button
                        w={'100%'}
                        size="lg"
                        onClick={() => navigate('/login')}
                        variant="outline"
                        colorScheme={'facebook'}
                    >
                        Login
                    </Button>
                </VStack>
            </Box>
        </Box>
    )
}

export default Register

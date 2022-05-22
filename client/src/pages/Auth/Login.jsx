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
import api from '../../Api/api'
const Login = () => {
    const toast = useToast()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const submit = () => {
        try {
            setLoading(true)
            if (!email || !password) {
                throw new Error('Please fill all the fields')
            }
            const { data } = api.post('/user/login', { email, password })
        } catch (error) {
            setLoading(false)
            toast({
                title: 'Error',
                description: error.response
                    ? error.response.data.message
                    : error.message,
                status: 'error',
                duration: 9000,
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
                borderRadius={'20px'}
                boxShadow="dark-lg"
            >
                <Text fontSize={'5xl'} fontWeight="bold" color={'facebook.500'}>
                    Login
                </Text>
                <VStack spacing={'15px'} pt="70px">
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
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>
                    <Button
                        w={'100%'}
                        size="lg"
                        onClick={submit}
                        isLoading={loading}
                        colorScheme={'facebook'}
                    >
                        Login
                    </Button>
                </VStack>
            </Box>
        </Box>
    )
}

export default Login

import { Box } from '@chakra-ui/react'
import React from 'react'
import NavigationBar from '../../Components/Misc/NavigationBar'

const Home = () => {
    return (
        <Box
            w={'100%'}
            h="100vh"
            display="flex"
            alignItems={'center'}
            bgColor="#EAEAEA"
        >
            <Box h={'90vh'} px="50px">
                {/* Navigation Bar Component */}
                <NavigationBar />
            </Box>
        </Box>
    )
}

export default Home

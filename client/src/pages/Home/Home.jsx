import { Box } from '@chakra-ui/react'
import React from 'react'
import Chat from '../../Components/Chat/Chat'
import NavigationBar from '../../Components/Navigation/NavigationBar'
import { AuthState } from '../../Context/Auth/AuthContext'
import { NavigationState } from '../../Context/Navigation/NavigationContext'
const Home = () => {
    const { user } = AuthState()
    const { selectedTab, setSelectedTab } = NavigationState()
    return (
        <Box
            w={'100%'}
            h="100vh"
            display="flex"
            alignItems={'center'}
            bgColor="#EAEAEA"
        >
            <Box
                h={'90vh'}
                px="50px"
                display={'flex'}
                justifyContent="space-evenly"
                alignItems={'center'}
            >
                {/* Navigation Bar Component */}
                {user && <NavigationBar />}
                {selectedTab === 1 && <Chat />}
            </Box>
        </Box>
    )
}

export default Home

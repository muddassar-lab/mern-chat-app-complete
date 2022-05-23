import { Avatar, Box, Icon, VStack } from '@chakra-ui/react'
import React from 'react'
import { AuthState } from '../../Context/Auth/AuthContext'
import {
    AiOutlineHome,
    AiOutlineMessage,
    AiOutlineNotification,
    AiOutlineSetting,
    AiOutlineLogout,
} from 'react-icons/ai'
import NavigationBarItem from './NavigationBarItem'
import { NavigationState } from './../../Context/Navigation/NavigationContext'
const NavigationBar = () => {
    const { selectedTab, setSelectedTab } = NavigationState()
    const { user, logout } = AuthState()

    return (
        <Box
            w={'180px'}
            height="100%"
            borderRadius={'20px'}
            bgColor="facebook.500"
            display={'flex'}
            flexDir="column"
            justifyContent="space-evenly"
            alignItems={'center'}
        >
            {/* Avatar Component */}
            <Avatar name={user.name} src={user.picture} size="xl" />
            {/* Navigation Links */}
            <Box>
                <VStack spacing={'25px'} w="100%">
                    <NavigationBarItem
                        index={0}
                        icon={<AiOutlineHome size={35} />}
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                    />
                    <NavigationBarItem
                        index={1}
                        icon={<AiOutlineMessage size={35} />}
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                    />
                    <NavigationBarItem
                        index={2}
                        icon={<AiOutlineNotification size={35} />}
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                    />
                    <NavigationBarItem
                        index={3}
                        icon={<AiOutlineSetting size={35} />}
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                    />
                    <AiOutlineLogout onClick={logout} color="black" size={35} />
                </VStack>
            </Box>
        </Box>
    )
}

export default NavigationBar

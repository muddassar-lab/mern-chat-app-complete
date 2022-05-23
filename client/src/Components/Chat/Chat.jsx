import { Box, VStack } from '@chakra-ui/react'
import React from 'react'
import SearchBar from '../Search/SearchBar'
import ChatPeopleList from './ChatPeopleList'

const Chat = () => {
    return (
        <Box height={'100%'}>
            <Box
                paddingX={'20px'}
                display={'flex'}
                flexDir="column"
                height={'100%'}
                width={'350px'}
                maxHeight="90vh"
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <SearchBar />
                <ChatPeopleList header={'Groups'} />
                <ChatPeopleList header={'People'} />
            </Box>
        </Box>
    )
}

export default Chat

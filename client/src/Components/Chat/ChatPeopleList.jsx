import { Box, List, Text } from '@chakra-ui/react'
import React from 'react'
import ChatPeopleListItem from './ChatPeopleListItem'

const ChatPeopleList = ({ header }) => {
    return (
        <Box
            bgColor={'white'}
            height="230px"
            borderRadius={'10px'}
            padding={'10px 20px'}
            boxShadow="md"
            width={'100%'}
            overflowY="auto"
        >
            <Text fontSize={'18px'} fontWeight="bold">
                {header}
            </Text>
            <ChatPeopleListItem text="Study Group" />
            <ChatPeopleListItem text="Study Group" />
            <ChatPeopleListItem text="Study Group" />
            <ChatPeopleListItem text="Study Group" />
            <ChatPeopleListItem text="Study Group" />
        </Box>
    )
}

export default ChatPeopleList

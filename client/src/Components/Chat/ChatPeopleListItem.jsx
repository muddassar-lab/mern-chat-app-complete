import { Box, Divider, Text } from '@chakra-ui/react'
import React from 'react'

const ChatPeopleListItem = ({ text }) => {
    return (
        <>
            <Box py={2}>
                <Text fontSize={'18px'}>{text}</Text>
            </Box>
            <Divider />
        </>
    )
}

export default ChatPeopleListItem

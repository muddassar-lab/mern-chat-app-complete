import { Box } from '@chakra-ui/react'
import React from 'react'

const NavigationBarItem = ({ selectedTab, index, setSelectedTab, icon }) => {
    return (
        <Box
            w={'180px'}
            transition="all 0.3s ease "
            display="flex"
            justifyContent="center"
            py={'10px'}
            color={selectedTab === index ? 'white' : 'black'}
            onClick={() => setSelectedTab(index)}
            borderRight={
                selectedTab === index
                    ? '5px solid #FFE81A'
                    : '5px solid transparent'
            }
        >
            {icon}
        </Box>
    )
}

export default NavigationBarItem

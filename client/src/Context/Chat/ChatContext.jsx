import { createContext, useContext, useState } from 'react'
import axios from 'axios'
const ChatContext = createContext()
const ChatProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState([])
    const [selectedChat, setSelectedChat] = useState(null)

    const onSearchBarChange = (value) => {
        if (value === '') {
            searchResults([])
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }
        axios.get(`/api/user/search/${value}`, config)
    }
    return (
        <ChatContext.Provider
            value={{
                searchResults,
                setSearchResults,
                selectedChat,
                setSelectedChat,
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = () => useContext(ChatContext)

export default ChatProvider

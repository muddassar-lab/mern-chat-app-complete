import { createContext, useState, useContext } from 'react'

const NavigationContext = createContext()

const NavigationProvider = ({ children }) => {
    const [selectedTab, setSelectedTab] = useState(0)

    return (
        <NavigationContext.Provider value={{ selectedTab, setSelectedTab }}>
            {children}
        </NavigationContext.Provider>
    )
}
export const NavigationState = () => useContext(NavigationContext)
export default NavigationProvider

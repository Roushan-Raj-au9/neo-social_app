import { useState } from "react";
import AddressContext from "./addressContext";

const AddressState = ({children}) => {
    const [address, setAddress] = useState([])
    const [choosedAddress, setChoosedAddress] = useState({})
  return (
    <AddressContext.Provider value={{
        address,
        setAddress,
        choosedAddress,
        setChoosedAddress
    }}>
        {children}
    </AddressContext.Provider>
  )
}

export default AddressState
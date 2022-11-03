import { createContext, useState, useEffect } from "react";

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserAvatar, setCurrentUserAvatar] = useState(null);
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        fetch("/api/me/profile")
        .then((res) => res.json())
        .then((data) => {
            setCurrentUser(data.profile.handle);
            setCurrentUserAvatar(data.profile.avatarSrc)
            setStatus("idle");
        }) 
        .catch((err) => console.log(err));
    }, [])


    return <CurrentUserContext.Provider value={{ currentUser, status, currentUserAvatar }}>{children}</CurrentUserContext.Provider>;
};
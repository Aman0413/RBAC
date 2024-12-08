import { createContext, useState, ReactNode } from 'react';
import { User } from '@/types/types';

interface UserDataContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserDataContext = createContext<UserDataContextType | undefined>(undefined);


interface UserContextProps {
    children: ReactNode;
}

function UserContext({ children }: UserContextProps) {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserDataContext.Provider value={{ user, setUser }}>
            {children}
        </UserDataContext.Provider>
    );
}

export default UserContext;

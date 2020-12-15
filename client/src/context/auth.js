import { createContext } from 'react';

const AuthContext = createContext({ user: null, onLogin: null, logout: null });

export default AuthContext;
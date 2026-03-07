import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

interface User {
    username?: string;
    email: string;
    full_name?: string;
    role: 'ADMIN' | 'EDITOR' | 'VIEWER';
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (formData: FormData) => Promise<void>;
    signup: (data: any) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            setLoading(false);
            setUser(null);
            return;
        }

        try {
            const userData = await authService.getMe();
            setUser(userData);
        } catch (error) {
            console.error('Failed to load user:', error);
            localStorage.removeItem('access_token');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const login = async (formData: FormData) => {
        const { access_token } = await authService.login(formData);
        localStorage.setItem('access_token', access_token);
        await loadUser();
    };

    const signup = async (data: any) => {
        await authService.signup(data);
        // After signup, we could auto-login if we want, 
        // but for now let's just make them sign in manually for security or just login them.
        // Actually, let's just allow login after signup.
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

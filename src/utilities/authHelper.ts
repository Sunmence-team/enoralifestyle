// src/utils/auth.ts

import axios from 'axios';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Executes the server-side logout and client-side cleanup.
 *
 * @param token The user's JWT token for the API call.
 */
export const performLogoutCleanup = async (token: string) => {
    try {
        // 1. Attempt server-side logout
        await axios.post(`${API_URL}/auth/logout`, {}, {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        console.log("Logout successful on server.");
        
    } catch (err: any) {
        // Log the error but proceed with client cleanup, as the main goal 
        // is to log the user out on the client side regardless of server response.
        console.error("Server logout error, proceeding with client cleanup:", err);
    } finally {
        // 2. Client-side cleanup
        localStorage.removeItem('token');
        
        // 3. Display success message
        toast.success("Logged out successfully! Redirecting...");
        
        // Note: Redirection happens in the calling component (Step 2)
    }
};
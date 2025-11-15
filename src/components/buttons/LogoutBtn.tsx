import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { toast } from 'sonner';
import { performLogoutCleanup } from '../../utilities/authHelper';

const LogoutHandler: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const token = localStorage.getItem('token'); 
        
        if (token) {
            await performLogoutCleanup(token);
        } else {
            localStorage.removeItem('token');
            toast.success("Logged out successfully! Redirecting...");
        }

        setTimeout(() => {
            navigate("/login");
        }, 1500);
    };

    return (
        <button className="p-2.5 rounded-full transition hover:scale-105" style={{ backgroundColor: "var(--pink-color)" }} onClick={handleLogout}>
            <MdLogout size={22} style={{ color: "var(--primary-color)" }} />
        </button>
    );
};

export default LogoutHandler;
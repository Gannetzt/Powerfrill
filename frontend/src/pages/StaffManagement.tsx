import React, { useState, useEffect } from 'react';
import { userService } from '../services/api';
import AdminHeader from '../components/AdminHeader';
import './StaffManagement.css';

interface User {
    id: number;
    email: string;
    full_name: string;
    role: string;
    is_active: boolean;
    permissions: {
        menu_access?: string[];
        admin_access?: boolean;
    };
}

const StaffManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });

    const fetchUsers = async () => {
        try {
            const data = await userService.getAll();
            setUsers(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUpdatePermissions = async (user: User, menuId: string, checked: boolean) => {
        const currentMenus = user.permissions.menu_access || [];
        const newMenus = checked
            ? [...currentMenus, menuId]
            : currentMenus.filter(m => m !== menuId);

        try {
            const updatedUser = await userService.update(user.id, {
                permissions: { ...user.permissions, menu_access: newMenus }
            });
            setUsers(users.map(u => u.id === user.id ? updatedUser : u));
            setMessage({ type: 'success', text: 'Permissions updated successfully' });
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to update permissions' });
        }
    };

    const handleStatusToggle = async (user: User) => {
        try {
            const updatedUser = await userService.update(user.id, { is_active: !user.is_active });
            setUsers(users.map(u => u.id === user.id ? updatedUser : u));
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to update status' });
        }
    };

    const handleRoleChange = async (user: User, role: string) => {
        try {
            const updatedUser = await userService.update(user.id, { role });
            setUsers(users.map(u => u.id === user.id ? updatedUser : u));
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to update role' });
        }
    };

    if (loading) return <div className="admin-loading">Loading staff directory...</div>;

    return (
        <div className="staff-management">
            <AdminHeader />
            <div className="staff-content-area">
                <div className="staff-header">
                    <div>
                        <h1>Staff Management</h1>
                        <p>Manage team roles and granular module permissions</p>
                    </div>
                    <button className="add-staff-btn" onClick={() => alert("Use Signup page to invite new users for now. This module manages existing staff.")}>
                        Invite Core Staff
                    </button>
                </div>

                {message.text && (
                    <div className={`status-banner ${message.type}`}>
                        {message.text}
                        <button onClick={() => setMessage({ type: '', text: '' })}>×</button>
                    </div>
                )}

                <div className="staff-grid">
                    <table className="staff-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Role</th>
                                <th>Module Access</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>
                                        <div className="user-info">
                                            <div className="user-avatar">{user.full_name?.charAt(0) || user.email.charAt(0)}</div>
                                            <div>
                                                <div className="user-name">{user.full_name || 'Anonymous User'}</div>
                                                <div className="user-email">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user, e.target.value)}
                                            className={`role-badge ${user.role}`}
                                        >
                                            <option value="admin">Admin</option>
                                            <option value="editor">Editor</option>
                                            <option value="viewer">Viewer</option>
                                        </select>
                                    </td>
                                    <td>
                                        {user.role === 'admin' ? (
                                            <span className="all-access">FULL SYSTEM</span>
                                        ) : (
                                            <div className="permission-chips">
                                                {['solar-energy', 'battery-bess', 'future-tech'].map(menu => (
                                                    <label key={menu} className="permission-toggle">
                                                        <input
                                                            type="checkbox"
                                                            checked={user.permissions.menu_access?.includes(menu)}
                                                            onChange={(e) => handleUpdatePermissions(user, menu, e.target.checked)}
                                                        />
                                                        <span>{menu.split('-')[0].toUpperCase()}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            className={`status-chip ${user.is_active ? 'active' : 'inactive'}`}
                                            onClick={() => handleStatusToggle(user)}
                                        >
                                            {user.is_active ? 'Active' : 'Suspended'}
                                        </button>
                                    </td>
                                    <td>
                                        <button className="delete-btn" onClick={() => {
                                            if (window.confirm('Are you sure you want to delete this user?')) {
                                                userService.delete(user.id).then(() => fetchUsers());
                                            }
                                        }}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StaffManagement;

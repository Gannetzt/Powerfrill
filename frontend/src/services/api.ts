const API_URL = 'https://backend-beta-weld-46.vercel.app';

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('access_token');
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        if (response.status === 401) {
            localStorage.removeItem('access_token');
            // Optional: redirect to login
        }
        const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
        throw new Error(error.detail || 'API request failed');
    }

    if (response.status === 204) return null;
    return response.json();
}

export const productService = {
    getAll: () => apiRequest('/products'),
    getById: (id: string) => apiRequest(`/products/${id}`),
    create: (data: any) => apiRequest('/products', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => apiRequest(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => apiRequest(`/products/${id}`, { method: 'DELETE' }),
    createInquiry: (data: any) => apiRequest('/inquiries', { method: 'POST', body: JSON.stringify(data) }),
    getInquiries: () => apiRequest('/inquiries'),
};

export const authService = {
    login: async (formData: FormData) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Login failed');
        }
        return response.json();
    },
    getMe: () => apiRequest('/auth/me'),
    signup: (data: any) => apiRequest('/auth/signup', { method: 'POST', body: JSON.stringify(data) }),
};

export const userService = {
    getAll: () => apiRequest('/users'),
    update: (id: number, data: any) => apiRequest(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (userId: number) => apiRequest(`/users/${userId}`, { method: 'DELETE' }),
};

export const publishingService = {
    // Resources (Brochures/Pamphlets)
    getResources: (screen?: string) => apiRequest(`/resources${screen ? `?screen=${screen}` : ''}`),
    getAllResources: () => apiRequest('/admin/resources'),
    createResource: (data: any) => apiRequest('/admin/resources', {
        method: 'POST',
        body: JSON.stringify(data)
    }),
    deleteResource: (id: number) => apiRequest(`/admin/resources/${id}`, { method: 'DELETE' }),

    // Promotions (Popups)
    getPromotions: (screen?: string) => apiRequest(`/promotions${screen ? `?screen=${screen}` : ''}`),
    createPromotion: (data: any) => apiRequest('/admin/promotions', {
        method: 'POST',
        body: JSON.stringify(data)
    })
};

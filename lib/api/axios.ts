import axios from "axios";

// Create axios instance with default config
const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || "https://6852821e0594059b23cdd834.mockapi.io",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor
api.interceptors.request.use(
	(config) => {
		// Add auth token if available
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		// Log request in development
		if (process.env.NODE_ENV === "development") {
			console.log("🚀 API Request:", config.method?.toUpperCase(), config.url);
		}

		return config;
	},
	(error) => {
		console.error("❌ Request Error:", error);
		return Promise.reject(error);
	}
);

// Response interceptor
api.interceptors.response.use(
	(response) => {
		// Log response in development
		if (process.env.NODE_ENV === "development") {
			console.log("✅ API Response:", response.status, response.config.url);
		}

		return response;
	},
	(error) => {
		// Handle common errors
		if (error.response) {
			// Server responded with error status
			const {status, data} = error.response;

			switch (status) {
				case 401:
					// Unauthorized - redirect to login
					localStorage.removeItem("token");
					window.location.href = "/login";
					break;
				case 403:
					// Forbidden
					console.error("Access forbidden");
					break;
				case 404:
					// Not found
					console.error("Resource not found");
					break;
				case 500:
					// Server error
					console.error("Server error occurred");
					break;
				default:
					console.error(`HTTP Error ${status}:`, data);
			}
		} else if (error.request) {
			// Network error
			console.error("Network error:", error.message);
		} else {
			// Other error
			console.error("Error:", error.message);
		}

		return Promise.reject(error);
	}
);

// Helper functions for common API operations
export const apiHelpers = {
	// GET request
	get: <T>(url: string, config?: any) => api.get<T>(url, config).then((res) => res.data),

	// POST request
	post: <T>(url: string, data?: any, config?: any) => api.post<T>(url, data, config).then((res) => res.data),

	// PUT request
	put: <T>(url: string, data?: any, config?: any) => api.put<T>(url, data, config).then((res) => res.data),

	// PATCH request
	patch: <T>(url: string, data?: any, config?: any) => api.patch<T>(url, data, config).then((res) => res.data),

	// DELETE request
	delete: <T>(url: string, config?: any) => api.delete<T>(url, config).then((res) => res.data),
};

export default api;

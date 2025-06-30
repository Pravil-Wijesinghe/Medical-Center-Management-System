// authService.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

class AuthService {
  /**
   * Sign up a new patient
   * @param {Object} userData - User registration data
   * @param {string} userData.firstName - User's first name
   * @param {string} userData.lastName - User's last name
   * @param {string} userData.username - User's username
   * @param {string} userData.address - User's address
   * @param {string} userData.phoneNumber - User's phone number
   * @param {string} userData.email - User's email
   * @param {string} userData.password - User's password
   * @returns {Promise<Object>} Response data from the API
   */
  async signUpPatient(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup/patient`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return {
        success: true,
        data: data,
        message: data.message || 'Account created successfully!',
      };
    } catch (error) {
      console.error('Sign up error:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred during sign up',
      };
    }
  }

  /**
   * Login user (placeholder for future implementation)
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.email - User's email
   * @param {string} credentials.password - User's password
   * @returns {Promise<Object>} Response data from the API
   */
  async login(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      // Store token if provided
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }

      return {
        success: true,
        data: data,
        message: data.message || 'Login successful!',
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred during login',
      };
    }
  }

  /**
   * Logout user
   */
  logout() {
    localStorage.removeItem('authToken');
  }

  /**
   * Get stored auth token
   * @returns {string|null} Auth token
   */
  getToken() {
    return localStorage.getItem('authToken');
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} Authentication status
   */
  isAuthenticated() {
    return !!this.getToken();
  }
}

// Export a singleton instance
const authService = new AuthService();
export default authService;
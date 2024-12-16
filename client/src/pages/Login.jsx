import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login } from '../services/api';
import AuthForm from '../components/auth/AuthForm';
import { Mail, Lock } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await login(formData);
      authLogin(response.data.token);
      
      // Redirect to the page they were trying to access, or home
      const from = location.state?.from?.pathname || '/';
      navigate(from);
    } catch (err) {
      setError(
        err.response?.data?.message || 'An error occurred during login'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      icon: Mail,
      required: true,
      placeholder: 'Enter your email',
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      icon: Lock,
      required: true,
      placeholder: 'Enter your password',
    },
  ];

  const extraContent = (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="remember"
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
          Remember me
        </label>
      </div>
      <a href="/forgot-password" className="text-sm text-primary hover:text-primary/80 font-medium">
        Forgot password?
      </a>
    </div>
  );

  return (
    <>
      {error && (
        <div className="max-w-md mx-auto mb-4">
          <div className="bg-red-50 text-red-500 p-3 rounded-md">
            {error}
          </div>
        </div>
      )}
      
      <AuthForm
        title="Welcome Back"
        subtitle="Sign in to continue to Pawsy"
        fields={fields}
        submitText={isLoading ? "Signing in..." : "Sign In"}
        footerText="Don't have an account?"
        footerLinkText="Sign up"
        footerLinkTo="/register"
        onSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        extraContent={extraContent}
      />
    </>
  );
};

export default Login;

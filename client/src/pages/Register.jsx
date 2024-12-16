import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { register } from "../services/api";
import AuthForm from "../components/auth/AuthForm";
import { Mail, Lock, User } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      login(response.data.token);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during registration"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    {
      label: "Full Name",
      name: "name",
      type: "text",
      icon: User,
      required: true,
      placeholder: "Enter your full name",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      icon: Mail,
      required: true,
      placeholder: "Enter your email",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      icon: Lock,
      required: true,
      placeholder: "Create a password",
      minLength: 6,
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      icon: Lock,
      required: true,
      placeholder: "Confirm your password",
      minLength: 6,
    },
  ];

  return (
    <>
      {error && (
        <div className="max-w-md mx-auto mb-4">
          <div className="bg-red-50 text-red-500 p-3 rounded-md">{error}</div>
        </div>
      )}

      <AuthForm
        title="Create Account"
        subtitle="Sign up to get started with Pawsy"
        fields={fields}
        submitText={isLoading ? "Creating account..." : "Create Account"}
        footerText="Already have an account?"
        footerLinkText="Sign in"
        footerLinkTo="/login"
        onSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
      />
    </>
  );
};

export default Register;

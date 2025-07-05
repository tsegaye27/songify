import React, { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { signUp } from "../../../api/authAPI";
import { ISignUpData } from "../../../app/models/user";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--background-color);
  padding: 1rem;
`;

const Form = styled.form`
  background-color: var(--second-background-color);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  width: 100%;
  max-width: 420px;
  border: 1px solid var(--accent-color);
`;

const Title = styled.h2`
  color: var(--text-color);
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.875rem;
  margin-bottom: 1rem;
  border: 2px solid var(--accent-color);
  border-radius: 8px;
  background-color: var(--background-color);
  color: var(--text-color);
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }

  &::placeholder {
    color: var(--text-color-secondary);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.875rem;
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--secondary-color)
  );
  color: #000;
  border: none;
  outline: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const LinkContainer = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: var(--text-color-secondary);
`;

const StyledLink = styled(Link)`
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState<ISignUpData>({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.passwordConfirm) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await signUp(formData);
      toast.success("Account created successfully");
      setTimeout(() => navigate("/auth/login"), 3000);
    } catch (err: any) {
      toast.error(err.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Join Songify</Title>
        <Input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={8}
        />
        <Input
          type="password"
          name="passwordConfirm"
          placeholder="Confirm Password"
          value={formData.passwordConfirm}
          onChange={handleChange}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Sign Up"}
        </Button>
        <LinkContainer>
          Already have an account?{" "}
          <StyledLink to="/auth/login">Sign In</StyledLink>
        </LinkContainer>
      </Form>
    </Container>
  );
};

export default SignUpPage;

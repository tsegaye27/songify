import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ISignUpData } from "../../../app/models/user";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { clearError, signUpStart } from "../../../redux/slices/authSlice";

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

const PasswordRequirements = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  font-size: 0.75rem;
  margin: -0.5rem 0 1rem 0;
  padding: 0 0.25rem;
`;

const Requirement = styled.span<{ valid: boolean }>`
  color: ${(props) =>
    props.valid ? "var(--green-primary)" : "var(--text-color-secondary)"};
  transition: color 0.3s ease;

  &::before {
    content: "${(props) => (props.valid ? "✓" : "•")}";
    margin-right: 0.5rem;
  }
`;

const SignUpPage: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState<ISignUpData>({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [passwordValidity, setPasswordValidity] = useState({
    minLength: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasLowercase: false,
  });

  const isPasswordValid = Object.values(passwordValidity).every(Boolean);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      setPasswordValidity({
        minLength: value.length >= 8,
        hasUppercase: /[A-Z]/.test(value),
        hasNumber: /[0-9]/.test(value),
        hasSpecialChar: /[!@#$]/.test(value),
        hasLowercase: /[a-z]/.test(value),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }

    if (!isPasswordValid) {
      toast.error("Please ensure your password meets all requirements.");
      return;
    }
    dispatch(signUpStart(formData));
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
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
          required
        />

        {isPasswordFocused && (
          <PasswordRequirements>
            <Requirement valid={passwordValidity.minLength}>
              At least 8 characters
            </Requirement>
            <Requirement valid={passwordValidity.hasLowercase}>
              A lowercase letter
            </Requirement>
            <Requirement valid={passwordValidity.hasUppercase}>
              An uppercase letter
            </Requirement>
            <Requirement valid={passwordValidity.hasNumber}>
              A number
            </Requirement>
            <Requirement valid={passwordValidity.hasSpecialChar}>
              A special character (!@#$)
            </Requirement>
          </PasswordRequirements>
        )}

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

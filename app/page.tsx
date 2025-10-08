"use client";

import { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Link } from "@heroui/link";
import { title } from "@/components/primitives";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }, 1500);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center mb-4">
        <span className={title({ color: "violet" })}>Create Account</span>
        <p className="text-default-500 mt-2">
          Join us today and start your journey
        </p>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-1 px-6 pt-6">
          <h2 className="text-2xl font-bold">Registration</h2>
          <p className="text-small text-default-500">
            Fill in the details to create your account
          </p>
        </CardHeader>
        <CardBody className="px-6 pb-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.fullName}
              onValueChange={(value) => handleInputChange("fullName", value)}
              isInvalid={!!errors.fullName}
              errorMessage={errors.fullName}
              isRequired
            />

            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              value={formData.email}
              onValueChange={(value) => handleInputChange("email", value)}
              isInvalid={!!errors.email}
              errorMessage={errors.email}
              isRequired
            />

            <Input
              label="Password"
              placeholder="Create a password"
              type="password"
              value={formData.password}
              onValueChange={(value) => handleInputChange("password", value)}
              isInvalid={!!errors.password}
              errorMessage={errors.password}
              isRequired
            />

            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              type="password"
              value={formData.confirmPassword}
              onValueChange={(value) =>
                handleInputChange("confirmPassword", value)
              }
              isInvalid={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword}
              isRequired
            />

            {isSuccess && (
              <div className="p-3 rounded-lg bg-success-50 text-success">
                <p className="text-sm font-medium">
                  ✓ Registration successful! Welcome aboard.
                </p>
              </div>
            )}

            <Button
              type="submit"
              color="primary"
              size="lg"
              isLoading={isSubmitting}
              className="mt-2"
            >
              {isSubmitting ? "Creating Account..." : "Sign Up"}
            </Button>

            <div className="text-center text-small">
              <span className="text-default-500">Already have an account? </span>
              <Link href="/login" size="sm">
                Sign In
              </Link>
            </div>
          </form>
        </CardBody>
      </Card>
    </section>
  );
}
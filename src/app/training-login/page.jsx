"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import trainingApi from "@/services/trainingApi";

export default function TrainingLogin() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    userId: "",
    code: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const TRAINING_CODES = {
    H5647L: "iso9001",
    IS1001O: "iso14001",
    O0027SI: "iso27001",
    RI1001: "riskidentification",
    RE1002: "riskevaluation",
    RA1003: "riskassessment",
    RT1004: "risktreatment",
    SOA1005: "soa",
  };

  const ADMIN_CODE = "ADM9081";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    const name = formData.name.trim();
    const email = formData.userId.trim().toLowerCase();
    const code = formData.code.trim().toUpperCase();

    // Name validation
    if (!name) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z ]+$/.test(name)) {
      newErrors.name = "Only alphabets are allowed";
    }

    // Email validation
    if (!email) {
      newErrors.userId = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.userId = "Enter a valid email address";
    }

    // Training code validation
    if (!code) {
      newErrors.code = "Training code is required";
    } else if (!TRAINING_CODES[code] && code !== ADMIN_CODE) {
      newErrors.code = "Invalid Training Code";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    const normalizedData = {
      name: formData.name.trim(),
      userId: formData.userId.trim().toLowerCase(),
      code: formData.code.trim().toUpperCase(),
    };

    try {
      const res = await trainingApi.login(normalizedData);

      console.log("LOGIN RESPONSE:", res);

      if (!res || !res.user) {
        throw new Error("Invalid login response from server");
      }

      console.log("USER ROLE:", res.user.role);
      console.log("TRAINING:", res.user.training_name);

      /*
       * Clear any old training session first.
       * This prevents an expired/old token from remaining in storage.
       */
      localStorage.removeItem("trainingUser");

      /*
       * Store the NEW authenticated user + JWT.
       */
      const trainingUser = {
        ...res.user,
        ...(res.access_token
          ? {
              access_token: res.access_token,
            }
          : {}),
      };

      localStorage.setItem(
        "trainingUser",
        JSON.stringify(trainingUser)
      );

      /*
       * Verify that JWT exists for normal users.
       */
      if (res.user.role !== "admin" && !res.access_token) {
        throw new Error(
          "Login successful, but authentication token was not received."
        );
      }

      /*
       * Redirect based on role.
       */
      if (res.user.role === "admin") {
        router.replace("/admin-training");
      } else {
        router.replace("/training");
      }
    } catch (err) {
      console.error("TRAINING LOGIN ERROR:", err);

      /*
       * Do not keep a bad/expired session.
       */
      localStorage.removeItem("trainingUser");

      setErrors({
        code:
          err?.message ||
          "Login failed. Please check your email and training code.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout hideFooter>
      <section className="relative min-h-screen overflow-hidden bg-[#081B35]">
        {/* Background */}
        <div className="absolute inset-0 bg-[#081B35]" />

        {/* Grid */}
        <div className="absolute inset-0 grid-pattern opacity-10" />

        {/* Content */}
        <div className="container-x relative flex min-h-screen items-center justify-center py-20">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
            <p className="text-center text-sm uppercase tracking-[0.35em] text-gold">
              Hawksberg International
            </p>

            <h1 className="mt-3 text-center font-display text-4xl text-white">
              Training Login
            </h1>

            <p className="mt-4 text-center text-white/70">
              Login to access your professional training portal.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-6"
            >
              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none transition focus:border-gold"
                />

                {errors.name && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* User ID */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  User ID (Email)
                </label>

                <input
                  type="email"
                  name="userId"
                  placeholder="example@company.com"
                  value={formData.userId}
                  onChange={handleChange}
                  autoComplete="email"
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none transition focus:border-gold"
                />

                {errors.userId && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.userId}
                  </p>
                )}
              </div>

              {/* Training Code */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Training Code
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="code"
                    autoComplete="off"
                    spellCheck={false}
                    placeholder="Enter training code"
                    value={formData.code}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 pr-12 text-white placeholder:text-white/40 outline-none transition focus:border-gold"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-gold"
                    aria-label={
                      showPassword
                        ? "Hide training code"
                        : "Show training code"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>

                {errors.code && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.code}
                  </p>
                )}
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-gold py-3 text-base font-semibold text-black transition duration-300 hover:scale-[1.02] hover:bg-[#f1bc47] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>

              <p className="text-center text-sm text-white/60">
                Access is restricted to authorised training participants.
              </p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
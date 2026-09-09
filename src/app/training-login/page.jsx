"use client";

// import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import trainingApi from "@/services/trainingApi";
// import pageHeroBg from "@/assets/page-hero-bg.webp";

export default function TrainingLogin() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    userId: "",
    code: "",
  });

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  // const USER_CODE = "H5647L";
//   const TRAINING_CODES = {
//   H5647L: "iso9001",
//   IS1001O: "iso14001",
//   O0027SI: "iso27001",
// };
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

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z ]+$/.test(formData.name)) {
      newErrors.name = "Only alphabets are allowed";
    }

    // Gmail
    if (!formData.userId.trim()) {
      newErrors.userId = "Email is required";
    } else if (
      !/^[A-Za-z0-9._%+-]+@gmail\.com$/i.test(formData.userId)
    ) {
      newErrors.userId = "Enter a valid Gmail address";
    }

    // Code
    // if (!formData.code.trim()) {
    //   newErrors.code = "Training code is required";
    // } else if (
    //   formData.code !== USER_CODE &&
    //   formData.code !== ADMIN_CODE
    // ) {
    //   newErrors.code = "Invalid Training Code";
    // }
    // Code
if (!formData.code.trim()) {
  newErrors.code = "Training code is required";
} else if (
  !TRAINING_CODES[formData.code] &&
  formData.code !== ADMIN_CODE
) {
  newErrors.code = "Invalid Training Code";
}

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validate()) return;

//     const role =
//   formData.code === ADMIN_CODE ? "admin" : "user";

// const portal =
//   role === "admin"
//     ? "all"
//     : TRAINING_CODES[formData.code];

// localStorage.setItem(
//   "trainingUser",
//   JSON.stringify({
//     name: formData.name,
//     email: formData.userId,
//     role,
//     portal,
//   })
// );

// navigate("/training");
//   };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;


// try {
//   setErrors({});

//   const res = await trainingApi.login(formData);

//   localStorage.setItem(
//   "trainingUser",
//   JSON.stringify(res.user)
// );

// if (res.user.role === "admin") {
//   navigate("/admin-training", { replace: true });
// } else {
//   navigate("/training", { replace: true });
// }

// } catch (err) {
//   console.error(err);

//   setErrors({
//     code: err.message || "Login Failed",
//   });
// }
try {
  setErrors({});

  const res = await trainingApi.login(formData);
  console.log("LOGIN RESPONSE", res);
console.log("USER ROLE", res.user.role);

  localStorage.setItem(
    "trainingUser",
    JSON.stringify(res.user)
  );

  if (res.user.role === "admin") {
    router.replace("/admin-training");
  } else {
    router.replace("/training");
  }

} catch (err) {
  console.error(err);

  setErrors({
    code: err.message || "Login Failed",
  });
}
};

  return (
    // <Layout>
    <Layout hideFooter>
      {/* <section className="relative min-h-screen overflow-hidden"> */}
      <section className="relative min-h-screen overflow-hidden bg-[#081B35]">

        {/* Background */}
        {/* <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${pageHeroBg})`,
          }}
        /> */}

        {/* Overlay */}
        {/* <div className="absolute inset-0 bg-[#081B35]/90" /> */}
        <div className="absolute inset-0 bg-[#081B35]" />

        {/* Grid */}
        <div className="absolute inset-0 grid-pattern opacity-10" />

        {/* Content */}
        <div className="container-x relative flex min-h-screen items-center justify-center py-20">

          {/* <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/10 p-10 backdrop-blur-xl shadow-2xl"> */}
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

            {/* FORM STARTS HERE */}
            <form
  onSubmit={handleSubmit}
  className="mt-10 space-y-6"
>

                          {/* Name */}
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
                  User ID (Gmail)
                </label>

                <input
                  type="email"
                  name="userId"
                  placeholder="example@gmail.com"
                  value={formData.userId}
                  onChange={handleChange}
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

                {/* <input
                  type="password"
                  name="code"
                  placeholder="Enter training code"
                  value={formData.code}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none transition focus:border-gold"
                /> */}

                <div className="relative">
  {/* <input
    type={showPassword ? "text" : "password"}
    name="code"
    placeholder="Enter training code"
    value={formData.code}
    onChange={handleChange}
    className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 pr-12 text-white placeholder:text-white/40 outline-none transition focus:border-gold"
  /> */}
  <input
  type={showPassword ? "text" : "password"}
  name="code"
  autoComplete="off"
  spellCheck={false}
  value={formData.code}
  onChange={handleChange}
  className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 pr-12 text-white placeholder:text-white/40 outline-none transition focus:border-gold"
/>

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-gold"
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
                className="w-full rounded-xl bg-gold py-3 text-base font-semibold text-black transition duration-300 hover:scale-[1.02] hover:bg-[#f1bc47]"
              >
                Login
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

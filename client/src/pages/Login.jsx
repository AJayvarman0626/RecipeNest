import React, { useState, useEffect } from "react";
import {
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [floatPos, setFloatPos] = useState({ x: 0, y: 0 });

  // 🍳 Floating chef hat animation
  useEffect(() => {
    const moveHat = () => {
      setFloatPos({
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
      });
    };
    const interval = setInterval(moveHat, 2000);
    return () => clearInterval(interval);
  }, []);

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      handleLoginSuccess(result.user);
    } catch (error) {
      console.error("Google login error:", error);
      alert("Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // reCAPTCHA setup
  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: () => console.log("reCAPTCHA verified ✅"),
    });
  };

  // Only numeric input
  const handlePhoneInput = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // remove non-numbers
    if (value.length > 10) value = value.slice(0, 10);
    setPhone(value);
  };

  const sendOTP = async () => {
    if (phone.length !== 10) {
      alert("Enter a valid 10-digit phone number");
      return;
    }

    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const formattedPhone = "+91" + phone;
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setConfirmationResult(confirmation);
      setStep(2);
      alert("OTP sent successfully ✅");
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Try again.");
    }
  };

  const verifyOTP = async () => {
    try {
      const result = await confirmationResult.confirm(otp);
      handleLoginSuccess(result.user);
    } catch (error) {
      console.error("Invalid OTP:", error);
      alert("Invalid OTP. Try again.");
    }
  };

  const handleLoginSuccess = (user) => {
    const adminEmails = ["ajayvarma007j@gmail.com"];
    const role = adminEmails.includes(user.email) ? "admin" : "customer";

    localStorage.setItem(
      "user",
      JSON.stringify({
        name: user.displayName || "User",
        email: user.email || phone,
        role,
      })
    );

    navigate(role === "admin" ? "/admin" : "/explore");
  };

  // Press Enter to trigger action
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (step === 1) sendOTP();
      else verifyOTP();
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-[#e0f7f9] via-[#fdfefe] to-[#fce4ec] text-[#01869E] px-4">
      {/* Login Card */}
      <div className="relative bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8 sm:p-10 w-full max-w-md text-center border border-[#cce8ec] fade-in">
        {/* Floating Hat */}
        <div
          className="absolute text-5xl sm:text-6xl transition-all duration-1000 ease-in-out -top-8 left-1/2 transform -translate-x-1/2 drop-shadow-md"
          style={{
            transform: `translate(calc(-50% + ${floatPos.x}px), ${floatPos.y}px) rotate(${floatPos.x * 2}deg)`,
          }}
        >
          🍳
        </div>

        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#01869E] mb-3 drop-shadow-sm mt-6">
          Welcome to <span className="text-[#ff6b9d]">RecipeNest</span>
        </h1>
        <p className="text-gray-500 mb-6">
          Sign in to explore or manage your delicious dishes 🍽️
        </p>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-[#01869E] text-white py-3 rounded-xl font-semibold shadow-md hover:bg-[#026877] active:scale-95 transition-all duration-300"
        >
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>

        <div className="flex items-center my-6">
          <div className="flex-grow h-[1px] bg-[#cce8ec]"></div>
          <span className="px-3 text-[#01869E] text-sm font-medium">or</span>
          <div className="flex-grow h-[1px] bg-[#cce8ec]"></div>
        </div>

        {/* PHONE LOGIN */}
        {step === 1 && (
          <div className="space-y-4">
            <input
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={handlePhoneInput}
              onKeyDown={handleKeyPress}
              inputMode="numeric"
              maxLength="10"
              className="w-full border border-[#cce8ec] rounded-xl px-4 py-2 text-center font-bold text-black text-lg outline-none focus:ring-2 focus:ring-[#01869E] transition-all duration-200"
            />
            <button
              onClick={sendOTP}
              className="w-full bg-[#ff6b9d] text-white py-2 rounded-xl hover:bg-[#e45c8a] active:scale-95 transition-all duration-300"
            >
              Send OTP
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              onKeyDown={handleKeyPress}
              maxLength="6"
              className="w-full border border-[#cce8ec] rounded-xl px-4 py-2 text-center font-bold text-black text-lg outline-none focus:ring-2 focus:ring-[#01869E] transition-all duration-200"
            />
            <button
              onClick={verifyOTP}
              className="w-full bg-[#01869E] text-white py-2 rounded-xl hover:bg-[#026877] active:scale-95 transition-all duration-300"
            >
              Verify OTP
            </button>
          </div>
        )}

        <div id="recaptcha-container"></div>

        <p className="mt-6 text-xs sm:text-sm text-gray-500">
          By logging in, you agree to our{" "}
          <span className="text-[#01869E] font-medium cursor-pointer hover:text-[#ff6b9d]">
            Terms
          </span>{" "}
          &{" "}
          <span className="text-[#01869E] font-medium cursor-pointer hover:text-[#ff6b9d]">
            Privacy Policy
          </span>
          .
        </p>
      </div>
    </div>
  );
}

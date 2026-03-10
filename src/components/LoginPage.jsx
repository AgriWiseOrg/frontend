import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('farmer'); // Default is lowercase
  const [isRegistering, setIsRegistering] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5001"}/api/auth/send-email-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to send OTP email');
      } else {
        setShowOtpInput(true);
      }
    } catch (err) {
      console.error("Frontend Fetch Error:", err);
      setError('Server not reachable. Check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isRegistering && !showOtpInput) {
      return handleSendOtp(e);
    }

    setLoading(true);
    setError('');

    const endpoint = isRegistering
      ? `${import.meta.env.VITE_API_URL || "http://localhost:5001"}/api/auth/register`
      : `${import.meta.env.VITE_API_URL || "http://localhost:5001"}/api/auth/login`;

    const payload = isRegistering
      ? { email, password, role, phone, otp }
      : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
      } else {
        onLogin(data.user);
      }

    } catch (err) {
      console.error("Frontend Fetch Error:", err);
      setError('Server not reachable. Check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setError('');
    setShowOtpInput(false);
    setOtp('');
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-96 space-y-4">
        <h1 className="text-3xl font-black text-green-700 text-center">{t("AgriWise")}</h1>

        {!showOtpInput ? (
          <>
            <input
              type="email"
              placeholder={t("Email")}
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder={t("Password")}
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {isRegistering && (
              <>
                <input
                  type="tel"
                  placeholder={t("Phone Number")}
                  className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <select
                  className="w-full border p-3 rounded-xl bg-white"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="farmer">{t("Farmer")}</option>
                  <option value="buyer">{t("Buyer")}</option>
                  <option value="admin">{t("Admin")}</option>
                </select>
              </>
            )}
          </>
        ) : (
          <>
             <p className="text-sm text-gray-600 text-center">Enter the OTP sent to <br/><span className="font-bold">{email}</span></p>
             <input
              type="text"
              placeholder="Enter 6-digit OTP"
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-center tracking-widest text-lg"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </>
        )}

        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition-all disabled:opacity-50"
        >
          {loading ? 'Please wait...' : (!isRegistering ? 'Login' : (!showOtpInput ? 'Send Email OTP' : 'Verify & Register'))}
        </button>

        <p
          onClick={toggleMode}
          className="text-center text-green-700 cursor-pointer font-semibold hover:underline"
        >
          {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
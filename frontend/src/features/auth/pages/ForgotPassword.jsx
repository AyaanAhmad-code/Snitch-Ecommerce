import { useState } from 'react';
import { Link } from 'react-router';
import { forgotPassword } from '../service/auth.api';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        setIsLoading(true);
        try {
            await forgotPassword(email);
            setIsSent(true);
            toast.success("If an account exists, a reset link was sent.");
        } catch (error) {
            console.error("Forgot password error:", error);
            const errorMsg = error.response?.data?.message || "Something went wrong";
            toast.error(String(errorMsg));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
                rel="stylesheet"
            />
            <div className="min-h-screen bg-[#faf9f8] flex items-center justify-center p-4 lg:p-8 font-['Inter'] relative overflow-hidden">

                {/* Subtle abstract background element */}
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[60%] rounded-full bg-[#f2ede7] blur-[100px] pointer-events-none"></div>

                <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.04)] overflow-hidden relative z-10 border border-[#f0ebe1]">

                    <div className="p-8 sm:p-12">
                        {/* Header */}
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl text-[#1a1410] mb-3 font-['Cormorant_Garamond'] font-medium tracking-tight">
                                Reset Password
                            </h2>
                            <p className="text-[#8c827a] text-sm font-light">
                                {isSent ? "Check your email for the reset link." : "Enter your email to receive a password reset link."}
                            </p>
                        </div>

                        {!isSent ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Email Input */}
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-[#4a423d] uppercase tracking-wider ml-1">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-5 py-3.5 bg-[#faf9f8] border border-[#e8e4dc] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/30 focus:border-[#C9A96E] transition-all text-[#1a1410] placeholder-[#b0a8a0]"
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-4 px-6 mt-4 bg-[#1a1410] hover:bg-[#2d241e] text-white text-sm font-medium rounded-xl transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-[#1a1410]/20 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        "Send Reset Link"
                                    )}
                                </button>
                            </form>
                        ) : (
                            <div className="text-center space-y-6">
                                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="text-[#4a423d] text-sm">
                                    We've sent an email to <span className="font-medium text-[#1a1410]">{email}</span> with instructions to reset your password.
                                </p>
                            </div>
                        )}

                        {/* Footer Links */}
                        <div className="mt-8 text-center">
                            <p className="text-[#8c827a] text-sm">
                                Remembered your password?{' '}
                                <Link to="/login" className="text-[#C9A96E] font-medium hover:text-[#b3955e] transition-colors relative group">
                                    Log in
                                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C9A96E] transition-all group-hover:w-full"></span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;

import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router';
import { resetPassword } from '../service/auth.api';
import { useDispatch } from 'react-redux';
import { setUser } from '../state/auth.slice';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setIsLoading(true);
        try {
            const data = await resetPassword(token, password);
            toast.success("Password reset successfully! You are now logged in.");
            dispatch(setUser(data.user));
            setIsSuccess(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid or expired token");
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

                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[60%] rounded-full bg-[#f2ede7] blur-[100px] pointer-events-none"></div>

                <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.04)] overflow-hidden relative z-10 border border-[#f0ebe1]">

                    <div className="p-8 sm:p-12">
                        {/* Header */}
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl text-[#1a1410] mb-3 font-['Cormorant_Garamond'] font-medium tracking-tight">
                                New Password
                            </h2>
                            <p className="text-[#8c827a] text-sm font-light">
                                Enter your new password below.
                            </p>
                        </div>

                        {!isSuccess ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Password Input */}
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-[#4a423d] uppercase tracking-wider ml-1">New Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-5 py-3.5 bg-[#faf9f8] border border-[#e8e4dc] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/30 focus:border-[#C9A96E] transition-all text-[#1a1410]"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>

                                {/* Confirm Password Input */}
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-[#4a423d] uppercase tracking-wider ml-1">Confirm Password</label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full px-5 py-3.5 bg-[#faf9f8] border border-[#e8e4dc] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/30 focus:border-[#C9A96E] transition-all text-[#1a1410]"
                                        placeholder="••••••••"
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
                                        "Reset Password"
                                    )}
                                </button>
                            </form>
                        ) : (
                            <div className="text-center space-y-6">
                                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="text-[#4a423d] text-sm">
                                    Redirecting you to the homepage...
                                </p>
                            </div>
                        )}
                        
                        <div className="mt-8 text-center">
                            <p className="text-[#8c827a] text-sm">
                                <Link to="/login" className="text-[#C9A96E] font-medium hover:text-[#b3955e] transition-colors relative group">
                                    Back to login
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

export default ResetPassword;

import React, { useRef } from 'react';
import { useAuth } from '../Hooks/useAuth';
import Lottie from 'lottie-react';
import loginLottie from '../assets/Lottie/Login.json';
import resetLottie from '../assets/Lottie/New Password.json';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const { passwordReset } = useAuth();
    const navigate = useNavigate();
    const emailRef = useRef();
    const location = useLocation();

    const prefilledEmail = location.state?.email || '';

    const handleReset = () => {
        const email = emailRef.current.value;
        if (!email) {
            return toast.error("Please enter your email");
        }

        passwordReset(email)
            .then(() => {
                toast.success("Password reset email sent! Check your inbox.");
                navigate("/login");
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    return (
        <div className='flex lg:flex-row flex-col justify-center items-center gap-12 min-h-screen px-4 py-6'>
            <title>SpeedyParcel - Reset Password</title>
            <div>
                <Lottie
                    className="w-full max-w-[520px] mx-auto"
                    animationData={loginLottie}
                    loop={true}>
                </Lottie>
            </div>

            <div className='bg-white p-5 space-y-3 rounded-lg'>
                <div className='flex justify-center '>
                    <Lottie className='border border-gray-300 rounded-full shadow-2xl' style={{ width: "150px", height: "150px" }}
                        animationData={resetLottie}
                        loop={true}>
                    </Lottie>
                </div>
                <h2 className='text-3xl font-bold  mb-3 text-gray-800 text-center'>Reset Your Password</h2>
                <p className='text-sm mb-6 text-gray-800 text-center'>Enter your email address below and we’ll send you a  password <br /> reset link.</p>
                {/* Email */}
                <div>
                    <label className="label text-gray-800 font-semibold">Email</label>
                    <input
                        ref={emailRef}
                        defaultValue={prefilledEmail}
                        type="email"
                        className="input input-class text-gray-800"
                        placeholder="Enter your email"
                        required />
                </div>
                <button onClick={handleReset} className='btn btn-primary w-full bg-linear-to-r from-sky-500 via-sky-400  to-sky-500  transition-all duration-300 font-semibold hover:scale-105 border-none text-gray-800 rounded-lg'>Send Reset Link</button>

                <div className="mt-6 text-sm text-gray-800 text-center">
                    <p>
                        Remembered your password?{" "}
                        <button
                            onClick={() => navigate("/login")}
                            className="text-sky-500 hover:underline font-semibold cursor-pointer"
                        >
                            Back to Login
                        </button>
                    </p>
                </div>


            </div>

        </div>
    );
};

export default ForgotPassword;
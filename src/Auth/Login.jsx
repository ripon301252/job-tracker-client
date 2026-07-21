import Lottie from 'lottie-react';
import loginLottie from '../assets/Lottie/sign in.json';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useAuth } from '../Hooks/useAuth';
import { toast } from 'react-toastify';

const Login = () => {
    const { signInUser, setUser, signInGoogle } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSignin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        setError("")

        // Handle sign-in logic here
        signInUser(email, password)
            .then(() => {
                e.target.reset();
                // Show success message or redirect
                toast.success("Your Signin Successful");
                navigate(location?.state || "/");
            })
            .catch((err) => {
                // Handle errors here
                toast.error(err.message);
            });
    }

    const handleGoogleSignin = () => {
        signInGoogle()
            .then((res) => {
                setUser(res.user);
                toast.success("Google Signin successful");
                navigate(location?.state || "/");
            })
            .catch((e) => {
                toast.error(e.message);
            });
    }

    const handleTogglePasswordShow = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    return (
        <div className='flex lg:flex-row flex-col-reverse justify-center items-center max-w-4xl mx-auto min-h-screen gap-8 py-10'>

            <div className='flex-1 flex flex-col justify-center  bg-white p-10 rounded-2xl shadow-xl border border-gray-200'>

                <h1 className='text-3xl font-bold text-center mb-3 text-gray-800'>
                    Welcome Back
                </h1>

                <p className='text-center text-gray-600 mb-5'>
                    Thanks for staying with the <span className='font-semibold text-green-600'>SpeedyParcel</span> family

                </p>

                <form onSubmit={handleSignin} className='space-y-3'>
                    {/* Email */}
                    <div>
                        <label className="label text-gray-800 font-semibold">Email</label>
                        <input type="email" name='email'
                            className="input input-class text-gray-800"
                            placeholder="Email" required />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="label text-gray-800 font-semibold">Password</label>

                        <div className='relative'>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="input input-class text-gray-800"
                                placeholder="Password" required
                            />

                            <button
                                onClick={handleTogglePasswordShow}
                                className='absolute top-2 right-3 text-green-600 text-xl cursor-pointer'>
                                {showPassword ? <IoEyeOff /> : <IoEye />}
                            </button>
                        </div>
                    </div>

                    {/* Forgot Password */}
                    <div>
                        <Link to={`/forgot-password`} className="text-sm text-gray-500 font-semibold hover:text-green-600 cursor-pointer">
                            Forgot password?
                        </Link>
                    </div>

                    {/* Login Button */}
                    <button  type='submit' className="btn w-full text-gray-800 mt-4 rounded-lg border  font-semibold hover:bg-gray-100 shadow-md bg-gradient-to-r border-green-500 from-green-500 to-green-300 cursor-pointer hover:scale-102 transition-transform">
                        Login
                    </button>

                    {/* Divider */}
                    <div className="flex items-center justify-center gap-2 my-2">
                        <div className="h-px w-16 bg-gray-800"></div>
                        <span className="text-gray-800 text-sm">or</span>
                        <div className="h-px w-16 bg-gray-800"></div>
                    </div>

                    {/* Google Signin */}
                    <button
                        onClick={handleGoogleSignin}
                        type='button'
                        className='google-btn'>
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="google"
                            className="w-5 h-5"
                        />
                        Continue with Google
                    </button>

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-500 text-xs text-center font-semibold mt-2">
                            {error}
                        </p>
                    )}

                </form>
                {/* Register Link */}
                <p className='text-center text-gray-600 mt-4'>
                    Already have an account?
                    <Link state={location.state} to={`/register`} className='text-green-600 font-semibold hover:underline ml-1'>
                        Register
                    </Link>
                </p>


            </div>

            {/* Lottie */}
            <div className="flex-1 text-center">
                <Lottie
                    className="w-full max-w-[520px] mx-auto"
                    animationData={loginLottie}
                    loop={true}
                />
            </div>

        </div>
    );
};

export default Login;
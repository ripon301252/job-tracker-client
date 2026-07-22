import React, { useState } from 'react';
import Lottie from 'lottie-react';
import loginLottie from '../assets/Lottie/sign up.json';
import { Link, useLocation, useNavigate } from 'react-router';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useAuth } from '../Hooks/useAuth';
import { toast } from 'react-toastify';
import useAxiosNormal from '../Hooks/useAxiosNormal';



const Register = () => {
    const { registerUser, setUser, updateUserProfile, signInGoogle } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);
    const [nameerror, setNameError] = useState("");
    const [error, setError] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosRegister = useAxiosNormal();
    console.log('inRegister', location)


    const handleSignUp = async (e) => {
        e.preventDefault();

        const form = e.target;

        const name = form.name.value;
        if (name.length < 5) {
            setNameError("Name should be more than 5 characters");
            toast.error("Name should be more than 5 characters")
            return;
        }
        else {
            setNameError("");
        }

        if (!image) {
            toast.error("Please select a photo");
            return;
        }

        const email = form.email.value;
        const password = form.password.value;

        setError("");
        setSuccess(false);

        const length6Pattern = /^.{6,}$/;
        const casePattern = /^(?=.*[a-z])(?=.*[A-Z]).+$/;

        if (!length6Pattern.test(password)) {
            setError("Password must be 6 characters or longer");
            toast.error("Password must be 6 characters or longer");
            return;
        }

        if (!casePattern.test(password)) {
            setError("Password must have at least one uppercase and one lowercase character");
            toast.error("Password must have at least one uppercase and one lowercase character");
            return;
        }

        setLoading(true)

        try {
            // 1️⃣ register user
            const result = await registerUser(email, password);
            const user = result.user;


            // 2️⃣ image upload (fetch diye)
            let photoURL = "";

            if (image) {
                const formData = new FormData();
                formData.append("image", image);

                const image_hosting_url = `${import.meta.env.VITE_img_url}=${import.meta.env.VITE_image_host_key}`;
                const res = await axiosRegister.post(
                    image_hosting_url,
                    formData
                );

                const data = res.data;

                console.log("IMGBB Response:", data);

                if (!data.success) {
                    throw new Error("Image upload failed");
                }

                photoURL = data.data.url;
            }

            // create user in the database
            const userInfo = {
                email: user.email,
                name: name,
                photoURL: photoURL,
                createdAt: new Date()
            }
            const dbRes = await axiosRegister.post('/api/users', userInfo);
            if (dbRes.data.insertedId) {
                console.log(' user created in the database');
            } else {
                console.log(dbRes.data.message);
            }

            // 3️⃣ update profile
            await updateUserProfile({
                displayName: name,
                photoURL: photoURL,
            });

            console.log("Updated Name:", name)

            setUser({ ...user, displayName: name, photoURL });

            toast.success("Your SignUp Successful");
            e.target.reset()
            setImage(null);
            setSuccess(true);
            navigate(location.state || "/");

        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    const handleTogglePasswordShow = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };



    return (
        <div className='flex lg:flex-row flex-col justify-center items-center max-w-4xl mx-auto min-h-screen gap-8 py-10'>

            {/* Lottie */}
            <div className="flex-1 text-center">
                <Lottie
                    animationData={loginLottie}
                    loop={true}
                    className="w-full max-w-[520px] mx-auto"
                />
            </div>

            <div className='flex-1 flex flex-col justify-center bg-white p-10 rounded-2xl shadow-xl border border-gray-200'>

                <h1 className='text-3xl font-bold text-center mb-3 text-gray-800'>
                    Create Account
                </h1>

                <p className='text-center text-gray-600 mb-5'>
                    Join <span className='font-semibold text-sky-600'>Job Tracker</span> today!
                </p>

                <form onSubmit={handleSignUp} className='space-y-3'>

                    <div className='flex justify-center'>
                        {preview && (
                            <>
                                <div className='flex flex-col'>
                                    <div>
                                        <img src={preview} className="w-20 h-20 bg-white border border-gray-300 p-2 shadow-2xl rounded-full mt-2" />
                                    </div>
                                    {/* <p className="text-sm text-gray-700">{image.name} ({(image.size / 1024).toFixed(2)} KB)</p> */}
                                </div>

                            </>
                        )}
                    </div>

                    {/* Name */}
                    <div>
                        <label className="label text-gray-800 font-semibold">Name</label>
                        <input type="text" name='name'
                            className="input input-class text-gray-800"
                            placeholder="Name" required />
                        {nameerror && (
                            <p className="text-xs text-red-500 mt-1">{nameerror}</p>
                        )}
                    </div>

                    {/* Photo  */}
                    <div>
                        <label className="label text-gray-800 font-semibold">Photo</label>
                        <input
                            type="file"
                            className="file-input file-choose input-class text-gray-800"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                console.log("Selected file:", file);
                                setImage(file);
                                setPreview(URL.createObjectURL(file));
                            }}
                        />
                    </div>

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
                                className='absolute top-2 right-3 text-sky-600 text-xl cursor-pointer'>
                                {showPassword ? <IoEyeOff /> : <IoEye />}
                            </button>
                        </div>
                    </div>



                    {/* Register Button */}
                    <button

                        type='submit'
                        disabled={loading}
                        className={`btn w-full text-gray-800 mt-4 rounded-lg border font-semibold hover:bg-gray-100 shadow-md bg-gradient-to-r border-sky-500 from-sky-500 to-sky-300 cursor-pointer hover:scale-102 transition-transform ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {loading ? "Creating..." : "Register"}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center justify-center gap-2 my-2">
                        <div className="h-px w-16 bg-gray-800"></div>
                        <span className="text-gray-800 text-sm">or</span>
                        <div className="h-px w-16 bg-gray-800"></div>
                    </div>

                    {/* Google Signin */}
                    <button
                        onClick={async () => {
                            setLoading(true);
                            try {
                                const res = await signInGoogle();
                                const user = res.user;

                                console.log("Google SignIn Result:", user);

                                // create user in DB
                                const userInfo = {
                                    email: user.email,
                                    name: user.displayName,
                                    photoURL: user.photoURL,
                                    createdAt: new Date()
                                };

                                const dbRes = await axiosRegister.post('/users', userInfo);

                                if (dbRes.data.insertedId) {
                                    console.log('user created in DB');
                                }

                                // set user
                                setUser(user);

                                toast.success("Google Sign-in successful");

                                // navigate AFTER everything done ✅
                                navigate(location.state || "/");

                            } catch (err) {
                                console.error("Google Sign-in Error:", err);

                                if (err.code === "auth/popup-closed-by-user") {
                                    toast.error("Google sign-in cancelled by user");
                                } else {
                                    toast.error(err.message);
                                }
                            } finally {
                                setLoading(false);
                            }
                        }}
                        type='button'
                        className={`google-btn ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={loading}
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="google"
                            className="w-5 h-5"
                        />
                        Continue with Google
                    </button>

                </form>
                {/* Login Link */}
                <p className='text-center text-gray-600 mt-4'>
                    Already have an account?
                    <Link state={location.state} to={`/login`} className='text-sky-600 font-semibold hover:underline ml-1'>
                        Login
                    </Link>
                </p>

                {success && (
                    <p className="text-sky-500 text-center font-semibold">
                        Account created successfully!
                    </p>
                )}
                {error && (
                    <p className="text-red-500 text-center font-semibold">{error}</p>
                )}
            </div>
        </div>
    );
};

export default Register;
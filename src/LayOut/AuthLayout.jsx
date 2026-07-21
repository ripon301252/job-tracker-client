import React from 'react';
import Logo from '../Component/Logo';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div>
            <div className='pl-10 pt-10'>
                <Logo></Logo>
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;
import { Outlet, Navigate } from 'react-router-dom';
import type { ReactNode } from "react";

import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";


const ProtectedRoute = ({ children }: {children?: ReactNode} ) => {

    const { user, loading } = useContext(UserContext);

    if (loading) {
        return <div> Please wait ... </div>
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;
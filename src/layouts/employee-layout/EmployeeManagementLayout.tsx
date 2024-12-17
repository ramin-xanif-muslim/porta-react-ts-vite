import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import SuspenseFallback from '../../components/suspense-fallback';

const EmployeeManagementLayout: React.FC = () => {
    return (
        <div className="flex flex-col w-full min-h-screen bg-gray-50">
            <main className="flex-1 p-4">
                <Suspense fallback={<SuspenseFallback />}>
                    <Outlet />
                </Suspense>
            </main>
        </div>
    );
};

export default EmployeeManagementLayout; 



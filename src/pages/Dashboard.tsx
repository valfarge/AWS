import { Shield } from 'lucide-react';

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Shield className="w-12 h-12 text-green-500" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Account Verified
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Your account has been successfully verified and is ready to use
        </p>
      </div>
    </div>
  );
};
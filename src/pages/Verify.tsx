import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { authApi } from '../services/api';
import type { VerifyCodeFormData } from '../types/auth';

const schema = z.object({
  code: z.string().length(6, 'Verification code must be 6 digits'),
});

export const Verify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userId = location.state?.userId;
  if (!userId) {
    navigate('/');
    return null;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyCodeFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: VerifyCodeFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      await authApi.verifyCode(userId, data.code);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Verify your phone number
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          We've sent a verification code to your phone
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Verification Code"
              type="text"
              maxLength={6}
              {...register('code')}
              error={errors.code?.message}
            />

            <Button type="submit" isLoading={isLoading}>
              Verify
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
// hoc/withAuthRedirect.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export const withAuthRedirect = (Component: React.ComponentType) => {
  return function AuthRedirectWrapper(props: any) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && user) {
        router.push('/'); // Redirect to home if already authenticated
      }
    }, [user, loading, router]);

    // Show nothing or a loading spinner until we know the auth status
    if (loading || user) return null;

    return <Component {...props} />;
  };
};

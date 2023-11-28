import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const accountType = "user"

    if (accountType === 'admin') {
      router.push('/dashboard');
      return
    }

    router.push('/home');
  
  }, []);

  return null;
};

export default Page;

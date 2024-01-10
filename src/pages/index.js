import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSettings } from 'src/hooks/use-settings';

const Page = () => {
  const router = useRouter();

  const { accountType } = useSettings();


  useEffect(() => {

    if (accountType === 'coach') {
      router.push('/dashboard');
      return
    }

    router.push('/home');
  
  }, [router]);

  return null;
};

export default Page;

import { AppProps } from 'next/app';
import { UserProvider } from '../context/UserContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

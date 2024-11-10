import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GNB from '@/components/@Shared/GNB';
import Container from '@/components/@Shared/Container';
import Footer from '@/components/@Shared/Footer';
import { RootProvider } from '@/hook/useRoot';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isMainPage = router.pathname === '/'; // 메인 페이지 여부 확인
  const isSearchPage = router.pathname.startsWith('/search'); // 검색 페이지 여부 확인
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        throwOnError: true,
      },
    },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <QueryClientProvider client={queryClient}>
        <RootProvider>
          <GNB />
          {/* 컨테이너 컴포넌트에 fullWidth prop을 전달 */}
          <Container fullWidth={isMainPage || isSearchPage}>
            <Component {...pageProps} />
          </Container>
          <Footer className="mt-auto" />
        </RootProvider>
      </QueryClientProvider>
    </div>
  );
}

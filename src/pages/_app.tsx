import Layout from "@/components/Layout/page";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <h1>asdasd</h1>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

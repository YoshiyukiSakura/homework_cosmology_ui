import Head from "next/head";
import { Container } from "@interchain-ui/react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container maxWidth="64rem" attributes={{ py: "$14" }}>
      <Head>
        <title>Xin&apos;s homework</title>
        <meta name="description" content="Homework demo app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </Container>
  );
}

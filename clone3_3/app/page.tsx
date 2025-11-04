"use client";

import Image from "next/image";
import { Header } from "./ui/header";
import { Body } from "./ui/body";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default function Home() {
  return (
    <ReactQueryProvider>
      <div>
        <Header></Header>
        <Body></Body>
        <footer></footer>
      </div>
    </ReactQueryProvider>
  );
}

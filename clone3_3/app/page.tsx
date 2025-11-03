"use client";

import Image from "next/image";
import { Header } from "./ui/header";
import { Body } from "./ui/body";

export default function Home() {
  return (
    <div>
      <Header></Header>
      <Body></Body>
      <footer></footer>
    </div>
  );
}

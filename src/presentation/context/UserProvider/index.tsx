"use client";

import { SessionProvider, type SessionProviderProps } from "next-auth/react";

export default function Provider(props: SessionProviderProps) {
  return (
    <SessionProvider session={props.session}>{props.children}</SessionProvider>
  );
}

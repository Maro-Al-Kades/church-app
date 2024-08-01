"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import store from "@/redux/store";
import { Provider } from "react-redux";

export function Providers({ children, themeProps }) {
  const router = useRouter();

  return (
    <Provider store={store}>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </NextUIProvider>
    </Provider>
  );
}

import { QueryClient } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient()

export default function RootLayout() {
  return <Stack 
  screenOptions={
    {
      headerShown: false
    }
  }
  />;
}

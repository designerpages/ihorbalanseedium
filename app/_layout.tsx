import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { PaperProvider } from "react-native-paper";
import { useEffect } from "react";
import "react-native-reanimated";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ headerShown: false, title: "Home" }}
          />
          <Stack.Screen name="user/[id]" options={{ title: "Details" }} />
          <Stack.Screen name="edit/[id]" options={{ title: "Edit" }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </PaperProvider>
    </QueryClientProvider>
  );
}

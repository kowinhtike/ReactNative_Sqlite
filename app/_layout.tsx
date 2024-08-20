import { Stack } from "expo-router";
import { DatabaseProvider } from './context/DatabaseContext'

export default function RootLayout() {
  return (
    <DatabaseProvider>
      <Stack>
        <Stack.Screen name="index" options={{title:"Students List"}} />
        <Stack.Screen name="(marks)/[id]" options={{title:"Marks List"}} />
      </Stack>
    </DatabaseProvider>
  );
}

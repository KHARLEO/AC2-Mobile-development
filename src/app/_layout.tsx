import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: '#6bc4df' }, headerTintColor: '#fff' }}>
      <Stack.Screen name="index" options={{ title: 'Receitas' }} />
      <Stack.Screen name="detalhes" options={{ title: 'Detalhes da receita' }} />
    </Stack>
  );
}

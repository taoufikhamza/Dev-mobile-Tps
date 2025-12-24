import { NavigationContainer } from '@react-navigation/native';
import AuthProvider, { AuthContext } from './context/AuthContext';
import AppDrawer from './navigation/AppDrawer';
import LoginScreen from './screens/LoginScreen';
import { useContext, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { initDB } from './services/database';
import { ThemeProvider } from './context/ThemeContext';
import { ActivityIndicator, View } from 'react-native';
function RootNavigator() {
  const { user } = useContext(AuthContext);
  return user ? <AppDrawer /> : <LoginScreen />;
}
export default function App() {
  const [dbReady, setDbReady] = useState(false);
  useEffect(() => { initDB(); setDbReady(true); }, []);
  if (!dbReady) return <ActivityIndicator />;
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}

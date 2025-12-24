import { createDrawerNavigator } from '@react-navigation/drawer';
import AppStack from './AppStack';
import ProfileScreen from '../screens/ProfileScreen';
import TodoListFetchScreen from '../screens/TodoListFetchScreen';
import TodoListOfflineScreen from '../screens/TodoListOfflineScreen';
const Drawer = createDrawerNavigator();
export default function AppDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='Tâches' component={AppStack} />
      <Drawer.Screen name='Profil' component={ProfileScreen} />
      <Drawer.Screen name='API (Online)' component={TodoListFetchScreen} />
      <Drawer.Screen name='SQLite (Offline)' component={TodoListOfflineScreen} />
    </Drawer.Navigator>
  );
}

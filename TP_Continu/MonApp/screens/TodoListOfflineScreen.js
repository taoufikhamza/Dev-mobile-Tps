import { View, Text, FlatList, Button, TextInput } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import { loadTodos, addTodoOffline, updateTodoOffline } from '../services/database';
import { ThemeContext } from '../context/ThemeContext';
export default function TodoListOfflineScreen() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [editingId, setEditingId] = useState(null);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const refreshTodos = () => { setTodos(loadTodos()); };
  const handleAddOrUpdate = () => {
    if (!title.trim()) return;
    if (editingId) { updateTodoOffline(editingId, title); setEditingId(null); } else { addTodoOffline(title); }
    setTitle(''); refreshTodos();
  };
  useEffect(() => { refreshTodos(); }, []);
  return ( <View> <Button title={'Passer en mode ' + (theme === 'light' ? 'dark' : 'light')} onPress={toggleTheme} /> <TextInput placeholder='Tâche offline' value={title} onChangeText={setTitle} style={{borderWidth:1}}/> <Button title={editingId ? 'Mettre à jour' : 'Ajouter'} onPress={handleAddOrUpdate} /> <FlatList data={todos} renderItem={({item}) => <View><Text>{item.title}</Text><Button title='Modifier' onPress={() => {setTitle(item.title); setEditingId(item.id)}}/></View>} /> </View> );
}

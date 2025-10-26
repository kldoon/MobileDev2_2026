import { View, Text, StyleSheet } from 'react-native';

const TodoItem = ({ item }) => {
  return (
    <View style={styles.todoItem}>
      <View style={styles.todoContent}>
        <Text style={styles.todoText}>{item.text}</Text>
        <Text style={styles.todoPriority}>Priority: {item.priority}</Text>
      </View>
      <Text style={styles.todoDate}>
        {item.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}
      </Text>
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  todoItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  todoContent: {
    marginBottom: 8
  },
  todoText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4
  },
  todoPriority: {
    fontSize: 14,
    color: '#666'
  },
  todoDate: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic'
  }
});

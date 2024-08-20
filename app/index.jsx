import React, { useEffect, useState, useContext } from "react";
import { DatabaseContext } from "./context/DatabaseContext";

import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function App() {
  const { rows, addStudent, editStudent, deleteStudent } =
    useContext(DatabaseContext);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [editId, setEditId] = useState(null);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.id}>{item.id}</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.age}> {item.age} </Text>

      <TouchableOpacity
        style={styles.eye}
        onPress={() => {
          router.push(`/${item.id}`);
        }}
      >
        <Ionicons name="eye-outline" size={30} color="blue" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.edit}
        onPress={() => {
          setEditId(item.id);
          setName(item.name);
          setAge(item.age.toString());
        }}
      >
        <Ionicons name="create" size={30} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.delete}
        onPress={() => {
          deleteStudent(item.id);
        }}
      >
        <Ionicons name="trash" size={30} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={rows}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <View>
        <TextInput
          style={styles.input}
          value={name}
          placeholder="input student name"
          onChangeText={setName}
        />
        <TextInput
          inputMode="numeric"
          style={styles.input}
          placeholder="input student age"
          value={age}
          onChangeText={setAge}
        />
        <Button
          title={editId === null ? "Add" : "Confrim"}
          onPress={() => {
            if (editId === null) {
              addStudent({ name: name, age: age });
            } else {
              editStudent({ id: editId, name: name, age: age });
            }
            setEditId(null);
            setName("");
            setAge("");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    borderWidth: 2,
    borderColor: "lightblue",
    marginBottom: 15,
    padding: 8,
  },
  id: {
    flex: 1,
  },
  name: {
    flex: 2,
  },
  age: {
    flex: 2,
  },
  eye: {
    flex: 2,
  },
  edit: {
    flex: 1,
  },
  delete: {
    flex: 1,
  },
});

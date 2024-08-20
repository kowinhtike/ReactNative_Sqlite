import React, { useEffect, useState, useContext } from "react";
import { DatabaseContext } from "../context/DatabaseContext";

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
import { useLocalSearchParams } from "expo-router";

export default function App() {
  const { marks, addMark, editMark, deleteMark, loadStudentMarks } =
    useContext(DatabaseContext);
  const [mark, setMark] = useState("");
  const [editId, setEditId] = useState(null);
  const { id } = useLocalSearchParams();

  useEffect(()=>{
    loadStudentMarks(id);
  },[])

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.id}>{item.id}</Text>
      <Text style={styles.mark}>{item.mark}</Text>
      <Text style={styles.student_id}> {item.student_id} </Text>

      <TouchableOpacity
        style={styles.edit}
        onPress={() => {
          setEditId(item.id);
          setMark(item.mark.toString());
        }}
      >
        <Ionicons name="create" size={30} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.delete}
        onPress={() => {
          deleteMark(item);
        }}
      >
        <Ionicons name="trash" size={30} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={marks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <View>
        <TextInput
          inputMode="numeric"
          style={styles.input}
          placeholder="input student mark here"
          value={mark}
          onChangeText={setMark}
        />
        <Button
          title={editId === null ? "Add" : "Confrim"}
          onPress={() => {
            if (editId === null) {
              addMark({ student_id:id, mark:mark });
            } else {
              editMark({ id: editId, student_id:id, mark:mark });
            }
            setEditId(null);
            setMark("");
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
    alignItems:"center",
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
  mark: {
    flex: 2,
  },
  student_id: {
    flex: 2,
  },
  edit: {
    flex: 1,
  },
  delete: {
    flex: 1,
  },
});

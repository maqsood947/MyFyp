import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Modal, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { onValue, push, ref, remove, update } from "firebase/database";

const AddItemsModal = ({ modalVisible, setModalVisible }) => {
  const [newMineralData, setNewMineralData] = useState({
    date: "",
    account: "",
    category: "",
    amount: "",
    note: "",
  });

  const createNewRecord = () => {
    const mineralsRef = ref(db, "items");
    push(mineralsRef, {
      ...newMineralData,
    })
      .then(() => {
        alert("New expense created successfully!");
        setNewMineralData({
          date: "",
          account: "",
          category: "",
          amount: "",
          note: "",
        });
        setModalVisible(false)
      })

      .catch((error) => {
        alert("Error creating expense : ", error);
      });
  };

  const handleInputChange = (field, value) => {
    setNewMineralData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Add Item</Text>
          <TextInput
            placeholder="Date"
            placeholderTextColor={"#E7EAE5"}
            style={styles.input}
            value={newMineralData.date}
            onChangeText={(text) => handleInputChange("date", text)}
          />
          <TextInput
            placeholder="Account"
            placeholderTextColor={"#E7EAE5"}
            style={styles.input}
            value={newMineralData.account}
            onChangeText={(text) => handleInputChange("account", text)}
          />
          <TextInput
            placeholder="Category"
            placeholderTextColor={"#E7EAE5"}
            style={styles.input}
            value={newMineralData.category}
            onChangeText={(text) => handleInputChange("category", text)}
          />
          <TextInput
            placeholder="Amount"
            placeholderTextColor={"#E7EAE5"}
            style={styles.input}
            keyboardType="numeric"
            value={newMineralData.amount}
            onChangeText={(text) => handleInputChange("amount", text)}
          />
          <TextInput
            placeholder="Note"
            placeholderTextColor={"#BFD4BF"}
            style={styles.input}
            value={newMineralData.note}
            onChangeText={(text) => handleInputChange("note", text)}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)} // Assuming Cancel will close the modal
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={createNewRecord}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    borderRadius: 15,
    backgroundColor: "#004e92",
    padding: 20,
    marginHorizontal: 20,
    elevation: 3,
  },
  modalView: {
    alignItems: "center",
  },
  modalTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    marginBottom: 22,
    backgroundColor: "#004e92",
    borderBottomColor: "#fff",
    borderBottomWidth: 0.4,
  },
  modalButtons: {
    gap: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  cancelButton: {
    borderWidth: 0.5,
    borderColor: "white",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
    marginRight: 10,
  },
  cancelButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: "#187bcd", // Adjust this color if needed to match the image
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 3,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default AddItemsModal;

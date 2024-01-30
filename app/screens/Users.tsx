import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { userType } from "../types";
import { addUser, deleteUser, editUser, getUsers } from "../libs/services";
import theme from "../resources/theme-schema.json";
import IonIcon from "react-native-vector-icons/Ionicons";

export default function Users() {
  const [users, setUsers] = useState<userType[]>([]);
  const [userFormModalVisible, setUserFormModalVisible] = useState(false);
  const [deleteUserModalVisible, setDeleteUserModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<userType | null>(null);
  const [userMode, setUserMode] = useState<"edit" | "add">("add");
  const [deleteUserId, setDeleteUserId] = useState("");

  useEffect(() => {
    _getUsers();
  }, []);

  function _getUsers() {
    getUsers()
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }

  function handleOnAddUser() {
    setUserMode("add");
    setUserFormModalVisible(true);
  }

  function handleOnEditUser(user: userType) {
    setUserMode("edit");
    setEditingUser(user);
    setUserFormModalVisible(true);
  }

  function handleOnCloseForm() {
    setUserFormModalVisible(false);
    setEditingUser(null);
  }

  function onUserLongPress(user: userType) {
    setDeleteUserId(user?.id as string);
    setDeleteUserModalVisible(true);
  }

  function onSuccess() {
    setDeleteUserId("");
    setEditingUser(null);
    _getUsers();
  }

  function onCancelDelete() {
    setDeleteUserId("");
    setDeleteUserModalVisible(false);
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <UserForm
          user={editingUser ? editingUser : undefined}
          mode={userMode}
          visible={userFormModalVisible}
          onClose={handleOnCloseForm}
          onSuccess={() => onSuccess()}
        />
        <DeleteDialog
          id={deleteUserId}
          visible={deleteUserModalVisible}
          onSuccess={onSuccess}
          onCancel={onCancelDelete}
        />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Usuarios</Text>
          <Pressable onPress={handleOnAddUser}>
            <IonIcon name="add-circle" size={32} color={theme.colors.accent} />
          </Pressable>
        </View>
        <View>
          {users.map((user, key) => (
            <UserRow
              user={user}
              key={key}
              id={key}
              onPress={() => handleOnEditUser(user)}
              onLongPress={() => onUserLongPress(user)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function UserRow(props: {
  user: userType;
  onPress: Function;
  id: number;
  onLongPress: Function;
}) {
  return (
    <Pressable
      style={styles.urContainer}
      android_ripple={{ color: theme.colors.ripple }}
      onPress={() => props.onPress()}
      onLongPress={() => props.onLongPress()}
    >
      <View style={styles.urContent}>
        <View
          style={[
            styles.urInitialContainer,
            {
              backgroundColor:
                theme["colors-list"][props.id > 10 ? props.id % 10 : props.id],
            },
          ]}
        >
          <Text style={styles.urInitial}>{props.user.name.charAt(0)}</Text>
        </View>
        <View>
          <Text style={styles.urName}>
            {props.user.name} {props.user.lastname}
          </Text>
          <Text style={styles.urUid}>uid: {props.user.id}</Text>
        </View>
      </View>
      <IonIcon name="ellipsis-vertical" color="#7D7C7C" size={22} />
    </Pressable>
  );
}

function UserForm(props: {
  visible: boolean;
  onClose: Function;
  mode: "edit" | "add";
  user?: userType;
  onSuccess: Function;
}) {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");

  useEffect(() => {
    if (props.mode === "edit" && props.user) {
      setName(props.user.name);
      setLastname(props.user.lastname);
    }
  }, [props.visible]);

  function onClose() {
    setName("");
    setLastname("");
    props.onClose();
  }

  function handleOnSave() {
    if (props.mode === "add") {
      addUser({ name, lastname })
        .then(() => props.onSuccess())
        .catch((error) => console.log(error))
        .finally(() => onClose());
    }
    if (props.mode === "edit" && props.user) {
      editUser(props.user?.id as string, { name, lastname })
        .then(() => props.onSuccess())
        .catch((error) => console.log(error))
        .finally(() => onClose());
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent
      visible={props.visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalWrapper}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>
            {props.mode === "add" ? "Agregar" : "Editar"} usuario
          </Text>
          <View style={styles.modalForm}>
            <TextInput
              placeholder="Name"
              style={styles.input}
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              placeholder="Lastname"
              style={styles.input}
              value={lastname}
              onChangeText={(text) => setLastname(text)}
            />
          </View>
          <View style={styles.modalOptions}>
            <Pressable
              style={[
                styles.modalOption,
                { backgroundColor: theme.colors.cancel },
              ]}
              onPress={() => onClose()}
              android_ripple={{ color: theme.colors["cancel-accent"] }}
            >
              <Text style={styles.modalOptionText}>Cancelar</Text>
            </Pressable>
            <Pressable
              style={[
                styles.modalOption,
                { backgroundColor: theme.colors.primary },
              ]}
              android_ripple={{ color: theme.colors["primary-accent"] }}
              onPress={handleOnSave}
            >
              <Text style={styles.modalOptionText}>Guardar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function DeleteDialog(props: {
  id: string;
  visible: boolean;
  onCancel: Function;
  onSuccess: Function;
}) {
  function onClose() {
    props.onCancel()
  }

  function handleOnConfirm() {
    deleteUser(props.id)
    .then(() => props.onSuccess())
    .catch(error => console.log(error))
    .finally(() => onClose())
  }

  return (
    <Modal
      animationType="slide"
      transparent
      visible={props.visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalWrapper}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Eliminar usuario</Text>
          <View style={styles.modalForm}>
            <Text style={styles.text}>¿Estás seguro de que quieres eliminar el usuario con id {props.id}?</Text>
          </View>
          <View style={styles.modalOptions}>
            <Pressable
              style={[
                styles.modalOption,
                { backgroundColor: theme.colors.cancel },
              ]}
              onPress={() => onClose()}
              android_ripple={{ color: theme.colors["cancel-accent"] }}
            >
              <Text style={styles.modalOptionText}>Cancelar</Text>
            </Pressable>
            <Pressable
              style={[
                styles.modalOption,
                { backgroundColor: theme.colors.primary },
              ]}
              android_ripple={{ color: theme.colors["primary-accent"] }}
              onPress={handleOnConfirm}
            >
              <Text style={styles.modalOptionText}>Eliminar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "Jakarta-Bold",
    fontSize: 32,
  },
  urContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  urContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  urInitialContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 48,
    height: 48,
    borderRadius: 32,
  },
  urInitial: {
    fontFamily: "Jakarta-Bold",
    fontSize: 24,
    lineHeight: 28,
    color: "white",
  },
  urName: {
    fontFamily: "Jakarta-SemiBold",
    fontSize: 18,
  },
  urUid: {
    fontFamily: "Jakarta-Regular",
    fontSize: 12,
  },
  modalWrapper: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#a2a2a2aa",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "white",
    width: "90%",
    borderRadius: 5,
    padding: 10,
  },
  modalTitle: {
    fontFamily: "Jakarta-SemiBold",
    fontSize: 24,
  },
  modalForm: {
    paddingVertical: 10,
    borderBottomColor: "#f5f5f5",
    borderTopColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    marginVertical: 10,
    gap: 10,
  },
  input: {
    padding: 5,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e2e2e2",
    paddingHorizontal: 10,
    borderRadius: 5,
    fontFamily: "Jakarta-Regular",
  },
  modalOptions: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  modalOption: {
    backgroundColor: "red",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
  modalOptionText: {
    fontFamily: "Jakarta-SemiBold",
    fontSize: 18,
    lineHeight: 20,
    color: "white",
  },
  text: {
    fontFamily: "Jakarta-Regular",
    fontSize: 16
  }
});

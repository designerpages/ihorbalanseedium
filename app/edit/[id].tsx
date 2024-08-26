import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Text, TextInput } from "react-native-paper";
import { useUser } from "@/hooks/api/useUser";
import { useLocalSearchParams } from "expo-router";
import { getSearchParam } from "@/helpers/getSearchParam";
import { useUserUpdate } from "@/hooks/api/useUserUpdate";
import { useEffect, useState } from "react";

export default function DetailScreen() {
  const { id } = useLocalSearchParams();

  // Potentially we can use specific library to manage form, but for test purposes we will use state
  const [formData, setFormData] = useState({
    name: "",
    job: "",
  });

  // hooks
  const { data, isLoading } = useUser(getSearchParam(id));
  const { mutate } = useUserUpdate();

  const user = data?.data;

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.first_name,
        job: user.job ?? "",
      });
    }
  }, [user]);

  const handleUpdateState = (field: "name" | "job") => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!user) return;

    mutate({
      id: user.id,
      body: {
        name: formData.name,
        job: formData.job,
      },
    });
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.content}>
        {isLoading && (
          <ActivityIndicator
            style={{ marginTop: 20 }}
            animating={true}
            size={"large"}
          />
        )}
        {user && (
          <View>
            <Text variant={"titleMedium"} style={styles.title}>
              Edit information about user {user.first_name} {user.last_name}
            </Text>
            <View style={styles.inputWrapper}>
              <TextInput
                label="Name"
                value={formData.name}
                onChangeText={handleUpdateState("name")}
              />
              <TextInput
                label="Job"
                value={formData.job}
                onChangeText={handleUpdateState("job")}
              />
            </View>
            <Button mode={"contained"} onPress={handleSave}>
              Save
            </Button>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 16,
  },
  inputWrapper: {
    display: "flex",
    gap: 16,
    marginBottom: 16,
  },
  content: {
    marginTop: 16,
    flex: 1,
    padding: 16,
    gap: 16,
    overflow: "hidden",
  },
});

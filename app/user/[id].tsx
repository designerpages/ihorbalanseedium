import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Avatar, Text } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { useUser } from "@/hooks/api/useUser";
import { useLocalSearchParams } from "expo-router";
import { getSearchParam } from "@/helpers/getSearchParam";

export default function DetailScreen() {
  const theme = useTheme();
  const { id } = useLocalSearchParams();

  // hooks
  const { data, isLoading } = useUser(getSearchParam(id));

  const user = data?.data;

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
            <View style={styles.avatarWrapper}>
              <Avatar.Image size={96} source={{ uri: user.avatar }} />
            </View>

            <View style={styles.infoWrapper}>
              <Text
                variant={"labelLarge"}
                style={{
                  color: theme.colors.secondary,
                }}
              >
                First name
              </Text>
              <Text
                variant={"titleMedium"}
                style={{
                  color: theme.colors.primary,
                }}
              >
                {user.first_name}
              </Text>
            </View>
            <View style={styles.infoWrapper}>
              <Text
                variant={"labelLarge"}
                style={{
                  color: theme.colors.secondary,
                }}
              >
                Last name
              </Text>
              <Text
                variant={"titleMedium"}
                style={{
                  color: theme.colors.primary,
                }}
              >
                {user.last_name}
              </Text>
            </View>
            <View style={styles.infoWrapper}>
              <Text
                variant={"labelLarge"}
                style={{
                  color: theme.colors.secondary,
                }}
              >
                Email
              </Text>
              <Text
                variant={"titleMedium"}
                style={{
                  color: theme.colors.primary,
                }}
              >
                {user.email}
              </Text>
            </View>
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
  infoWrapper: {
    marginBottom: 16,
  },
  avatarWrapper: {
    marginBottom: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    marginTop: 16,
    flex: 1,
    padding: 16,
    gap: 16,
    overflow: "hidden",
  },
});

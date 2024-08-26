import { StyleSheet, Text, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserList } from "@/hooks/api/useUserList";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  IconButton,
  Modal,
  Portal,
  Menu,
  Divider,
} from "react-native-paper";
import { useMemo, useState } from "react";
import PaginationDot from "react-native-animated-pagination-dot";
import { useTheme } from "react-native-paper";
import { useUserDelete } from "@/hooks/api/useUserDelete";
import { User } from "@/types/user.type";
import { router } from "expo-router";

export default function HomeScreen() {
  const theme = useTheme();
  // state
  const [activeUser, setActiveUser] = useState<null | User>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [page, setPage] = useState(0);

  // hooks
  const { data, isLoading } = useUserList({
    page: page + 1,
    per_page: 8,
  });
  const { mutate: deleteUser } = useUserDelete();

  const [hasPrevPage, hasNextPage] = useMemo(
    () => [page - 1 >= 0, page + 1 < (data?.total_pages ?? 0)],
    [data?.total_pages, page],
  );

  const handleDeleteUser = () => {
    if (!activeUser) return;

    setActiveUser(null);
    setIsMenuVisible(false);
    deleteUser(activeUser.id);
  };

  return (
    <View style={styles.rootContainer}>
      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={() => setIsModalVisible(false)}
          style={{ margin: 20 }}
          contentContainerStyle={{ padding: 20, backgroundColor: "white" }}
        >
          <Text>
            Since the application using public API, some CRUD operations won't
            result in any real changes. Though I have implemented optimistic
            update and delete which should give you a feel of real-time updates.
          </Text>
        </Modal>
      </Portal>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.content}>
          <ScrollView scrollEventThrottle={16}>
            <Button onPress={() => setIsModalVisible(true)}>
              Additional Info
            </Button>
            <View style={{ flex: 1 }}>
              {isLoading && (
                <ActivityIndicator
                  style={{ marginTop: 20 }}
                  animating={true}
                  size={"large"}
                />
              )}
              {data?.data.map((user) => (
                <Card.Title
                  key={user.id}
                  title={user.first_name}
                  subtitle={user.email}
                  left={() => (
                    <Avatar.Image size={32} source={{ uri: user.avatar }} />
                  )}
                  right={(props) => (
                    <IconButton
                      {...props}
                      icon="dots-vertical"
                      onPress={(e) => {
                        setActiveUser(user);
                        e.target.measure((_, __, width, ___, px, py) => {
                          setPosition({ x: px + width, y: py });
                        });
                        setIsMenuVisible(true);
                      }}
                    />
                  )}
                />
              ))}
            </View>
          </ScrollView>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              disabled={!hasPrevPage}
              onPress={() => setPage((prev) => prev - 1)}
            >
              Prev
            </Button>
            <PaginationDot
              activeDotColor={theme.colors.primary}
              curPage={page}
              maxPage={data?.total_pages ?? 0}
            />
            <Button
              disabled={!hasNextPage}
              onPress={() => setPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </View>
        </View>
      </SafeAreaView>
      <Menu
        visible={isMenuVisible}
        anchorPosition={"bottom"}
        onDismiss={() => setIsMenuVisible(false)}
        anchor={position}
      >
        <Menu.Item
          leadingIcon={"eye-outline"}
          onPress={() => {
            if (!activeUser) return;

            router.push(`/user/${activeUser.id}`);
            setIsMenuVisible(false);
          }}
          title="View"
        />
        <Divider />
        <Menu.Item
          leadingIcon={"pencil"}
          onPress={() => {
            if (!activeUser) return;

            router.push(`/edit/${activeUser.id}`);
            setIsMenuVisible(false);
          }}
          title="Edit"
        />
        <Divider />
        <Menu.Item
          leadingIcon={"delete"}
          onPress={handleDeleteUser}
          title="Delete"
        />
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    gap: 16,
    overflow: "hidden",
  },
});

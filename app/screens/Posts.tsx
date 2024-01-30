import { useEffect, useState } from "react";
import { Image, RefreshControl, Text } from "react-native";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getProfiles } from "../libs/services";
import { postType } from "../types";
import IonIcon from "react-native-vector-icons/Ionicons";
import theme from "../resources/theme-schema.json"

export default function Profiles() {
  const [posts, setPosts] = useState<postType[]>([]);

  useEffect(() => {
    _getProfiles();
  }, []);

  function _getProfiles() {
    getProfiles()
      .then((data) => setPosts(data))
      .catch((error) => console.log(error))
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Unplash posts</Text>
        </View>
        <View style={styles.content}>
          {posts.map((post, key) => (
            <Post post={post} key={key} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Post(props: { post: postType }) {
  return (
    <View style={styles.prCard}>
      <View style={styles.prHeader}> 
        <Image
          source={{ uri: props.post.user.profile_image.medium }}
          style={[styles.prProfileImage, { borderColor: props.post.color }]}
          height={32}
          width={32}
        />
        <Text style={styles.prHeaderUsername}>{props.post.user.username}</Text>
      </View>
      <Image
        source={{ uri: props.post.urls.regular }}
        height={300}
        loadingIndicatorSource={{ uri: props.post.urls.thumb }}
      />
      <View style={styles.prContent}>
        <View style={styles.prLikesContainer}>
            <IonIcon name="heart" size={18} color={theme.colors.accent} />
            <Text style={styles.prLikes}>{props.post.likes}</Text>
        </View>
        <Text style={styles.prDescriptionUser}>{props.post.user.username} <Text style={styles.prDescription} numberOfLines={2}>{props.post.alt_description}</Text> </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
  },
  headerTitle: {
    fontFamily: "Jakarta-Bold",
    fontSize: 32,
  },
  content: {
    gap: 10,
    paddingVertical: 20,
  },
  prCard: {
    backgroundColor: "#ffffff",
    elevation: 10,
    shadowColor: "#e2e2e2",
  },
  prHeader:{
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding:10
  },
  prHeaderUsername: {
    fontFamily: "Jakarta-SemiBold"
  },
  prContent: {
    padding:20
  },
  prProfileImage: {
    borderRadius: 24,
  },
  prDescriptionUser:{
    fontFamily: "Jakarta-Bold"
  },
  prDescription: {
    fontFamily: "Jakarta-Regular",
  },
  prLikesContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  prLikes: {
    fontFamily: "Jakarta-SemiBold",
    fontSize: 16,
    lineHeight: 18
  }
});

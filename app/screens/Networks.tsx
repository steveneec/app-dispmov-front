import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import socialNetworks from "../resources/social-networks.json";
import IonIcon from "react-native-vector-icons/Ionicons";
import theme from "../resources/theme-schema.json";

export default function Networks() {
  function handleOnPress(url: string) {
    Linking.openURL(url);
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Image source={require("../resources/images/profile.jpeg")} style={styles.profileImage}/>
          <Image source={require("../resources/images/bg.png")} style={styles.profileHero} resizeMode="cover"/>
          <View style={styles.profileContent}>
            <Text style={styles.profileName}>Steven Erraez</Text>
            <Text style={styles.profileSchool}>Universidad Central del Ecuador</Text>
          </View>
        </View>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Mis redes</Text>
        </View>
        <View>
          {socialNetworks.map((network, key) => (
            <Pressable
              onPress={() => handleOnPress(network.url)}
              key={key}
              style={styles.networkRow}
              android_ripple={{color: theme.colors.ripple}}
            >
              <View style={styles.nrContent}>
                <IonIcon name={network.icon} color={network.color} size={24} />
                <Text style={styles.networkName}>{network.name}</Text>
              </View>
              <IonIcon name="open-outline" color="#7D7C7C" size={22} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  networkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 14,
    justifyContent: "space-between",
  },
  nrContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  networkName: {
    fontFamily: "Jakarta-SemiBold",
    fontSize: 16,
  },
  header: {
    padding:20
  },
  headerTitle: {
    fontFamily: "Jakarta-Bold",
    fontSize: 32
  },
  profileImage: {
    width: 96,
    height: 96,
    position: "absolute",
    zIndex: 99,
    borderRadius: 64,
    top: "50%",
    left: "50%",
    transform: [{translateX: -48}, {translateY: -96}]
  },
  profileHero: {
    height: 260,
    width: "100%"
  },
  profileContent: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "25%",
    left: 0,
    right: 0,
    zIndex: 99
  },
  profileName: {
    fontFamily: "Jakarta-SemiBold",
    fontSize: 24,
    color: "white"
  },
  profileSchool: {
    fontFamily: "Jakarta-Regular",
    color: "white",
    fontSize: 18
  }
});

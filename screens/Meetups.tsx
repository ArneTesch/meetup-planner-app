import { useQuery } from "@apollo/react-hooks";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import SafeAreaView from "react-native-safe-area-view";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";
import { RootParamList } from "../App";
import LoadingSpinner from "../components/LoadingSpinner";
import { GET_MEETUPS } from "../graphql/meetups";
import { Meetup } from "../graphql/models";
import { colors } from "../styles/colors";
import timeStampToDate from "../utils/timeStampToDate";

type MeetupsScreenNavigationProp = StackNavigationProp<
  RootParamList,
  "Meetups"
>;

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  route: MeetupsScreenNavigationProp;
};

const MeetupsScreen: React.FC<Props> = props => {
  const { navigation, route } = props;
  const [meetups, setMeetups] = useState<Meetup[]>([]);

  const { data, loading, error } = useQuery(GET_MEETUPS, {
    onCompleted: data => {
      // console.log(data.meetups);
      setMeetups(data.meetups);
    }
  });

  if (loading) return <LoadingSpinner size="large" color="#fff" />;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.screenContent}>
        <Text style={styles.screenTitle}>Meetup Agenda</Text>
        <View style={styles.meetupList}>
          {meetups.map(meetup => (
            <View style={styles.meetupListItem} key={meetup._id}>
              <View style={styles.itemInfo}>
                <Text style={styles.meetupTitle}>{meetup.title}</Text>
                <Text style={styles.meetupLocation}>{meetup.location}</Text>
                <Text style={styles.meetupDescription}>
                  {meetup.description}
                </Text>
                <View style={styles.hr}></View>
                <View style={styles.bottomInfo}>
                  <View>
                    <Text style={styles.label}>Date</Text>
                    <Text style={styles.meetupDate}>
                      {timeStampToDate(meetup.date)}
                    </Text>
                  </View>
                  <TouchableHighlight
                    underlayColor="transparent"
                    onPress={() => console.log("details")}
                  >
                    <Text style={styles.viewDetailsButton}>View Details</Text>
                  </TouchableHighlight>
                </View>
              </View>
              <View style={styles.itemLogo}>
                <Image
                  style={styles.meetupLogo}
                  source={require("../assets/logo.png")}
                />
              </View>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  hr: {
    backgroundColor: "rgba(0,0,0,.1)",
    height: 1,
    width: "100%",
    marginBottom: 20
  },
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
    paddingTop: 75
  },
  screenContent: {
    flex: 1
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    paddingHorizontal: 25,
    marginBottom: 50
  },
  meetupList: {
    paddingLeft: 25
  },
  meetupListItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    color: colors.dark.primary,
    marginBottom: 25,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6
  },
  label: {
    fontWeight: "700",
    color: "rgba(0,0,0,.3)",
    textTransform: "uppercase",
    fontSize: 12,
    marginBottom: 2
  },
  itemLogo: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5
  },
  itemInfo: {
    flex: 1,
    paddingRight: 20
  },
  meetupLogo: {
    width: 60,
    height: 64
  },
  meetupTitle: {
    fontWeight: "600",
    fontSize: 21,
    marginBottom: 0
  },
  meetupLocation: {
    color: colors.dark.accent,
    maxWidth: 250,
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: "500",
    marginBottom: 15
  },
  meetupDescription: {
    color: colors.dark.primary,
    marginBottom: 5,
    fontWeight: "700"
  },
  bottomInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  meetupDate: {
    color: colors.dark.accent,
    fontWeight: "700"
  },
  viewDetailsButton: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.dark.primary,
    textTransform: "uppercase"
  }
});

export default MeetupsScreen;

import { useQuery } from "@apollo/react-hooks";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
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
      console.log(data.meetups);
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
              <Text style={styles.meetupTitle}>{meetup.title}</Text>
              <Text style={styles.meetupLocation}>{meetup.location}</Text>
              <View style={styles.hr}></View>
              <Text style={styles.meetupLocation}>
                {timeStampToDate(meetup.date)}
              </Text>
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
    marginVertical: 20
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
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    color: colors.dark.primary,
    marginBottom: 25,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6
  },
  meetupTitle: {
    fontWeight: "600",
    fontSize: 21,
    marginBottom: 5
  },
  meetupLocation: {
    color: colors.dark.accent,
    maxWidth: 250,
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: "500"
  }
});

export default MeetupsScreen;

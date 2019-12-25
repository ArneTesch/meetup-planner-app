import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import LoadingSpinner from "../components/LoadingSpinner";
import { Speaker } from "../graphql/models";
import { colors } from "../styles/colors";

const GET_SPEAKERS = gql`
  {
    speakers {
      _id
      name
      age
      nationality
      avatar
      expertise {
        title
      }
    }
  }
`;

type Props = {};

const SpeakersScreen: React.FC<Props> = props => {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const { data, loading, error } = useQuery(GET_SPEAKERS, {
    onCompleted: data => {
      console.log(data.speakers);
      setSpeakers(data.speakers);
    }
  });

  if (loading) return <LoadingSpinner size="large" color="#fff" />;

  if (error)
    return (
      <View>
        <Text>ERROR!</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.screenContent}>
        <Text style={styles.screenTitle}>Speakers</Text>
        <View style={styles.speakerList}>
          {speakers.map(speaker => (
            <View style={styles.speakerListItem} key={speaker._id}>
              <View style={styles.itemInfo}>
                <Text style={styles.speakerName}>{speaker.name}</Text>
                <Text style={styles.speakerExpertise}>
                  {speaker.expertise.domain && (
                    <Text>{speaker.expertise.domain} - </Text>
                  )}
                  {speaker.expertise.title && (
                    <Text>{speaker.expertise.title}</Text>
                  )}
                </Text>
                <Text style={styles.speakerNationality}>
                  {speaker.nationality}
                </Text>
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
  speakerList: {
    paddingLeft: 15
  },
  speakerListItem: {
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
  itemInfo: {
    flex: 1,
    paddingRight: 20
  },
  speakerName: {
    fontWeight: "600",
    fontSize: 21,
    marginBottom: 0
  },
  speakerExpertise: {
    color: colors.dark.accent,
    maxWidth: 250,
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: "500",
    marginBottom: 15
  },
  speakerNationality: {
    color: colors.dark.primary,
    marginBottom: 5,
    fontWeight: "700"
  }
});

export default SpeakersScreen;

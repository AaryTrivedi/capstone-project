import React, { useEffect, useState } from "react";
import { View, Button, Text } from "native-base";
import { getReviewsOfUser, getUserById } from "../../../api/users";

export default function UserDetail({
  userId,
  navigateToMessage,
  navigateToProfile,
}) {
  const [user, setUser] = useState({});
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData().then(() => setLoading(false));
  }, []);

  const getData = async () => {
    const rating = await getRating();
    const userDetails = await getUserDetails();
    setRating(rating);
    setUser(userDetails);
  };

  const getRating = async () => {
    const response = await getReviewsOfUser(userId);
    const [result, error] = response;
    if (error) {
      console.log("HERE 4");
      console.error(error);
      return;
    }
    const ratingStars = getRatingStar(result.data.data.reviews);
    return ratingStars;
  };

  const getRatingStar = (allReviews) => {
    let sum = 0;
    for (const review of allReviews) {
      sum += review.rating;
    }
    const avg = sum / allReviews.length;
    return avg;
  };

  const getUserDetails = async () => {
    const response = await getUserById(userId);
    const [result, error] = response;
    if (error) {
      console.log("HERE 3");
      console.error(error);
      return;
    }
    return result.data.data.user;
  };

  return (
    <View marginTop={-2} margin={2} padding={3}>
      <View flex={1} flexDirection={"row"} justifyContent={"space-between"}>
        <Text
          style={{
            fontWeight: "bold",
            borderWidth: 1,
            padding: "5%",
            backgroundColor: "white",
            borderColor: "#ccc",
          }}
        >
          {"Driver: " + user.firstName + " " + user.lastName}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            borderWidth: 1,
            padding: "5%",
            backgroundColor: "white",
            borderColor: "#ccc",
          }}
        >
          {"Total Ride: " + user.numberOfRides}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            borderWidth: 1,
            padding: "5%",
            backgroundColor: "white",
            borderColor: "#ccc",
          }}
        >
          {rating}
        </Text>
      </View>
      <View justifyContent={"space-between"} marginTop={5} flex={1} flexDirection={"row"} marginBottom={-10}>
        <Button
          style={{
            fontWeight: "bold",
            borderWidth: 1,
            padding: "10%",
            backgroundColor: "white",
            borderColor: "#ccc",
          }}
          onPress={navigateToMessage}
          height={"9"}
          width={"48"}
          variant={"link"}
        >
          Message
        </Button>
        <Button
          style={{
            fontWeight: "bold",
            borderWidth: 1,
            padding: "10%",
            backgroundColor: "white",
            borderColor: "#ccc",
          }}
          onPress={navigateToProfile}
          height={"9"}
          width={"48"}
          variant={"link"}
        >
          View Profile
        </Button>
      </View>
    </View>
  );
}

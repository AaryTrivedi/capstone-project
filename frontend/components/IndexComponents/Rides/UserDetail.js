import React, { useEffect, useState } from 'react'
import { View, Button, Text, Heading } from 'native-base';
import { getReviewsOfUser, getUserById } from '../../../api/users';

export default function UserDetail({ userId, navigateToMessage, navigateToProfile }) {

    const [user, setUser] = useState({});
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData()
            .then(() => setLoading(false));
    }, []);

    const getData = async () => {
        const rating = await getRating();
        const userDetails = await getUserDetails();
        setRating(rating);
        setUser(userDetails);
    }

    const getRating = async () => {
        const response = await getReviewsOfUser(userId)
        const [result, error] = response;
        if (error) {
            console.log("HERE 4");
            console.error(error);
            return;
        }
        const ratingStars = getRatingStar(result.data.data.reviews);
        return ratingStars;
    }

    const getRatingStar = (allReviews) => {
        let sum = 0;
        for (const review of allReviews) {
            sum += review.rating;
        }
        const avg = sum / allReviews.length;
        return avg;
    }

    const getUserDetails = async () => {
        const response = await getUserById(userId)
        const [result, error] = response;
        if (error) {
            console.log("HERE 3");
            console.error(error);
            return;
        }
        return result.data.data.user;
    }

    return (
        <View
            margin={3}
            padding={5}
            background="white">
            <View
                flex={1}
                flexDirection={"row"}
                justifyContent={"space-between"}>
                <View>
                    <Heading>
                        {user.firstName + " " + user.lastName}
                    </Heading>
                </View>
                <View>
                    <Heading fontSize={"md"}>
                        No. of Rides
                    </Heading>
                    <Text>{user.numberOfRides}</Text>
                </View>
                <View>
                    <Heading fontSize={"md"}>
                        Ratings
                    </Heading>
                    <Text>{isNaN(rating) ? 0 : rating}</Text>
                </View>
            </View>
            <View marginTop={5} flex={1} flexDirection={"row"}>
                <Button onPress={navigateToMessage} height={"9"} width={"48"} variant={"link"}>
                    Message
                </Button>
                <Button onPress={navigateToProfile} height={"9"} width={"48"} variant={"link"}>
                    View Profile
                </Button>
            </View>
        </View>
    )
}

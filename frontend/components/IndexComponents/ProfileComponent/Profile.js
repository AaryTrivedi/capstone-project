import { Alert, TouchableOpacity, SafeAreaView, StyleSheet, Image, ImageBackground } from 'react-native'
import StarRating from 'react-native-star-rating';
import { View, Text, ScrollView, Heading, TextArea, Button } from 'native-base';
import React, { useContext, useState, useEffect } from "react";
import { createReview, getUserById, getReviewsOfUser } from '../../../api/users';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../../../context/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Profile({ route, navigation }) {

    const authContext = useContext(AuthContext);

    const [userId, setUserId] = useState("");
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [ratingStars, setRatingStars] = useState(0);
    const [user, setUser] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [reviews, setReviews] = useState([]);
    const [starCount, setstarCount] = useState(4);
    const [review, setReview] = useState("");

    useEffect(() => {
        const userId = route.params === undefined ? "" : route.params.userId;
        setUserId(userId);
        setShowReviewForm(route.params !== undefined);
        getUserById("")
            .then(response => {
                const [result, error] = response;
                if (error) {
                    console.log("HERE 1");
                    console.error("Current User", error);
                    return;
                }
                setCurrentUser(result.data.data.user);
            })
        getUserById(userId)
            .then(response => {
                const [result, error] = response;
                if (error) {
                    console.log("HERE 2");
                    console.error(error);
                    return;
                }
                setUser(result.data.data.user);
                getUserReviews(result.data.data.user._id);
            })
    }, [])

    const getUserReviews = (id) => {
        getReviewsOfUser(id)
            .then(response => {
                const [result, error] = response;
                if (error) {
                    console.log("HERE 3");
                    console.error(error);
                    return;
                }
                const ratingStars = getRatingStar(result.data.data.reviews);
                setReviews(result.data.data.reviews);
                setRatingStars(ratingStars)
            })
    }

    const onStarRatingPress = (rating) => {
        setstarCount(rating)
    }

    const submitReview = () => {
        const reviewDetails = {
            forUser: userId,
            rating: starCount,
            comment: review,
        }
        createReview(reviewDetails)
            .then(response => {
                const [result, error] = response;
                if (error) {
                    console.log(error);
                    return;
                }
                const review = {
                    ...reviewDetails,
                    fromUser: currentUser
                };
                const newReviews = [...reviews];
                newReviews.unshift(review)
                setReviews(newReviews)
                setstarCount(0);
                setReview("");
                setRatingStars(newReviews);
            })
    }

    const getRatingStar = (allReviews) => {
        let sum = 0;
        for (const review of allReviews) {
            sum += review.rating;
        }
        const avg = sum / allReviews.length;
        return avg;
    }

    const logout = async () => {
        AsyncStorage.removeItem("user");
        await SecureStore.deleteItemAsync("token");
        authContext.logoutUser();
    };

    const navigateToSettings = () => {
        navigation.navigate("Settings")
    }


    return (
        <View height={"full"}>
            <View height={"1/3"}>
                <View
                    padding={3}
                    flexDirection="row"
                    justifyContent={"space-between"}>
                    <View>
                        <Heading fontSize="2xl">
                            Profile
                        </Heading>
                    </View>
                    {
                        showReviewForm === false &&
                        <Button backgroundColor='transparent' padding={0} onPress={navigateToSettings}>
                            <Icon name="cog" size={32} />
                        </Button>
                    }
                </View>
                <View style={Styles.profileContainer}>
                    <ImageBackground
                        source={require("../../../assets/Home1.png")}
                        style={{ width: "100%", height: "100%" }}
                    >
                        <View flex={1} alignItems={'center'} marginTop={2}>
                            <Heading>{user.firstName + " " + user.lastName}</Heading>
                            <Text>Ratings ({reviews.length})</Text>
                            <View style={Styles.starRating}>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    starSize={33}
                                    rating={ratingStars}
                                />
                            </View>
                            <Text>Jobs : {user.numberOfRides}</Text>
                        </View>
                    </ImageBackground>
                </View>
            </View>
            {
                showReviewForm === true &&
                (<View height={"1/4"} marginTop={10}>
                    <View style={Styles.starRating}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            starSize={33}
                            rating={starCount}
                            selectedStar={(rating) => onStarRatingPress(rating)}
                        />
                    </View>
                    <View mx={5} mt={3}>
                        <TextArea
                            h={20}
                            placeholder="Text Area Placeholder"
                            w="100%"
                            onChangeText={setReview}
                        ></TextArea>
                    </View>
                    <View m={5}>
                        <Button onPress={submitReview}>Add Review</Button>
                    </View>
                </View>)
            }
            <ScrollView height={userId === undefined ? "2/3" : '1/3'} marginTop={10}>
                <Text margin={2} fontSize={"xl"} fontWeight={"bold"}>They are saying...</Text>
                <View>
                    {
                        reviews.map(review => (
                            <View style={Styles.childContainer} key={review._id}>
                                <View>
                                    <Text>
                                        {review.fromUser.firstName + " " + review.fromUser.lastName}
                                    </Text>
                                </View>
                                <View>
                                    <StarRating
                                        disabled={true}
                                        maxStars={5}
                                        starSize={20}
                                        rating={review.rating}
                                    />
                                </View>
                                <Text>
                                    {review.comment}
                                </Text>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
            {
                showReviewForm === false &&
                <TouchableOpacity onPress={logout} style={Styles.logout}>
                    <Text style={Styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
            }
        </View>
    );
}

const Styles = StyleSheet.create({
    header: {
        fontSize: 30,
        padding: 10,
        alignSelf: "center",
    },
    ReviewHeader: {
        fontSize: 22,
        fontWeight: '500',
    },
    container: {
        flex: 1,
        width: "100%",
    },
    childContainer: {
        padding: 10,
        borderRadius: 2,
        margin: "1%",
        borderWidth: 0.2,
        justifyContent: 'center',
        flexDirection: 'row',
        // justifyContent: 'space-between'
    },
    logout: {
        borderWidth: 4,
        marginRight: 40,
        marginLeft: 40,
        marginTop: 80,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#ff0000',
    },
    logoutText: {
        textAlign: "center",
        color: '#ff0000',
    },
    driverName: {
        alignSelf: 'center',
        fontWeight: '900',
        fontSize: 28,
    },

    profileText: {
        alignSelf: 'center',
        fontWeight: '800',
        marginTop: '2%'
    },

    starRating: {
        marginLeft: '20%',
        marginRight: '20%',
        marginTop: '2%',
        // backgroundColor: '#ffd700',
    },

    icons: {
        width: 100,
        height: 100,
        opacity: 1,
        borderRadius: 400 / 2,
        borderWidth: 1,
        marginTop: "5%",
        alignSelf: "center",
        resizeMode: 'stretch',
    },
    reviewIcon: {
        borderRadius: 400 / 2,
        width: 50,
        height: 50,
    },
    profileContainer: {
        borderWidth: 1,
        height: "100%"
        //backgroundColor: '#afb3ba',
    }
})

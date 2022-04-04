import React, { useState, useEffect, useContext } from "react";
import {
    StyleSheet,
    Dimensions,
    ImageBackground,
    TouchableOpacity
} from "react-native";
import { Button, Heading, Input, View, Text, Radio, Stack } from 'native-base';
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";
import { setToken } from "../helpers/Token";
import { setUser } from "../helpers/user";
import { registerUser } from "../api/auth";

export default function Signup({ navigation }) {

    const authContext = useContext(AuthContext);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("driver");
    const [errors, setErrors] = useState({
        firstNameError: "",
        lastNameError: "",
        emailError: "",
        passwordError: "",
        confirmPasswordError: "",
    })

    useEffect(() => {
        if (firstName.trim() === "") {
            setErrors({
                ...errors,
                firstNameError: "First name cannot be empty"
            })
        } else {
            setErrors({
                ...errors,
                firstNameError: "",
            });
        }
    }, [firstName])

    useEffect(() => {
        if (lastName.trim() === "") {
            setErrors({
                ...errors,
                lastNameError: "Last name cannot be empty",
            });
        } else {
            setErrors({
                ...errors,
                lastNameError: "",
            });
        }
    }, [lastName])

    useEffect(() => {
        if (email.trim() === "") {
            setErrors({
                ...errors,
                emailError: "Email cannot be empty",
            });
        } else {
            setErrors({
                ...errors,
                emailError: "",
            });
        }
    }, [email])

    useEffect(() => {
        if (password.trim() === "") {
            setErrors({
                ...errors,
                passwordError: "Password cannot be empty",
            });
        } else if (password.trim() !== confirmPassword.trim()) {
            setErrors({
                ...errors,
                confirmPasswordError: "Password does not match",
            });
        } else {
            setErrors({
                ...errors,
                passwordError: "",
                confirmPasswordError: ""
            });
        }
    }, [password])

    useEffect(() => {
        if (confirmPassword.trim() === "" && password.trim() !== "") {
            setErrors({
                ...errors,
                confirmPasswordError: "Confirm Password cannot be empty",
            });
        } else if (password.trim() !== confirmPassword.trim()) {
            setErrors({
                ...errors,
                confirmPasswordError: "Password does not match",
            });
        } else {
            setErrors({
                ...errors,
                confirmPasswordError: "",
            });
        }
    }, [confirmPassword]);

    const isDisabled = () => {
        return (
            email.trim() === "" ||
            firstName.trim() === "" ||
            lastName.trim() === "" ||
            password.trim() === "" ||
            confirmPassword.trim() === "" ||
            errors.emailError.trim() !== "" ||
            errors.passwordError.trim() !== "" ||
            errors.confirmPasswordError.trim() !== ""
        );
    }

    const onSubmit = () => {
        const userDetails = {
            firstName, lastName, email, password, role
        }
        registerUser(userDetails)
            .then(async (response) => {
                const [result, error] = response;
                if (error) {
                    console.error(error);
                    return;
                }
                await setToken(result.data.token);
                await setUser(result.data.user);
                authContext.signInUser();
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <ImageBackground
            source={require("../assets/login.png")}
            style={{ height: Dimensions.get("screen") }.height}
        >
            <View padding={"3"}>
                <Heading size={"lg"} style={{margin:'20%',marginBottom:'5%'}}>Create an account</Heading>
                <View paddingY={"2"}>
                    <Text>
                        First name{" "}
                        <Text fontSize={"sm"} color={"red.600"}>
                            {errors.firstNameError}
                        </Text>
                    </Text>
                    <Input
                        background={"white"}
                        placeholder="First name"
                        value={firstName}
                        onChangeText={setFirstName}
                        isInvalid={errors.firstNameError.length > 0}
                    />
                </View>
                <View paddingY={"2"}>
                    <Text>
                        Last name{" "}
                        <Text fontSize={"sm"} color={"red.600"}>
                            {errors.lastNameError}
                        </Text>
                    </Text>
                    <Input
                        background={"white"}
                        placeholder="Last Name"
                        value={lastName}
                        onChangeText={setLastName}
                        isInvalid={errors.lastNameError.length > 0}
                    />
                </View>
                <View paddingY={"2"}>
                    <Text>
                        Email{" "}
                        <Text fontSize={"sm"} color={"red.600"}>
                            {errors.emailError}
                        </Text>
                    </Text>
                    <Input
                        background={"white"}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        isInvalid={errors.emailError.length > 0}
                    />
                </View>
                <View paddingY={"2"}>
                    <Text>
                        Password{" "}
                        <Text fontSize={"sm"} color={"red.600"}>
                            {errors.passwordError}
                        </Text>
                    </Text>
                    <Input
                        type="password"
                        background={"white"}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        isInvalid={errors.passwordError.length > 0}
                    />
                </View>
                <View paddingY={"2"}>
                    <Text>
                        Confirm Password{" "}
                        <Text fontSize={"sm"} color={"red.600"}>
                            {errors.confirmPasswordError}
                        </Text>
                    </Text>
                    <Input
                    Input
                        type="password"
                        background={"white"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        isInvalid={errors.confirmPasswordError.length > 0}
                    />
                </View>
                <View paddingY={"2"}>
                    <Text>Register As</Text>
                    <Radio.Group value={role} onChange={setRole}>
                        <Stack
                            direction={"row"}
                            alignItems="center"
                            space={4}
                            w="75%"
                            maxW="300px"
                        >
                            <Radio value="driver">Driver</Radio>
                            <Radio value="passenger">Passenger</Radio>
                        </Stack>
                    </Radio.Group>
                </View>
                <View paddingY={"2"}>
                    <Button
                        width={"full"}
                        colorScheme="tertiary"
                        isDisabled={isDisabled()}
                        onPress={onSubmit}
                    >
                        Register
                    </Button>
                </View>
            </View>
        </ImageBackground>
    );

}

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import SignUp from "./Components/SignUp"
import Login from "./Components/Login"

const Stack = createStackNavigator();

const config = {
  animation: 'timing',
  config: {
    stiffness: 1000,
    damping: 30,
    mass: 4,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const AuthRouter = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator headerMode='none'>
                <Stack.Screen name="signup" component={SignUp} />
                <Stack.Screen name="login" component={Login} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AuthRouter
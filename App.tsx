import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Button, Modal, StyleProp, Text, View, ViewStyle } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

type ReactModalProps = {
    showNavigationModal: () => void;
};

const ReactModal = ({ showNavigationModal }: ReactModalProps) => {
    const [modalVisible, setModalVisible] = React.useState(true);

    const DismissButton = () => {
        return (
            <Button
                title="Show navigation modal"
                testID="detox-show-navigation-modal-button"
                onPress={() => {
                    // Will trigger <Modal/>.onDismiss callback
                    setModalVisible(false);
                }}
            />
        );
    };

    return (
        <Modal animationType="fade" visible={modalVisible} onDismiss={showNavigationModal}>
            <DismissButton />
        </Modal>
    );
};

type MainScreenProps = {
    navigationProps: any;
};

const MainScreen = ({ navigationProps }: MainScreenProps) => {
    const viewStyle: StyleProp<ViewStyle> = {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    };

    const [reactModalVisible, setReactModalVisible] = React.useState(false);

    const RenderReactModal = () => {
        return (
            <ReactModal
                showNavigationModal={() => {
                    setReactModalVisible(false);
                    navigationProps.navigation.navigate('ModalScreen');
                }}
            />
        );
    };

    return (
        <View style={viewStyle}>
            <Button
                title="Show React Modal"
                testID="detox-show-react-modal-button"
                onPress={() => {
                    setReactModalVisible(true);
                }}
            />
            {reactModalVisible && <RenderReactModal />}
        </View>
    );
};

type ModalScreenProps = {
    navigationProps: any;
};

const ModalScreen = ({ navigationProps }: ModalScreenProps) => {
    const viewStyle: StyleProp<ViewStyle> = {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    };

    const DismissButton = () => {
        return (
            <Button
                title="Hide navigation modal screen"
                testID="detox-hide-navigation-modal-button"
                onPress={() => {
                    navigationProps.navigation.goBack();
                }}
            />
        );
    };

    return (
        <View style={viewStyle}>
            <DismissButton />
        </View>
    );
};

const RootNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initlaRouteName="MainScreen">
            <Stack.Screen name="MainScreen">
                {(navigationProps: any) => {
                    return <MainScreen navigationProps={navigationProps} />;
                }}
            </Stack.Screen>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="ModalScreen">
                    {(navigationProps: any) => {
                        return <ModalScreen navigationProps={navigationProps} />;
                    }}
                </Stack.Screen>
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default function App() {
    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    );
}

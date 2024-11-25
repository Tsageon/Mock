import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';

class UserManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoading: false,
            error: null,
            name: '',
            avatar: '',
            preferences: '',
            updateUserId: null,
            defaultAvatar: 'https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg',
            isFormVisible: false,
        };
    }

    fetchUsers = async () => {
        this.setState({ isLoading: true });
        try {
            const response = await fetch('https://674036e1d0b59228b7ef1689.mockapi.io/users');
            const users = await response.json();
            this.setState({ users, isLoading: false });
        } catch (error) {
            this.setState({ error: 'Error fetching users', isLoading: false });
        }
    };

    handleAvatarError = () => {
        this.setState({ avatar: this.state.defaultAvatar });
    };

    addUser = async () => {
        const { name, avatar, preferences } = this.state;

        if (!name || !preferences) {
            Alert.alert('Validation Error', 'Please fill out all fields.');
            return;
        }

        const newUser = {
            createdAt: new Date().toISOString(),
            name,
            avatar,
            Preferences: preferences,
        };

        try {
            const response = await fetch('https://674036e1d0b59228b7ef1689.mockapi.io/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });
            const addedUser = await response.json();
            this.setState((prevState) => ({
                users: [...prevState.users, addedUser],
                name: '',
                avatar: '',
                preferences: '',
            }));

            Alert.alert('User Added!', 'The user was successfully added.');
        } catch (error) {
            console.error('Error adding user:', error);
            Alert.alert('Error', 'There was an issue adding the user.');
        }
    };

    updateUser = async () => {
        const { updateUserId, name, avatar, preferences } = this.state;
        const updatedData = {
            name,
            avatar,
            Preferences: preferences,
        };

        try {
            const response = await fetch(`https://674036e1d0b59228b7ef1689.mockapi.io/users/${updateUserId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });
            const updatedUser = await response.json();
            this.setState((prevState) => ({
                users: prevState.users.map((user) =>
                    user.id === updateUserId ? { ...user, ...updatedUser } : user
                ),
                updateUserId: null,
                name: '',
                preferences: '',
            }));

            Alert.alert('User Updated!', 'The user information has been updated.');
        } catch (error) {
            console.error('Error updating user:', error);
            Alert.alert('Error', 'There was an issue updating the user.');
        }
    };

    deleteUser = async (id) => {
        Alert.alert(
            'Are you sure?',
            'You won’t be able to revert this!',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Yes, delete it!',
                    onPress: async () => {
                        try {
                            await fetch(`https://674036e1d0b59228b7ef1689.mockapi.io/users/${id}`, {
                                method: 'DELETE',
                            });
                            this.setState((prevState) => ({
                                users: prevState.users.filter((user) => user.id !== id),
                            }));

                            Alert.alert('Deleted!', 'The user was successfully deleted.');
                        } catch (error) {
                            Alert.alert('Error!', 'There was an issue deleting the user.');
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    toggleForm = () => {
        this.setState((prevState) => ({
            isFormVisible: !prevState.isFormVisible,
            name: '',
            avatar: '',
            preferences: '',
        }));
    };

    componentDidMount() {
        this.fetchUsers();
    }

    render() {
        const { users, isLoading, error, name, avatar, preferences, updateUserId, isFormVisible } = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.header}>Generic User Manager</Text>
                {error && <Text style={styles.error}>{error}</Text>}

                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
                ) : (
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        {isFormVisible && (
                            <View style={styles.form}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Name"
                                    value={name}
                                    onChangeText={(text) => this.setState({ name: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Avatar URL"
                                    value={avatar}
                                    onChangeText={(text) => this.setState({ avatar: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Preferences"
                                    value={preferences}
                                    onChangeText={(text) => this.setState({ preferences: text })}
                                />
                                <TouchableOpacity
                                    style={styles.submitButton}
                                    onPress={updateUserId ? this.updateUser : this.addUser}
                                >
                                    <Text style={styles.addButtonText}>
                                        {updateUserId ? 'Update User' : 'Add User'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {users.map((user) => (
                            <View key={user.id} style={styles.userCard}>
                                <Image
                                    source={{ uri: user.avatar || this.state.defaultAvatar }}
                                    onError={this.handleAvatarError}
                                    style={styles.avatar}
                                />
                                <View style={styles.userInfo}>
                                    <Text style={styles.userName}>{user.name}</Text>
                                    <Text style={styles.userPreferences}>{user.Preferences}</Text>
                                </View>
                                <View style={styles.actions}>
                                    <TouchableOpacity
                                        style={styles.actionButton}
                                        onPress={() =>
                                            this.setState({
                                                updateUserId: user.id,
                                                name: user.name,
                                                preferences: user.Preferences,
                                            })
                                        }
                                    >
                                        <Text style={styles.actionText}>Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.actionButton, styles.deleteButton]}
                                        onPress={() => this.deleteUser(user.id)}
                                    >
                                        <Text style={styles.actionText}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                )}
                <TouchableOpacity style={styles.addButton} onPress={this.toggleForm}>
                    <Text style={styles.addButtonText}>{isFormVisible ? '-' : '+'}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    error: { color: 'red', marginBottom: 10 },
    form: { marginBottom: 20 },
    input: { borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 5, width: '100%' },
    submitButton: { backgroundColor: '#4caf50', padding: 10, borderRadius: 5, alignItems: 'center' },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#3f51b5',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: { color: 'white', fontSize: 24 },
    userCard: { flexDirection: 'row', padding: 10, marginVertical: 5, borderWidth: 1, borderRadius: 5 },
    avatar: { width: 60, height: 60, borderRadius: 30 },
    userInfo: { flex: 1, paddingHorizontal: 10 },
    userName: { fontWeight: 'bold' },
    userPreferences: { color: '#555' },
    actions: { flexDirection: 'row', alignItems: 'center' },
    actionButton: { marginHorizontal: 5, padding: 10, borderRadius: 5, backgroundColor: '#2196f3' },
    deleteButton: { backgroundColor: '#f44336' },
    actionText: { color: 'white' },
    loader: { marginTop: 50 },
    scrollContainer: { flexGrow: 1 },
});

export default UserManagement;

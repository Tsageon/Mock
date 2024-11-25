# Generic User Manager

This is a React Native application that provides functionality to manage a list of users. You can add, update, delete, and view users with their details. The app integrates with a mock API for data persistence.

## Features

- **Fetch Users**: Retrieve a list of users from a remote API.
- **Add User**: Add new users with a name, avatar URL, and preferences.
- **Update User**: Edit existing user details.
- **Delete User**: Remove a user from the list.
- **Error Handling**: Display error messages when issues occur.
- **Form Toggle**: Show or hide the user form dynamically.

## Tech Stack

- **React Native**: Core framework for building the app.
- **MockAPI**: API service for managing user data.

## Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/user-management.git
    cd user-management
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the application:
    ```bash
    npm start
    ```
   Use an emulator or physical device to view the app.

## Components

### `UserManagement`
The main component that handles:
- State management for users, form inputs, and UI toggles.
- Interaction with the MockAPI for CRUD operations.

### State Variables

- `users`: List of users fetched from the API.
- `isLoading`: Loader visibility while fetching data.
- `error`: Error message, if any occurs during API requests.
- `name`, `avatar`, `preferences`: Inputs for the user form.
- `updateUserId`: ID of the user being edited.
- `isFormVisible`: Boolean to toggle the visibility of the form.

## API Endpoints

- **GET**: `https://674036e1d0b59228b7ef1689.mockapi.io/users` - Fetch all users.
- **POST**: `https://674036e1d0b59228b7ef1689.mockapi.io/users` - Add a new user.
- **PUT**: `https://674036e1d0b59228b7ef1689.mockapi.io/users/:id` - Update a user by ID.
- **DELETE**: `https://674036e1d0b59228b7ef1689.mockapi.io/users/:id` - Delete a user by ID.

## Screenshots

| Feature        | Screenshot                                                                 |
|----------------|----------------------------------------------------------------------------|
| **User List**  | ![User List](https://via.placeholder.com/300?text=User+List+Screenshot)    |
| **Add User**   | ![Add User](https://via.placeholder.com/300?text=Add+User+Screenshot)      |
| **Edit User**  | ![Edit User](https://via.placeholder.com/300?text=Edit+User+Screenshot)    |
| **Delete User**| ![Delete User](https://via.placeholder.com/300?text=Delete+User+Screenshot)|

## Customization

- **Default Avatar**: Update the `defaultAvatar` property in the `UserManagement` component to set a new fallback image for users without a valid avatar.

## Known Issues

- Limited form validation.
- Basic UI design, which can be improved for better user experience.

## Contributing

1. Fork the repository.
2. Create a feature branch:
    ```bash
    git checkout -b feature-name
    ```
3. Commit your changes:
    ```bash
    git commit -m "Add feature"
    ```
4. Push to the branch:
    ```bash
    git push origin feature-name
    ```
5. Open a pull request.

## License

This project is licensed under the MIT License.

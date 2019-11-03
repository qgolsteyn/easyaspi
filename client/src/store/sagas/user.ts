import { IClassroom, IUser, UserType } from '@shared/index';
import { Notifications } from 'expo';
import * as Google from 'expo-google-app-auth';
import { ANDROID_CLIENT_ID, ANDROID_STANDALONE_CLIENT_ID, CLIENT_ID } from 'react-native-dotenv';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { actions, selectors } from '../reducers';
import { AuthStage } from '../reducers/user';
import * as api from './api';




export default function* init() {
    yield call(silentLogin);

    yield takeLatest(actions.user.login, login);
    yield takeLatest(actions.user.register, register);
}

/**
 * Fetches the user profile using the saved access token
 * Fails if no access token is saved
 */
function* silentLogin() {
    yield put(actions.user.updateAuthStage(AuthStage.AUTH_CHECK_LOADING));

    const user = (yield call(api.auth.getUser)) as IUser | undefined;

    if (user) {
        yield call(navigateToNextScreen, user);
    } else {
        yield put(actions.user.updateAuthStage(AuthStage.AUTH_START));
    }
}

/**
 * Performs a login with the server using the Google id token
 * Retrieves an access token and the user profile
 */
function* login() {
    yield put(actions.user.updateAuthStage(AuthStage.AUTH_CHECK_LOADING));

    // Show Google sign in screen to user
    const idToken = (yield call(loginWithGoogle)) as string;

    if (idToken) {
        const user = (yield call(api.auth.auth, idToken)) as IUser | undefined;

        if (user) {
            yield call(navigateToNextScreen, user);
        } else {
            yield put(actions.user.updateAuthStage(AuthStage.AUTH_START));
        }
    } else {
        yield put(actions.user.updateAuthStage(AuthStage.AUTH_START));
    }
}

/**
 * Registers the user with server (updates user info)
 */
function* register(action: ReturnType<typeof actions.user.register>) {
    const { name, userType, classroomName, classroomPasscode } = action.payload;

    yield put(actions.user.updateAuthStage(AuthStage.AUTH_CHECK_LOADING));

    const { id, email } = (yield select(
        selectors.user.getCurrentUser
    )) as IUser;

    const user: IUser = {
        email,
        id,
        name,
        pushToken: yield call(Notifications.getExpoPushTokenAsync),
        registered: true,
        userType,
        virtualClassroomUid: classroomName,
    };

    const classroom: IClassroom = {
        name: classroomName,
        passcode: classroomPasscode,
    };

    const newUser = (yield call(api.auth.register, user, classroom)) as IUser;

    if (newUser) {
        yield call(navigateToNextScreen, newUser);
    } else {
        yield put(actions.user.updateAuthStage(AuthStage.AUTH_REGISTER));
    }
}

/**
 * Uses the user object to determine the next screen to display
 */
function* navigateToNextScreen(user: IUser) {
    yield put(actions.user.updateUserInfo(user));
    if (user.registered && user.userType === UserType.STUDENT) {
        yield put(actions.user.updateAuthStage(AuthStage.AUTH_LOGGED_IN));
        yield put(actions.nav.goToScreen('Student'));
    } else if (user.registered && user.userType === UserType.TEACHER) {
        yield put(actions.user.updateAuthStage(AuthStage.AUTH_LOGGED_IN));
        yield put(actions.nav.goToScreen('Teacher'));
    } else if (!user.registered) {
        yield put(actions.user.updateAuthStage(AuthStage.AUTH_REGISTER));
        yield put(actions.nav.goToScreen('UserSelection'));
    }else{
        alert("Error: Invalid user type")
    }
}

function* loginWithGoogle() {
    try {
        const result = yield call(Google.logInAsync, {
            androidClientId: ANDROID_CLIENT_ID,
            androidStandaloneAppClientId: ANDROID_STANDALONE_CLIENT_ID,
            clientId: CLIENT_ID,
            scopes: ['profile', 'email'],
        });

        if (result.type === 'success') {
            return result.idToken as Google.GoogleUser;
        } else {
            alert(result);
            return undefined;
        }
    } catch (e) {
        alert(e);
        return undefined;
    }
}

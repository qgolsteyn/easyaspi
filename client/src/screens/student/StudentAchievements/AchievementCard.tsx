import * as React from 'react';
import {
    Image,
    ImageSourcePropType,
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface IAchievementCardProps {
    img: ImageSourcePropType;
    heading: string;
    body: string;
}

export const AchievementCard = (props: IAchievementCardProps) => (
    <View style={styles.achievement}>
        <Image source={props.img} style={styles.image} />
        <View style={styles.text}>
            <Text style={styles.heading}>{props.heading}</Text>
            <Text style={styles.body}>{props.body}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    achievement: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 16,
        width: '100%',
    },
    body: {
        color: '#333',
        fontFamily: 'josefin-sans',
        fontSize: 14,
    },
    heading: {
        color: '#333',
        fontFamily: 'josefin-sans-bold',
        fontSize: 18,
    },
    image: {
        height: 64,
        width: 64,
    },
    text: {
        display: 'flex',
        flex: 1,
        height: 64,
        justifyContent: 'center',
        paddingLeft: 16,
    },
});

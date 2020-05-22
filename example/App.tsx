// eslint-disable-next-line import/default
import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Blurhash } from 'gl-react-blurhash';
import { Surface } from 'gl-react-expo';

const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: screenWidth * 0.8,
        height: (screenWidth * 0.8) / 1.5
    }
});

const data = {
    hash: 'LPKA$w{H_c05b{Nqwbx^grotMnNf',
    uri:
        'https://images.pexels.com/photos/1209843/pexels-photo-1209843.jpeg?crop=entropy&cs=srgb&dl=person-with-body-painting-1209843.jpg&fit=crop&fm=jpg&h=853&w=1280'
};

function ImageWithBlurhash({ blurhashVisible }: { blurhashVisible: boolean }) {
    if (blurhashVisible) {
        return (
            <Surface style={styles.image}>
                <Blurhash hash={data.hash} />
            </Surface>
        );
    }
    return <Image source={{ uri: data.uri }} style={styles.image}></Image>;
}

export default function App() {
    const [blurhashVisible, setBlurhashVisible] = useState(true);
    const onPress = () => setBlurhashVisible(!blurhashVisible);
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <ImageWithBlurhash blurhashVisible={blurhashVisible} />
            </TouchableOpacity>
        </View>
    );
}

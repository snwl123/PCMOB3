import React from 'react';
import { View } from 'react-native';

export default function BlockRGB(props)
{
    return (
        <View
            style =
                {{
                    backgroundColor:`rgb(${props.red}, ${props.green}, ${props.blue})`,
                    height: 60,
                    width: "100%"
                }}
        ></View>
    );

}
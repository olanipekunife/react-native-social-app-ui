import React from 'react';
import { Button, Text } from 'native-base';

const BrandButton = ({ action, title }) => (
    <Button
        rounded

        style={{ marginTop: 20, backgroundColor: '#992c39', alignSelf: 'center' }}
        onPress={() => { action(); }}
    >
        <Text>{title}</Text>
    </Button>

);

export default BrandButton;

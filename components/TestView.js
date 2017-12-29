import React from 'react';

import {
  Text,
} from 'react-native';

export default ({ name }) => (
  <Text>text: {name}, time is: {Date.now()}</Text>
);
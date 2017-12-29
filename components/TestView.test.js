import React from 'react';
import TestView from './TestView';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  Date.now = jest.fn(() => 1514552641273);
  const tree = renderer
    .create(<TestView name="magicly007" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
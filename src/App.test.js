import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders start screen with game title', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/DOGS OF WAR II/i);
  expect(linkElement).toBeInTheDocument();
});

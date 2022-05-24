import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Reviews from '../components/ReviewComponents/Reviews.jsx'
import { act } from "react-dom/test-utils";
//most basic
test('loads and displays greeting', () => {
  render(<Reviews />);
  screen.debug();
});

// test('test events', () => {
//   fireEvent.click(screen.getByText('Load Greeting'))

//   // wait until the `get` request promise resolves and
//   // the component calls setState and re-renders.
//   // `waitFor` waits until the callback doesn't throw an error

//   await waitFor(() =>
//   // getByRole throws an error if it cannot find an element
//   screen.getByRole('heading'),

//   // assert that the alert message is correct using
//   // toHaveTextContent, a custom matcher from jest-dom.
//   expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')

//   // assert that the button is not disabled using
//   // toBeDisabled, a custom matcher from jest-dom.
//   expect(screen.getByRole('button')).not.toBeDisabled())
// });
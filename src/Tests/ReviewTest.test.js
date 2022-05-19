import App from './components/App';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
//import component to test.
import OneReview from '../components/ReviewComponents/OneReview.jsx';
//For practice writing tests.

test('Testing correct button behavior on click', () => {
  // render(<App />);
  fireEvent.click(screen.getByText('Add Review'));

  await waitFor(()=>
    screen.getByRole('heading');
  )

  expect(screen.getByRole('alert')).toHaveTextContent('Did not fetch correct stuff');

  expect(screen.getByRole('button')).not.toBeDisabled();
});

test('testing paragraph text rendering', () => {

  render(<OneReview />);
  screen.debug();
});

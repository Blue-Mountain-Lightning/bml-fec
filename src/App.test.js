import { render, screen } from '@testing-library/react';
import App from './components/App';

test('renders Product Details link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Product Details/);
  expect(linkElement).toBeInTheDocument();
});

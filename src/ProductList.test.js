import { render, screen, waitFor, getByText } from '@testing-library/react';
import ProductList from './components/ProductList';

test('is able to render the ProductList component and display \"Product List\"', async () => {

  await render(<ProductList/>)
  expect(screen.getByText('Product List')).toBeInTheDocument()
});

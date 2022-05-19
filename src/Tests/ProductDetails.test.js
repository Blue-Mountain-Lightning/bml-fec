import { render, screen } from '@testing-library/react';
import ProductDetail from '../components/ProductDetail';

test('is able to render the ProductDetails component', () => {
  render(<ProductDetail />);
});

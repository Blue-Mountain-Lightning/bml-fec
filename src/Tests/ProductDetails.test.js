import { render, screen, waitFor, getByText } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductDetail from './components/ProductDetail';

const MockProductDetail = () => {
  return (
    <BrowserRouter>
      <ProductDetail />
    </BrowserRouter>
  )
}

// test('is able to render the ProductDetails component', async () => {
//   await render(<ProductDetail/>)
// });

describe("ProductDetail", () => {
  it('is able to render the ProductDetails component', async () => {
    await render(<MockProductDetail />)
    const productListDiv = await screen.findByTestId('product-item-test')
    expect(productListDiv).toBeInTheDocument();
  });
})
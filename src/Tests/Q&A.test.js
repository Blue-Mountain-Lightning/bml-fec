import React from 'react';
import { render, screen } from '@testing-library/react';
import AddAnswer from '../components/QAcomponents/AddAnswer.jsx';

describe('AddAnswer component', () => {
 test('render h3 element', () => {
   render(<AddAnswer />);
   expect(screen.getByText('Add Answer')).toBeInTheDocument();
 });
})

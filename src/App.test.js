import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'

test('renders Beatbay', () => {
  render(
    <Router>
      <App />
    </Router>


  );
  const linkElement = screen.getByText(/Beatbay/i);
  expect(linkElement).toBeInTheDocument();
});

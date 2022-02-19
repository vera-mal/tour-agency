import { render, screen } from '@testing-library/react';
import PageHeading from '../index'

it('Render text in heading', async () => {
  render(<PageHeading>Test</PageHeading>);
  const pageHeading = screen.getByText(/test/i);
  expect(pageHeading).toBeInTheDocument();
})

it('Render text in heading', async () => {
  render(<PageHeading>Test</PageHeading>);
  const pageHeading = screen.getByRole('heading');
  expect(pageHeading).toBeInTheDocument();
})

it('Render text in heading', async () => {
  render(<PageHeading>Test</PageHeading>);
  const pageHeading = screen.queryByText(/title/i);
  expect(pageHeading).not.toBeInTheDocument();
})

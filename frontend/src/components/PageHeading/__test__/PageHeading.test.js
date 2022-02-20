import { render, screen } from '@testing-library/react';
import PageHeading from '../index'

describe(('PageHeading'), () => {
  it('Render text in heading 1', async () => {
    render(<PageHeading>Test</PageHeading>);
    const pageHeading = screen.getByText(/test/i);
    expect(pageHeading).toBeInTheDocument();
  });

  it('Render text in heading 2', async () => {
    render(<PageHeading>Test</PageHeading>);
    const pageHeading = screen.getByRole('heading');
    expect(pageHeading).toBeInTheDocument();
  });

  it('Render text in heading 3', async () => {
    render(<PageHeading>Test</PageHeading>);
    const pageHeading = screen.queryByText(/title/i);
    expect(pageHeading).not.toBeInTheDocument();
  });
});

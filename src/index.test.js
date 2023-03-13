import React from 'react';
import {render, screen} from '@testing-library/react'
import ErrorBoundary from './ErrorBoundary';

// A child component that throws an error
function BrokenComponent() {
  throw new Error('Oops!');
  return <div />;
}

describe('ErrorBoundary', () => {
  it('should render fallback UI when child component throws an error', () => {
    // Mount the ErrorBoundary component with the BrokenComponent as its prop
    render(
      <ErrorBoundary fallback={<p>Something went wrong.</p>}>
        <BrokenComponent />
      </ErrorBoundary>
    );

    // Expect that the fallback UI is rendered instead of the BrokenComponent
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
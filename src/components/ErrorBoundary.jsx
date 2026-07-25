import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 dark:bg-gray-900 px-6 text-center">
          <p className="text-5xl mb-4">🌾</p>
          <h1 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-2">
            Something went wrong
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
            An unexpected error occurred while loading this page. Please try going back to the home page.
          </p>
          <button
            onClick={this.handleReload}
            className="bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800"
          >
            Back to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
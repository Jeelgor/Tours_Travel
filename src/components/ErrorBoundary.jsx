import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
                    <div className="text-center w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                        <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
                        <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
                            Something went wrong. We are looking into it.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-lightblue hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors w-full"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

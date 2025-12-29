import React from 'react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, info) {
        // Optionally log error to an external service
        console.error('ErrorBoundary caught:', error, info);
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="p-8 text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-2">Something went wrong.</h2>
                    <p className="text-gray-500">{this.state.error?.message || 'An unexpected error occurred.'}</p>
                    <button className="mt-4 px-4 py-2 bg-brand-orange text-white rounded" onClick={() => window.location.reload()}>
                        Reload Page
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

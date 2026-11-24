import { Component } from 'react';

// Catches render errors (including a lazy chunk that failed to download) and shows
// `fallback` instead. `fallback` may be a node or a function receiving { reset }.
export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  reset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      const { fallback } = this.props;
      return typeof fallback === 'function' ? fallback({ reset: this.reset }) : fallback;
    }
    return this.props.children;
  }
}

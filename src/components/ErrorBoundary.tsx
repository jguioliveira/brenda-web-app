import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };

type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="container-fluid boxed py-50 text-center">
          <h1>Something went wrong</h1>
          <p>Please refresh the page or try again later.</p>
        </main>
      );
    }
    return this.props.children;
  }
}

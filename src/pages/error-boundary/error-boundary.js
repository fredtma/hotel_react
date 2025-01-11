import React, { Component } from 'react';
import { Alert, Col, Container, Row } from 'react-bootstrap';

/**
 * @see - https://legacy.reactjs.org/docs/error-boundaries.html
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * @param {Error} error
   * @returns {hasError: boolean, error: Error}
   */
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  /**
   * @param {Error} error
   * @param {ErrorInfo} errorInfo
   */
  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  /**
   * @returns {JSX.Element}
   */
  render() {
    const { hasError, error } = this.state;
    if (hasError) {
      return (
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <h1>Something went wrong.</h1>
              <Alert variant="danger">
                <pre>{error && error.toString()}</pre>
              </Alert>
            </Col>
          </Row>
        </Container>
      );
    }

    return this.props.children;
  }
}
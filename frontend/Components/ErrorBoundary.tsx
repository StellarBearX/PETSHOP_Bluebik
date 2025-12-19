"use client"
import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '1rem' }}>⚠️</div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '0.5rem', color: '#333' }}>
            เกิดข้อผิดพลาด
          </h2>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>
            ขออภัย เกิดข้อผิดพลาดในการโหลดหน้าเว็บ
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null })
              window.location.reload()
            }}
            style={{
              padding: '0.75rem 2rem',
              background: '#FF4D00',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            รีเฟรชหน้า
          </button>
        </div>
      )
    }

    return this.props.children
  }
}


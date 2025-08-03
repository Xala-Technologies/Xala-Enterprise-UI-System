/**
 * @fileoverview Semantic Components Test Suite
 * @description Test semantic components functionality and accessibility
 * @version 5.0.0
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { 
  Box, 
  Text, 
  Heading, 
  Button, 
  Input, 
  List, 
  ListItem, 
  Link, 
  Image 
} from '../index';

// Mock useId for consistent testing
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useId: () => 'test-id',
}));

describe('Semantic Components', () => {
  describe('Box Component', () => {
    it('renders with correct semantic element', () => {
      render(
        <Box as="section" data-testid="semantic-box">
          Test content
        </Box>
      );
      
      const element = screen.getByTestId('semantic-box');
      expect(element.tagName).toBe('SECTION');
      expect(element).toHaveTextContent('Test content');
    });

    it('applies variant classes correctly', () => {
      render(
        <Box variant="elevated" spacing="lg" data-testid="box-variant">
          Content
        </Box>
      );
      
      const element = screen.getByTestId('box-variant');
      expect(element).toHaveClass('bg-background', 'border', 'border-border', 'shadow-md');
    });
  });

  describe('Text Component', () => {
    it('renders with correct semantic element based on intent', () => {
      render(
        <Text intent="emphasis" data-testid="text-element">
          Emphasized text
        </Text>
      );
      
      const element = screen.getByTestId('text-element');
      expect(element.tagName).toBe('EM');
      expect(element).toHaveTextContent('Emphasized text');
    });

    it('applies size and weight classes', () => {
      render(
        <Text size="lg" weight="bold" data-testid="text-styled">
          Styled text
        </Text>
      );
      
      const element = screen.getByTestId('text-styled');
      expect(element).toHaveClass('text-lg', 'font-bold');
    });
  });

  describe('Heading Component', () => {
    it('renders correct heading level', () => {
      render(
        <Heading level={3} data-testid="heading-level">
          Test Heading
        </Heading>
      );
      
      const element = screen.getByTestId('heading-level');
      expect(element.tagName).toBe('H3');
      expect(element).toHaveTextContent('Test Heading');
    });

    it('applies intent-based configuration', () => {
      render(
        <Heading intent="page-title" data-testid="page-title">
          Page Title
        </Heading>
      );
      
      const element = screen.getByTestId('page-title');
      expect(element.tagName).toBe('H1'); // Intent overrides default level
    });
  });

  describe('Button Component', () => {
    it('renders with correct intent styling', () => {
      render(
        <Button intent="primary" data-testid="primary-button">
          Primary Action
        </Button>
      );
      
      const element = screen.getByTestId('primary-button');
      expect(element).toHaveClass('bg-primary', 'text-primary-foreground');
      expect(element).toHaveTextContent('Primary Action');
    });

    it('applies correct size classes', () => {
      render(
        <Button size="lg" data-testid="large-button">
          Large Button
        </Button>
      );
      
      const element = screen.getByTestId('large-button');
      expect(element).toHaveClass('h-12', 'px-8');
    });

    it('handles loading state correctly', () => {
      render(
        <Button loadingState="loading" data-testid="loading-button">
          Loading
        </Button>
      );
      
      const element = screen.getByTestId('loading-button');
      expect(element).toHaveAttribute('aria-busy', 'true');
      expect(element).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Input Component', () => {
    it('renders with proper label association', () => {
      render(
        <Input 
          label="Email Address" 
          intent="email" 
          data-testid="email-input"
        />
      );
      
      const input = screen.getByTestId('email-input');
      const label = screen.getByText('Email Address');
      
      expect(input.getAttribute('type')).toBe('email');
      expect(label.getAttribute('for')).toBe(input.getAttribute('id'));
    });

    it('shows validation states correctly', () => {
      render(
        <Input 
          label="Required Field"
          required
          errorMessage="This field is required"
          data-testid="error-input"
        />
      );
      
      const input = screen.getByTestId('error-input');
      const errorMessage = screen.getByText('This field is required');
      
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute('aria-required', 'true');
      expect(errorMessage).toHaveAttribute('role', 'alert');
    });
  });

  describe('List Components', () => {
    it('renders navigation list with correct semantics', () => {
      render(
        <List intent="navigation" data-testid="nav-list">
          <ListItem>
            <Link href="/">Home</Link>
          </ListItem>
          <ListItem>
            <Link href="/about">About</Link>
          </ListItem>
        </List>
      );
      
      const list = screen.getByTestId('nav-list');
      expect(list).toHaveAttribute('role', 'navigation');
      expect(list).toHaveClass('list-none'); // No bullets for navigation
    });

    it('renders ordered list for steps', () => {
      render(
        <List intent="steps" data-testid="steps-list">
          <ListItem>First step</ListItem>
          <ListItem>Second step</ListItem>
        </List>
      );
      
      const list = screen.getByTestId('steps-list');
      expect(list.tagName).toBe('OL');
      expect(list).toHaveClass('list-decimal');
    });
  });

  describe('Link Component', () => {
    it('renders external links with proper attributes', () => {
      render(
        <Link 
          href="https://external.com" 
          intent="external"
          data-testid="external-link"
        >
          External Link
        </Link>
      );
      
      const link = screen.getByTestId('external-link');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('handles email links correctly', () => {
      render(
        <Link 
          href="user@example.com" 
          intent="email"
          data-testid="email-link"
        >
          Email Us
        </Link>
      );
      
      const link = screen.getByTestId('email-link');
      expect(link.getAttribute('href')).toBe('mailto:user@example.com');
    });
  });

  describe('Image Component', () => {
    it('renders avatar with correct styling', () => {
      render(
        <Image 
          intent="avatar"
          src="/user.jpg"
          alt="User Avatar"
          data-testid="avatar-image"
        />
      );
      
      const image = screen.getByTestId('avatar-image');
      expect(image).toHaveClass('rounded-full', 'aspect-square');
      expect(image).toHaveAttribute('alt', 'User Avatar');
    });

    it('handles decorative images correctly', () => {
      render(
        <Image 
          intent="decorative"
          src="/decoration.jpg"
          data-testid="decorative-image"
        />
      );
      
      const image = screen.getByTestId('decorative-image');
      expect(image).toHaveAttribute('aria-hidden', 'true');
      expect(image).toHaveAttribute('alt', '');
    });
  });

  describe('Accessibility Features', () => {
    it('applies Norwegian compliance attributes', () => {
      render(
        <Box nsmLevel="RESTRICTED" data-testid="nsm-box">
          Classified content
        </Box>
      );
      
      const element = screen.getByTestId('nsm-box');
      expect(element).toHaveAttribute('data-nsm-level', 'RESTRICTED');
    });

    it('supports internationalization attributes', () => {
      render(
        <Text lang="nb-NO" dir="ltr" data-testid="i18n-text">
          Norwegian text
        </Text>
      );
      
      const element = screen.getByTestId('i18n-text');
      expect(element).toHaveAttribute('lang', 'nb-NO');
      expect(element).toHaveAttribute('dir', 'ltr');
    });

    it('provides proper ARIA attributes for interactive elements', () => {
      render(
        <Button 
          tooltip="Save document"
          iconPosition="only"
          icon={<span>💾</span>}
          data-testid="icon-button"
        >
          Save
        </Button>
      );
      
      const button = screen.getByTestId('icon-button');
      expect(button).toHaveAttribute('aria-label', 'Save document');
      expect(button).toHaveAttribute('title', 'Save document');
    });
  });

  describe('Component Integration', () => {
    it('works together in complex layouts', () => {
      render(
        <Box as="main" variant="card" spacing="lg" data-testid="layout">
          <Heading intent="page-title">Welcome</Heading>
          <Text intent="body">
            This is a test of semantic components working together.
          </Text>
          <List intent="features">
            <ListItem>Feature one</ListItem>
            <ListItem>Feature two</ListItem>
          </List>
          <Button intent="primary">Get Started</Button>
        </Box>
      );
      
      const layout = screen.getByTestId('layout');
      const title = screen.getByText('Welcome');
      const button = screen.getByText('Get Started');
      
      expect(layout.tagName).toBe('MAIN');
      expect(title.tagName).toBe('H1');
      expect(layout).toContainElement(title);
      expect(layout).toContainElement(button);
    });
  });
});
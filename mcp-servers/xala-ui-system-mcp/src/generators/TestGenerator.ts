/**
 * Test Generator for Xala UI System
 */

import type { ComponentConfig } from '../types/index.js';

export class TestGenerator {
  public generateTest(config: ComponentConfig): string {
    const { name, category } = config;
    
    return `
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ${name} } from './${name}';

describe('${name}', () => {
  it('renders without crashing', () => {
    render(<${name} />);
    expect(screen.getByRole('${this.getRoleByCategory(category)}')).toBeInTheDocument();
  });

  it('handles user interactions', () => {
    const handleClick = jest.fn();
    render(<${name} onClick={handleClick} />);
    
    const element = screen.getByRole('${this.getRoleByCategory(category)}');
    fireEvent.click(element);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct accessibility attributes', () => {
    render(<${name} />);
    const element = screen.getByRole('${this.getRoleByCategory(category)}');
    
    expect(element).toHaveAttribute('aria-label');
    expect(element).toBeVisible();
  });

  it('supports keyboard navigation', () => {
    render(<${name} />);
    const element = screen.getByRole('${this.getRoleByCategory(category)}');
    
    fireEvent.keyDown(element, { key: 'Enter' });
    fireEvent.keyDown(element, { key: ' ' });
    
    expect(element).toHaveFocus();
  });
});`;
  }

  private getRoleByCategory(category: string): string {
    switch (category) {
      case 'form':
        return 'form';
      case 'navigation':
        return 'navigation';
      case 'data-display':
        return 'table';
      case 'interactive':
        return 'button';
      default:
        return 'generic';
    }
  }
}

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SuccessNotification from '../SuccessNotification';

describe('SuccessNotification', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('debería renderizar el mensaje correctamente', () => {
    const mockOnClose = vi.fn();
    render(<SuccessNotification message="Operación exitosa" onClose={mockOnClose} />);

    expect(screen.getByText('Operación exitosa')).toBeInTheDocument();
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('debería cerrar automáticamente después de la duración especificada', () => {
    const mockOnClose = vi.fn();
    render(
      <SuccessNotification 
        message="Test" 
        onClose={mockOnClose} 
        duration={2000} 
      />
    );

    expect(mockOnClose).not.toHaveBeenCalled();
    vi.advanceTimersByTime(2000);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('debería cerrar al hacer click en el botón X', async () => {
    vi.useRealTimers(); // Deshabilita fake timers para este test
    
    const mockOnClose = vi.fn();
    const user = userEvent.setup();
    
    render(<SuccessNotification message="Test" onClose={mockOnClose} />);

    const closeButton = screen.getByText('×');
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    
    vi.useFakeTimers(); // Reactiva fake timers
  });
});
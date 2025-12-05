import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskItem from '../TaskItem';
import type { Task } from '../../interfaces/Task';

const mockTask: Task = {
  _id: '1',
  title: 'Tarea de prueba',
  description: 'Descripción de prueba',
  completed: false,
  createdAt: '2024-01-01T00:00:00.000Z',
};

describe('TaskItem', () => {
  it('debería renderizar la tarea correctamente', () => {
    const mockOnClick = vi.fn();
    render(<TaskItem task={mockTask} onClick={mockOnClick} />);

    expect(screen.getByText('Tarea de prueba')).toBeInTheDocument();
    expect(screen.getByText('Descripción de prueba')).toBeInTheDocument();
  });

  it('debería llamar onClick cuando se hace click', async () => {
    const mockOnClick = vi.fn();
    const user = userEvent.setup();
    
    render(<TaskItem task={mockTask} onClick={mockOnClick} />);

    const taskElement = screen.getByText('Tarea de prueba').closest('div');
    if (taskElement) {
      await user.click(taskElement);
    }

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('debería mostrar el checkbox marcado para tareas completadas', () => {
    const completedTask = { ...mockTask, completed: true };
    const mockOnClick = vi.fn();
    
    render(<TaskItem task={completedTask} onClick={mockOnClick} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('debería aplicar estilos de tarea completada', () => {
    const completedTask = { ...mockTask, completed: true };
    const mockOnClick = vi.fn();
    
    render(<TaskItem task={completedTask} onClick={mockOnClick} />);

    const title = screen.getByText('Tarea de prueba');
    expect(title).toHaveStyle({ textDecoration: 'line-through' });
  });
});
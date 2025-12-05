import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskList from '../TaskList';
import type { Task } from '../../interfaces/Task';

const mockTasks: Task[] = [
  {
    _id: '1',
    title: 'Tarea 1',
    description: 'Descripción 1',
    completed: false,
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    _id: '2',
    title: 'Tarea 2',
    description: 'Descripción 2',
    completed: true,
    createdAt: '2024-01-02T00:00:00.000Z',
  },
];

describe('TaskList', () => {
  it('debería mostrar mensaje cuando no hay tareas', () => {
    const mockOnClick = vi.fn();
    render(<TaskList tasks={[]} onTaskClick={mockOnClick} />);

    expect(screen.getByText('No hay tareas. ¡Crea una!')).toBeInTheDocument();
  });

  it('debería renderizar todas las tareas', () => {
    const mockOnClick = vi.fn();
    render(<TaskList tasks={mockTasks} onTaskClick={mockOnClick} />);

    expect(screen.getByText('Tarea 1')).toBeInTheDocument();
    expect(screen.getByText('Tarea 2')).toBeInTheDocument();
    expect(screen.getByText('Descripción 1')).toBeInTheDocument();
    expect(screen.getByText('Descripción 2')).toBeInTheDocument();
  });

  it('debería llamar onTaskClick cuando se hace click en una tarea', async () => {
    const mockOnClick = vi.fn();
    const user = userEvent.setup();
    
    render(<TaskList tasks={mockTasks} onTaskClick={mockOnClick} />);

    const firstTask = screen.getByText('Tarea 1').closest('div');
    if (firstTask) {
      await user.click(firstTask);
    }

    expect(mockOnClick).toHaveBeenCalledWith(mockTasks[0]);
  });

  it('debería manejar correctamente cuando tasks no es un array', () => {
    const mockOnClick = vi.fn();
    // @ts-expect-error - probando caso edge
    render(<TaskList tasks={null} onTaskClick={mockOnClick} />);

    expect(screen.getByText('Cargando tareas...')).toBeInTheDocument();
  });
});
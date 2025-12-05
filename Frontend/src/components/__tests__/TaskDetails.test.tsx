import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskDetails from '../TaskDetails';
import type { Task } from '../../interfaces/Task';

const mockTask: Task = {
  _id: '1',
  title: 'Tarea de prueba',
  description: 'Descripción de prueba',
  completed: false,
  createdAt: '2024-01-01T00:00:00.000Z',
};

describe('TaskDetails', () => {
  const mockOnClose = vi.fn();
  const mockOnUpdate = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('no debería renderizar si no hay tarea', () => {
    const { container } = render(
      <TaskDetails
        task={null}
        onClose={mockOnClose}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('debería renderizar los detalles de la tarea', () => {
    render(
      <TaskDetails
        task={mockTask}
        onClose={mockOnClose}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText('Detalles de la Tarea')).toBeInTheDocument();
    expect(screen.getByText('Tarea de prueba')).toBeInTheDocument();
    expect(screen.getByText('Descripción de prueba')).toBeInTheDocument();
  });

  it('debería cerrar el modal al hacer click en X', async () => {
    const user = userEvent.setup();
    
    render(
      <TaskDetails
        task={mockTask}
        onClose={mockOnClose}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    const closeButton = screen.getByText('×');
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('debería mostrar el formulario de edición al hacer click en Editar', async () => {
    const user = userEvent.setup();
    
    render(
      <TaskDetails
        task={mockTask}
        onClose={mockOnClose}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    const editButton = screen.getByText('Editar');
    await user.click(editButton);

    expect(screen.getByTitle('title')).toBeInTheDocument();
    expect(screen.getByTitle('description')).toBeInTheDocument();
    expect(screen.getByText('Guardar')).toBeInTheDocument();
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
  });

  it('debería actualizar la tarea al guardar cambios', async () => {
    const user = userEvent.setup();
    
    render(
      <TaskDetails
        task={mockTask}
        onClose={mockOnClose}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    // Entrar en modo edición
    await user.click(screen.getByText('Editar'));

    // Cambiar el título
    const titleInput = screen.getByTitle('title') as HTMLInputElement;
    await user.clear(titleInput);
    await user.type(titleInput, 'Título actualizado');

    // Guardar
    await user.click(screen.getByText('Guardar'));

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith('1', {
        title: 'Título actualizado',
        description: 'Descripción de prueba',
      });
    });
  });

  it('debería cancelar la edición sin guardar', async () => {
    const user = userEvent.setup();
    
    render(
      <TaskDetails
        task={mockTask}
        onClose={mockOnClose}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    await user.click(screen.getByText('Editar'));
    await user.click(screen.getByText('Cancelar'));

    expect(mockOnUpdate).not.toHaveBeenCalled();
    expect(screen.queryByTitle('title')).not.toBeInTheDocument();
  });

  it('debería cambiar el estado de completada', async () => {
    const user = userEvent.setup();
    
    render(
      <TaskDetails
        task={mockTask}
        onClose={mockOnClose}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(mockOnUpdate).toHaveBeenCalledWith('1', { completed: true });
  });

  it('debería eliminar la tarea después de confirmar', async () => {
    const user = userEvent.setup();
    
    // Mock window.confirm
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    
    render(
      <TaskDetails
        task={mockTask}
        onClose={mockOnClose}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    await user.click(screen.getByText('Eliminar'));

    expect(mockOnDelete).toHaveBeenCalledWith('1');
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('no debería eliminar la tarea si se cancela la confirmación', async () => {
    const user = userEvent.setup();
    
    // Mock window.confirm
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    
    render(
      <TaskDetails
        task={mockTask}
        onClose={mockOnClose}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    await user.click(screen.getByText('Eliminar'));

    expect(mockOnDelete).not.toHaveBeenCalled();
  });
});
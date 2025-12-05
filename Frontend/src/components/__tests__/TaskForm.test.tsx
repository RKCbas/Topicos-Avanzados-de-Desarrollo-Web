import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskForm from '../TaskForm';

describe('TaskForm', () => {
  it('debería renderizar el formulario correctamente', () => {
    const mockSubmit = vi.fn();
    render(<TaskForm onSubmit={mockSubmit} />);

    expect(screen.getByPlaceholderText('Título de la tarea')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Descripción (opcional)')).toBeInTheDocument();
    expect(screen.getByText('Crear Tarea')).toBeInTheDocument();
  });

  it('debería llamar onSubmit con los datos correctos', async () => {
    const mockSubmit = vi.fn();
    const user = userEvent.setup();
    
    render(<TaskForm onSubmit={mockSubmit} />);

    const titleInput = screen.getByPlaceholderText('Título de la tarea');
    const descInput = screen.getByPlaceholderText('Descripción (opcional)');
    const submitButton = screen.getByText('Crear Tarea');

    await user.type(titleInput, 'Nueva tarea');
    await user.type(descInput, 'Descripción de prueba');
    await user.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'Nueva tarea',
      description: 'Descripción de prueba',
    });
  });

  it('no debería enviar el formulario si el título está vacío', async () => {
    const mockSubmit = vi.fn();
    const user = userEvent.setup();
    
    render(<TaskForm onSubmit={mockSubmit} />);

    const submitButton = screen.getByText('Crear Tarea');
    await user.click(submitButton);

    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('debería limpiar los campos después de enviar', async () => {
    const mockSubmit = vi.fn();
    const user = userEvent.setup();
    
    render(<TaskForm onSubmit={mockSubmit} />);

    const titleInput = screen.getByPlaceholderText('Título de la tarea') as HTMLInputElement;
    const descInput = screen.getByPlaceholderText('Descripción (opcional)') as HTMLTextAreaElement;
    const submitButton = screen.getByText('Crear Tarea');

    await user.type(titleInput, 'Tarea');
    await user.type(descInput, 'Descripción');
    await user.click(submitButton);

    expect(titleInput.value).toBe('');
    expect(descInput.value).toBe('');
  });
});
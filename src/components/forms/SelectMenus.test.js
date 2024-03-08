import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectMenus from './SelectMenus';

// Mock the dependencies
jest.mock('@headlessui/react', () => ({
  ...jest.requireActual('@headlessui/react'),
  Transition: ({ children, show }) => (show ? children : null),
}));

describe('SelectMenus', () => {
  const dataSelect = [
    { id: 1, name: 'Option 1', avatar: 'avatar1.png' },
    { id: 2, name: 'Option 2', avatar: 'avatar2.png' },
  ];

  it('renders the component with default values', () => {
    render(<SelectMenus label="Test Label" dataSelect={dataSelect} setSelected={() => {}} />);

    // Add assertions based on your component structure and default values
    expect(screen.getByText('Option 1')).toBeInTheDocument();

  });

  it('handles selection change', () => {
    const setSelectedMock = jest.fn();

    render(<SelectMenus label="Test Label" dataSelect={dataSelect} setSelected={setSelectedMock} />);

    // Open the dropdown
    act(() => {
      fireEvent.click(screen.getByText('Option 1'));
    });

    // Select an option
    act(() => {
      userEvent.click(screen.getByText('Option 2'));
    });

    // Add assertions based on the expected behavior
    expect(setSelectedMock).toHaveBeenCalledWith(dataSelect[1]);

  });

});

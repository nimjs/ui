import { fireEvent, render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from './dialog';

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
  HTMLDialogElement.prototype.close = function () {
    this.open = false;
  };
});

describe('Dialog', () => {
  it('opens from its trigger, names content, and restores focus after closing', () => {
    const onOpenChange = vi.fn();
    render(
      <Dialog onOpenChange={onOpenChange}>
        <DialogTrigger>Settings</DialogTrigger>
        <DialogContent>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Change preferences.</DialogDescription>
          <DialogClose>Done</DialogClose>
        </DialogContent>
      </Dialog>,
    );
    const trigger = screen.getByRole('button', { name: 'Settings' });
    trigger.focus();
    fireEvent.click(trigger);
    const content = screen.getByRole('dialog', { name: 'Settings' });
    expect(content).toHaveAttribute('aria-describedby');
    expect(content).toHaveTextContent('Change preferences.');
    expect(document.body.style.overflow).toBe('hidden');
    fireEvent.click(screen.getByRole('button', { name: 'Done' }));
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(trigger).toHaveFocus();
    expect(document.body.style.overflow).toBe('');
  });

  it('requests closing on Escape and respects consumer cancellation', () => {
    const onOpenChange = vi.fn();
    render(
      <Dialog defaultOpen onOpenChange={onOpenChange}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent onCancel={(event) => event.preventDefault()}>
          <DialogTitle>Notice</DialogTitle>
          <DialogDescription>Details</DialogDescription>
        </DialogContent>
      </Dialog>,
    );
    const content = screen.getByRole('dialog', { name: 'Notice' });
    fireEvent(content, new Event('cancel', { cancelable: true }));
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('closes when the browser dispatches Escape cancellation', () => {
    const onOpenChange = vi.fn();
    render(
      <Dialog defaultOpen onOpenChange={onOpenChange}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Notice</DialogTitle>
          <DialogDescription>Details</DialogDescription>
        </DialogContent>
      </Dialog>,
    );
    const content = screen.getByRole('dialog', { name: 'Notice' });
    fireEvent(content, new Event('cancel', { cancelable: true }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(content).not.toHaveAttribute('open');
  });

  it('dismisses backdrop interaction without closing clicks inside content', () => {
    const onOpenChange = vi.fn();
    render(
      <Dialog defaultOpen onOpenChange={onOpenChange}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Notice</DialogTitle>
          <DialogDescription>Details</DialogDescription>
        </DialogContent>
      </Dialog>,
    );
    const content = screen.getByRole('dialog', { name: 'Notice' });
    content.getBoundingClientRect = () => ({
      left: 100,
      top: 100,
      right: 200,
      bottom: 200,
      width: 100,
      height: 100,
      x: 100,
      y: 100,
      toJSON: () => ({}),
    });
    fireEvent(
      content,
      new MouseEvent('pointerdown', {
        bubbles: true,
        clientX: 150,
        clientY: 150,
      }),
    );
    expect(onOpenChange).not.toHaveBeenCalled();
    fireEvent(
      content,
      new MouseEvent('pointerdown', {
        bubbles: true,
        clientX: 50,
        clientY: 50,
      }),
    );
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});

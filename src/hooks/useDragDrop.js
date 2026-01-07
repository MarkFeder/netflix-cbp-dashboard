import { useState, useCallback } from 'react';

/**
 * Custom hook for managing drag and drop operations
 * @returns {Object} Drag and drop handlers and state
 */
export const useDragDrop = () => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverTarget, setDragOverTarget] = useState(null);

  const handleDragStart = useCallback(item => {
    setDraggedItem(item);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
    setDragOverTarget(null);
  }, []);

  const handleDragOver = useCallback((event, target) => {
    event.preventDefault();
    setDragOverTarget(target);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverTarget(null);
  }, []);

  const handleDrop = useCallback(
    (event, target, onDropCallback) => {
      event.preventDefault();

      if (draggedItem && onDropCallback) {
        onDropCallback(draggedItem, target);
      }

      setDraggedItem(null);
      setDragOverTarget(null);
    },
    [draggedItem]
  );

  const isDragging = item => {
    return draggedItem?.id === item?.id;
  };

  const isDropTarget = target => {
    return dragOverTarget === target;
  };

  return {
    draggedItem,
    dragOverTarget,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    isDragging,
    isDropTarget,
  };
};

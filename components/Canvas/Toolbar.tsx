// Toolbar.tsx
import React from 'react';
import { CanvasElement, ShapeCounter, FrameElement, TextElement, EllipseElement } from '@/types/canvastypes';

interface ToolbarProps {
  shapeCounter: React.MutableRefObject<ShapeCounter>;
  elements: CanvasElement[];
  onAddElement: (element: CanvasElement) => void;
  onExport: () => void;
  onImport: (json: string) => void;
  onLoadExample: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  shapeCounter,
  elements,
  onAddElement,
  onExport,
  onImport,
  onLoadExample,
}) => {
  const addRectangle = () => {
    const id = `rect_${shapeCounter.current.rect++}`;
    const newRect: FrameElement = {
      id,
      type: 'frame',
      name: 'Rectangle Frame',
      x: 100 + elements.length * 5,
      y: 100 + elements.length * 5,
      width: 200,
      height: 50,
      fill: '#ffffff',
      stroke: '#e0e0e0',
      strokeWidth: 1,
      cornerRadius: 8,
      opacity: 1,
    };
    onAddElement(newRect);
  };

  const addText = () => {
    const id = `text_${shapeCounter.current.text++}`;
    const newText: TextElement = {
      id,
      type: 'text',
      name: 'Text',
      x: 120 + elements.length * 5,
      y: 120 + elements.length * 5,
      width: 150,
      height: 24,
      text: 'Click to edit text',
      fontSize: 16,
      fontFamily: 'Inter',
      fontWeight: 'Medium',
      textColor: '#111111',
      textAlign: 'center',
      lineHeight: 1,
      verticalAlign: 'top',
      wrap: 'word',
      opacity: 1,
    };
    onAddElement(newText);
  };

  const addEllipse = () => {
    const id = `ellipse_${shapeCounter.current.ellipse++}`;
    const newEl: EllipseElement = {
      id,
      type: 'ellipse',
      name: 'Ellipse',
      x: 160 + elements.length * 5,
      y: 140 + elements.length * 5,
      width: 100,
      height: 60,
      fill: '#dbeafe',
      stroke: '#3b82f6',
      strokeWidth: 2,
      opacity: 1,
    };
    onAddElement(newEl);
  };

  return (
    <div className="flex-shrink-0 w-64 bg-white border rounded p-3 shadow-sm">
      <h3 className="font-semibold mb-2">Toolbar</h3>
      <div className="flex flex-col gap-2">
        <button className="p-2 border rounded hover:bg-gray-50" onClick={addRectangle}>
          + Add Frame
        </button>
        <button className="p-2 border rounded hover:bg-gray-50" onClick={addText}>
          + Add Text
        </button>
        <button className="p-2 border rounded hover:bg-gray-50" onClick={addEllipse}>
          + Add Ellipse
        </button>
        
        <div className="border-t my-2"></div>
        
        <button className="p-2 border rounded bg-blue-50 text-blue-600" onClick={onExport}>
          Export JSON
        </button>
        
        <label className="mt-2 text-sm font-medium">Import JSON</label>
        <input
          className="border rounded p-2 text-sm"
          placeholder='Paste JSON and press Enter'
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.currentTarget.value.trim()) {
              onImport(e.currentTarget.value.trim());
              e.currentTarget.value = '';
            }
          }}
        />
        
        <button
          className="mt-3 p-2 border rounded bg-gray-50 hover:bg-gray-100"
          onClick={onLoadExample}
        >
          Quick Header Example
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
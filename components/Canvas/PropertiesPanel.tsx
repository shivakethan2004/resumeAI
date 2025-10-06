// PropertiesPanel.tsx
import React from 'react';
import { CanvasElement, FrameElement, TextElement, EllipseElement } from '@/types/canvastypes';

interface PropertiesPanelProps {
  selected: CanvasElement | null;
  onUpdate: (updates: Partial<CanvasElement>) => void;
  onDelete: () => void;
}

const FONT_FAMILIES = ['Inter', 'Arial', 'Helvetica', 'Georgia', 'Times New Roman', 'Courier New'];
const FONT_WEIGHTS = ['Normal', 'Bold', '300', '400', '500', '600', '700'];

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ selected, onUpdate, onDelete }) => {
  if (!selected) {
    return <div className="mt-3 text-sm text-gray-500">Select an item to edit its properties.</div>;
  }

  const handleChange = (property: string, value: any) => {
  onUpdate({ [property]: value } as Partial<CanvasElement>);
};


  // Type guards for better TypeScript support
  const isFrameElement = (element: CanvasElement): element is FrameElement => {
    return element.type === 'frame';
  };

  const isTextElement = (element: CanvasElement): element is TextElement => {
    return element.type === 'text';
  };

  const isEllipseElement = (element: CanvasElement): element is EllipseElement => {
    return element.type === 'ellipse';
  };

  return (
    <div className="mt-3 flex flex-col gap-2">
      <label className="text-xs text-gray-500">Name</label>
      <input
        className="border rounded p-1 text-sm"
        value={selected.name}
        onChange={(e) => handleChange('name', e.target.value)}
      />

      <div className="flex gap-2">
        <div>
          <label className="text-xs">X</label>
          <input
            className="border rounded p-1 w-20 text-sm"
            type="number"
            value={Math.round(selected.x)}
            onChange={(e) => handleChange('x', Number(e.target.value))}
          />
        </div>
        <div>
          <label className="text-xs">Y</label>
          <input
            className="border rounded p-1 w-20 text-sm"
            type="number"
            value={Math.round(selected.y)}
            onChange={(e) => handleChange('y', Number(e.target.value))}
          />
        </div>
      </div>

      {/* Common properties for all shapes that have width/height */}
      {('width' in selected) && (
        <>
          <label className="text-xs">Width</label>
          <input
            className="border rounded p-1 text-sm"
            type="number"
            value={Math.round(selected.width || 0)}
            onChange={(e) => handleChange('width', Number(e.target.value))}
          />
          <label className="text-xs">Height</label>
          <input
            className="border rounded p-1 text-sm"
            type="number"
            value={Math.round(selected.height || 0)}
            onChange={(e) => handleChange('height', Number(e.target.value))}
          />
        </>
      )}

      {/* Text-specific properties */}
      {isTextElement(selected) && (
        <>
          <label className="text-xs">Text Content</label>
          <textarea
            className="border rounded p-1 text-sm"
            value={selected.text}
            onChange={(e) => handleChange('text', e.target.value)}
            rows={3}
          />

          <label className="text-xs">Font Family</label>
          <select
            className="border rounded p-1 text-sm"
            value={selected.fontFamily}
            onChange={(e) => handleChange('fontFamily', e.target.value)}
          >
            {FONT_FAMILIES.map(font => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>

          <label className="text-xs">Font Size</label>
          <input
            className="border rounded p-1 text-sm"
            type="number"
            value={selected.fontSize}
            onChange={(e) => handleChange('fontSize', Number(e.target.value))}
          />

          <label className="text-xs">Font Weight</label>
          <select
            className="border rounded p-1 text-sm"
            value={selected.fontWeight}
            onChange={(e) => handleChange('fontWeight', e.target.value)}
          >
            {FONT_WEIGHTS.map(weight => (
              <option key={weight} value={weight}>{weight}</option>
            ))}
          </select>

          <label className="text-xs">Text Align</label>
          <select
            className="border rounded p-1 text-sm"
            value={selected.textAlign}
            onChange={(e) => handleChange('textAlign', e.target.value)}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
            <option value="justify">Justify</option>
          </select>

          <label className="text-xs">Text Color</label>
          <input
            className="border rounded p-1 text-sm w-full"
            type="color"
            value={selected.textColor}
            onChange={(e) => handleChange('textColor', e.target.value)}
          />

          <label className="text-xs">Line Height</label>
          <input
            className="border rounded p-1 text-sm"
            type="number"
            step="0.1"
            min="0.5"
            max="3"
            value={selected.lineHeight || 1}
            onChange={(e) => handleChange('lineHeight', Number(e.target.value))}
          />

          {selected.verticalAlign && (
            <>
              <label className="text-xs">Vertical Align</label>
              <select
                className="border rounded p-1 text-sm"
                value={selected.verticalAlign}
                onChange={(e) => handleChange('verticalAlign', e.target.value)}
              >
                <option value="top">Top</option>
                <option value="middle">Middle</option>
                <option value="bottom">Bottom</option>
              </select>
            </>
          )}
        </>
      )}

      {/* Frame and Ellipse common properties */}
      {(isFrameElement(selected) || isEllipseElement(selected)) && (
        <>
          <label className="text-xs">Fill Color</label>
          <input
            className="border rounded p-1 text-sm w-full"
            type="color"
            value={selected.fill}
            onChange={(e) => handleChange('fill', e.target.value)}
          />

          <label className="text-xs">Stroke Color</label>
          <input
            className="border rounded p-1 text-sm w-full"
            type="color"
            value={selected.stroke}
            onChange={(e) => handleChange('stroke', e.target.value)}
          />

          <label className="text-xs">Stroke Width</label>
          <input
            className="border rounded p-1 text-sm"
            type="number"
            value={selected.strokeWidth}
            onChange={(e) => handleChange('strokeWidth', Number(e.target.value))}
          />
        </>
      )}

      {/* Frame-specific properties */}
      {isFrameElement(selected) && (
        <>
          <label className="text-xs">Corner Radius</label>
          <input
            className="border rounded p-1 text-sm"
            type="number"
            value={selected.cornerRadius}
            onChange={(e) => handleChange('cornerRadius', Number(e.target.value))}
          />
        </>
      )}

      {/* Common opacity for all elements */}
      <label className="text-xs">Opacity</label>
      <input
        className="border rounded p-1 text-sm"
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={selected.opacity}
        onChange={(e) => handleChange('opacity', Number(e.target.value))}
      />
      <span className="text-xs text-center">{selected.opacity}</span>

      <button
        className="mt-2 p-2 border rounded bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
        onClick={onDelete}
      >
        Delete Selected
      </button>
    </div>
  );
};

export default PropertiesPanel;
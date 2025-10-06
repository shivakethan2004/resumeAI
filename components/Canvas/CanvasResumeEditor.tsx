// CanvasResumeEditor.tsx
import React, { useRef, useState } from 'react';
import Toolbar from './Toolbar';
import CanvasStage from './CanvasStage';
import PropertiesPanel from './PropertiesPanel';
import { CanvasElement, ShapeCounter, FrameElement, TextElement, EllipseElement } from '@/types/canvastypes';

const SHAPE_COUNTER: ShapeCounter = { rect: 1, text: 1, ellipse: 1 };

const CanvasResumeEditor: React.FC = () => {
  const stageRef = useRef<any>(null);
  const layerRef = useRef<any>(null);
  const trRef = useRef<any>(null);
  const shapeCounter = useRef<ShapeCounter>({ ...SHAPE_COUNTER });

  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [propsPanelOpen, setPropsPanelOpen] = useState(true);

  const handleAddElement = (element: CanvasElement) => {
    setElements(prev => [...prev, element]);
    setSelectedId(element.id);
  };

  const handleDragEnd = (e: any, id: string) => {
    const { x, y } = e.target.position();
    setElements(prev => prev.map(el => el.id === id ? { ...el, x, y } : el));
  };

  const handleTransformEnd = (node: any, id: string) => {
    const scaleX = node.scaleX() || 1;
    const scaleY = node.scaleY() || 1;
    const attrs = node.getAttrs();
    
    const updated = {
      width: Math.max(10, Math.round(attrs.width * scaleX)),
      height: Math.max(10, Math.round(attrs.height * scaleY)),
      x: attrs.x,
      y: attrs.y,
    };
    
    node.scaleX(1);
    node.scaleY(1);
    
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, ...updated } : el
    ));
  };

  const handleUpdateSelected = (updates: Partial<CanvasElement>) => {
    if (!selectedId) return;
    setElements(prev => prev.map(el => {
      if (el.id === selectedId) {
        // Type-safe update - only allow properties that belong to the specific type
        return { ...el, ...updates } as CanvasElement;
      }
      return el;
    }));
  };

  const handleDeleteSelected = () => {
    if (!selectedId) return;
    setElements(prev => prev.filter(el => el.id !== selectedId));
    setSelectedId(null);
  };

  const handleStageMouseDown = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
      return;
    }
    const clickedId = e.target.name();
    if (clickedId) setSelectedId(clickedId);
  };

  const exportToJson = () => {
    const jsonString = JSON.stringify(elements, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'canvas-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importFromJson = (json: string) => {
    try {
      const parsed = JSON.parse(json);
      const normalized = parsed.map((p: any, i: number) => ({ 
        ...p, 
        id: p.id || `imp_${i}_${Date.now()}` 
      }));
      setElements(normalized);
      setSelectedId(null);
    } catch (err) {
      alert('Invalid JSON format');
    }
  };

  const loadExample = () => {
    const header: FrameElement = {
      id: `rect_header_${Date.now()}`,
      type: 'frame',
      name: 'Header Background',
      x: 80,
      y: 40,
      width: 640,
      height: 100,
      fill: '#ffffff',
      stroke: '#e0e0e0',
      strokeWidth: 1,
      cornerRadius: 6,
      opacity: 1,
    };

    const nameText: TextElement = {
      id: `text_name_${Date.now()}`,
      type: 'text',
      name: 'Name Text',
      x: 100,
      y: 60,
      width: 600,
      height: 34,
      text: 'John Doe',
      fontSize: 28,
      fontFamily: 'Inter',
      fontWeight: 'Bold',
      textColor: '#111111',
      textAlign: 'center',
      lineHeight: 1,
      verticalAlign: 'top',
      wrap: 'none',
      opacity: 1,
    };

    setElements(prev => [...prev, header, nameText]);
  };

  const selectedElement = elements.find(el => el.id === selectedId) || null;

  return (
    <div className="w-full flex gap-4 p-4 bg-gray-100 min-h-screen">
      <Toolbar
        shapeCounter={shapeCounter}
        elements={elements}
        onAddElement={handleAddElement}
        onExport={exportToJson}
        onImport={importFromJson}
        onLoadExample={loadExample}
      />

      <CanvasStage
        elements={elements}
        selectedId={selectedId}
        stageRef={stageRef}
        layerRef={layerRef}
        trRef={trRef}
        onStageMouseDown={handleStageMouseDown}
        onSelect={setSelectedId}
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
      />

      <div className="w-80 bg-white border rounded p-3 shadow-sm">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Properties Panel</h3>
          <button
            className="text-sm text-blue-600 hover:text-blue-800"
            onClick={() => setPropsPanelOpen(v => !v)}
          >
            {propsPanelOpen ? 'Hide' : 'Show'}
          </button>
        </div>

        {propsPanelOpen && selectedElement && (
          <PropertiesPanel
            selected={selectedElement}
            onUpdate={handleUpdateSelected}
            onDelete={handleDeleteSelected}
          />
        )}
      </div>
    </div>
  );
};

export default CanvasResumeEditor;
// CanvasStage.tsx
import { CanvasElement } from '@/types/canvastypes';
import React, { useRef, useEffect } from 'react';
import { Stage, Layer, Transformer } from 'react-konva';
import RenderShape from './RenderShape';


interface CanvasStageProps {
  elements: CanvasElement[];
  selectedId: string | null;
  stageRef: React.RefObject<any>;
  layerRef: React.RefObject<any>;
  trRef: React.RefObject<any>;
  onStageMouseDown: (e: any) => void;
  onSelect: (id: string | null) => void;
  onDragEnd: (e: any, id: string) => void;
  onTransformEnd: (node: any, id: string) => void;
}

const CanvasStage: React.FC<CanvasStageProps> = ({
  elements,
  selectedId,
  stageRef,
  layerRef,
  trRef,
  onStageMouseDown,
  onSelect,
  onDragEnd,
  onTransformEnd,
}) => {
  useEffect(() => {
    const tr = trRef.current;
    const layer = layerRef.current;
    if (!tr || !layer) return;

    if (selectedId) {
      const selectedNode = layer.findOne(`#${selectedId}`);
      if (selectedNode) {
        tr.nodes([selectedNode]);
        tr.getLayer().batchDraw();
      }
    } else {
      tr.nodes([]);
      tr.getLayer().batchDraw();
    }
  }, [selectedId, elements, trRef, layerRef]);

  return (
    <div className="flex-1 bg-gray-50 p-4 rounded">
      <div className="border bg-white inline-block">
        <Stage
          width={820}
          height={1100}
          onMouseDown={onStageMouseDown}
          ref={stageRef}
        >
          <Layer ref={layerRef}>
            {elements.map((el) => (
              <RenderShape
                key={el.id}
                element={el}
                isSelected={selectedId === el.id}
                onSelect={onSelect}
                onDragEnd={onDragEnd}
                onTransformEnd={onTransformEnd}
              />
            ))}
            <Transformer
              ref={trRef}
              anchorSize={8}
              borderEnabled={true}
              rotationSnaps={[0, 90, 180]}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default CanvasStage;
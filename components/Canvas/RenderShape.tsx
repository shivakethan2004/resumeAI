// RenderShape.tsx
import { CanvasElement } from '@/types/canvastypes';
import React from 'react';
import { Group, Rect, Text, Ellipse } from 'react-konva';

interface RenderShapeProps {
  element: CanvasElement;
  isSelected: boolean;
  onSelect: (id: string | null) => void;
  onDragEnd: (e: any, id: string) => void;
  onTransformEnd: (node: any, id: string) => void;
}

const RenderShape: React.FC<RenderShapeProps> = ({
  element,
  isSelected,
  onSelect,
  onDragEnd,
  onTransformEnd,
}) => {
  const handleClick = (e: any) => {
    e.cancelBubble = true;
    onSelect(element.id);
  };

  const commonProps = {
    id: element.id,
    name: element.id,
    x: element.x,
    y: element.y,
    draggable: true,
    onClick: handleClick,
    onTap: handleClick,
    onDragEnd: (e: any) => onDragEnd(e, element.id),
    onTransformEnd: (e: any) => onTransformEnd(e.currentTarget, element.id),
  };

  switch (element.type) {
    case 'frame':
      return (
        <Group {...commonProps}>
          <Rect
            x={0}
            y={0}
            width={element.width}
            height={element.height}
            fill={element.fill}
            stroke={element.stroke}
            strokeWidth={element.strokeWidth}
            cornerRadius={element.cornerRadius}
          />
        </Group>
      );

    case 'text':
      return (
        <Group {...commonProps}>
          <Text
            x={0}
            y={0}
            text={element.text}
            width={element.width}
            height={element.height}
            fontSize={element.fontSize}
            fontFamily={element.fontFamily}
            fill={element.textColor}
            align={element.textAlign}
            verticalAlign={element.verticalAlign}
            lineHeight={element.lineHeight}
            wrap={element.wrap}
          />
        </Group>
      );

    case 'ellipse':
      return (
        <Group {...commonProps}>
          <Ellipse
            x={element.width! / 2}
            y={element.height! / 2}
            radiusX={element.width! / 2}
            radiusY={element.height! / 2}
            fill={element.fill}
            stroke={element.stroke}
            strokeWidth={element.strokeWidth}
          />
        </Group>
      );

    default:
      return null;
  }
};

export default RenderShape;
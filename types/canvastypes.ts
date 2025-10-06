// types.ts
export interface CanvasElementBase {
  id: string;
  type: 'frame' | 'text' | 'ellipse';
  name: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  opacity: number;
}

export interface FrameElement extends CanvasElementBase {
  type: 'frame';
  width: number;
  height: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  cornerRadius: number;
}

export interface TextElement extends CanvasElementBase {
  type: 'text';
  text: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  textColor: string;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  verticalAlign?: 'top' | 'middle' | 'bottom';
  lineHeight?: number;
  wrap?: 'word' | 'char' | 'none';
  width: number;
  height: number;
}

export interface EllipseElement extends CanvasElementBase {
  type: 'ellipse';
  width: number;
  height: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
}

export type CanvasElement = FrameElement | TextElement | EllipseElement;

export interface ShapeCounter {
  rect: number;
  text: number;
  ellipse: number;
}
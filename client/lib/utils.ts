import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Camera, Layer, LayerType, PathLayer, Point, Side, XYWH } from '../types/canvas';
import { Color } from "@/types/canvas";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const COLORS = [
  "#EF4444", 
  "#3B82F6", 
  "#10B981", 
  "#F59E0B", 
  "#8B5CF6", 
  "#EC4899", 
  "#14B8A6", 
  "#F97316", 
];

export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
};

export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera,
) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
};

export function colorToCss(color: Color) {
  return  `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`;
}

export function cssToColor(css: string): Color {
    const hex = css.replace("#", "");
    return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
    };
}

export function resizeBounds(
  bounds: XYWH, 
  point: Point, 
  corner: Side
): XYWH {
  
  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
  };
  

  if ((corner & Side.Right) === Side.Right) {
  result.width = Math.abs(point.x - bounds.x);
}
if ((corner & Side.Top) === Side.Top) {
  result.y = Math.min(point.y, bounds.y + bounds.height);
  result.height = Math.abs(bounds.y + bounds.height - point.y);
}

if ((corner & Side.Bottom) === Side.Bottom) {
  result.height = Math.abs(point.y - bounds.y);
}

if ((corner & Side.Left) === Side.Left) {
  result.x = Math.min(point.x, bounds.x + bounds.width); 
  result.width = Math.abs(bounds.x + bounds.width - point.x);
}

return result;
}

export function findIntersectingLayersWithRectangle(
  layerIds: readonly string[],
  layers: ReadonlyMap<string, Layer>,
  a: Point,
  b: Point,
) {
  const rect = {
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y),
  };

  const ids = [];

  for (const layerId of layerIds) {
    const layer = layers.get(layerId);

    if (layer == null) {
      continue;
    }

    const { x, y, height, width } = layer;

    if (
      rect.x + rect.width > x &&
      rect.x < x + width &&
      rect.y + rect.height > y &&
      rect.y < y + height 
    ) {
      ids.push(layerId)
    }
  }

  return ids;
};

export function penPointsToPathLayer(
  points: number[][],
  color: Color,
): PathLayer {
  if (points.length < 2) {
    throw new Error("cannot work with less than 2 points")
  }

  let left = Number.POSITIVE_INFINITY
  let top = Number.POSITIVE_INFINITY
  let right = Number.NEGATIVE_INFINITY
  let bottom = Number.NEGATIVE_INFINITY

  for (const point of points) {
    const [x, y] = point;

    if (left > x) {
      left = x
    }

    if (top > y) {    
      top = y
    }
    
    if (right < x) {
      right = x
    }

    if (bottom < y) {
      bottom = y
    }

    
  }
  return {
      type: LayerType.Path,
      x: left,
      y: top,
      width: right - left,
      height: bottom - top,
      fill: color,
      points: points.map(([x, y, pressure]) => ({ x: x - left, y: y - top, pressure })),
    }
}

export function getSvgPathFromStroke(stroke: number[][]) {
  if (stroke.length === 0) {
    return "";
  }

  const d = stroke.reduce((acc, [x, y], i) => {
    return acc + (i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
  }, "");

  return d;
}

import type { BlendMode } from "@/types/pixel-art";

/**
 * Convert hex color to RGBA components
 */
function hexToRgba(hex: string, alpha: number = 1): [number, number, number, number] {
  if (hex === "transparent") {
    return [0, 0, 0, 0];
  }
  
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  
  return [r, g, b, alpha];
}

/**
 * Convert RGBA components to hex color
 */
function rgbaToHex(r: number, g: number, b: number, a: number): string {
  if (a === 0) {
    return "transparent";
  }
  
  const rHex = Math.round(r).toString(16).padStart(2, "0");
  const gHex = Math.round(g).toString(16).padStart(2, "0");
  const bHex = Math.round(b).toString(16).padStart(2, "0");
  
  return `#${rHex}${gHex}${bHex}`;
}

/**
 * Clamp value between 0 and 255
 */
function clamp(value: number): number {
  return Math.max(0, Math.min(255, value));
}

/**
 * Apply blend mode between two colors
 */
export function blendColors(
  baseColor: string,
  topColor: string,
  blendMode: BlendMode,
  opacity: number // 0-100
): string {
  const [br, bg, bb, ba] = hexToRgba(baseColor);
  const [tr, tg, tb, ta] = hexToRgba(topColor, opacity / 100);
  
  // If top layer is fully transparent, return base
  if (ta === 0) {
    return baseColor;
  }
  
  // If base is transparent, return top with opacity
  if (ba === 0) {
    return rgbaToHex(tr, tg, tb, ta);
  }
  
  let [r, g, b] = [tr, tg, tb];
  
  // Apply blend mode
  switch (blendMode) {
    case "normal":
      // No blending, just use top color
      break;
      
    case "multiply":
      r = (br * tr) / 255;
      g = (bg * tg) / 255;
      b = (bb * tb) / 255;
      break;
      
    case "screen":
      r = 255 - ((255 - br) * (255 - tr)) / 255;
      g = 255 - ((255 - bg) * (255 - tg)) / 255;
      b = 255 - ((255 - bb) * (255 - tb)) / 255;
      break;
      
    case "overlay":
      r = br < 128 ? (2 * br * tr) / 255 : 255 - (2 * (255 - br) * (255 - tr)) / 255;
      g = bg < 128 ? (2 * bg * tg) / 255 : 255 - (2 * (255 - bg) * (255 - tg)) / 255;
      b = bb < 128 ? (2 * bb * tb) / 255 : 255 - (2 * (255 - bb) * (255 - tb)) / 255;
      break;
      
    case "darken":
      r = Math.min(br, tr);
      g = Math.min(bg, tg);
      b = Math.min(bb, tb);
      break;
      
    case "lighten":
      r = Math.max(br, tr);
      g = Math.max(bg, tg);
      b = Math.max(bb, tb);
      break;
      
    case "color-dodge":
      r = br === 255 ? 255 : Math.min(255, (tr * 255) / (255 - br));
      g = bg === 255 ? 255 : Math.min(255, (tg * 255) / (255 - bg));
      b = bb === 255 ? 255 : Math.min(255, (tb * 255) / (255 - bb));
      break;
      
    case "color-burn":
      r = br === 0 ? 0 : Math.max(0, 255 - ((255 - tr) * 255) / br);
      g = bg === 0 ? 0 : Math.max(0, 255 - ((255 - tg) * 255) / bg);
      b = bb === 0 ? 0 : Math.max(0, 255 - ((255 - tb) * 255) / bb);
      break;
      
    case "hard-light":
      r = tr < 128 ? (2 * br * tr) / 255 : 255 - (2 * (255 - br) * (255 - tr)) / 255;
      g = tg < 128 ? (2 * bg * tg) / 255 : 255 - (2 * (255 - bg) * (255 - tg)) / 255;
      b = tb < 128 ? (2 * bb * tb) / 255 : 255 - (2 * (255 - bb) * (255 - tb)) / 255;
      break;
      
    case "soft-light":
      r = tr < 128 ? br - ((255 - 2 * tr) * br * (255 - br)) / (255 * 255) : br + ((2 * tr - 255) * (Math.sqrt(br / 255) * 255 - br)) / 255;
      g = tg < 128 ? bg - ((255 - 2 * tg) * bg * (255 - bg)) / (255 * 255) : bg + ((2 * tg - 255) * (Math.sqrt(bg / 255) * 255 - bg)) / 255;
      b = tb < 128 ? bb - ((255 - 2 * tb) * bb * (255 - bb)) / (255 * 255) : bb + ((2 * tb - 255) * (Math.sqrt(bb / 255) * 255 - bb)) / 255;
      break;
      
    case "difference":
      r = Math.abs(br - tr);
      g = Math.abs(bg - tg);
      b = Math.abs(bb - tb);
      break;
      
    case "exclusion":
      r = br + tr - (2 * br * tr) / 255;
      g = bg + tg - (2 * bg * tg) / 255;
      b = bb + tb - (2 * bb * tb) / 255;
      break;
  }
  
  // Clamp values
  r = clamp(r);
  g = clamp(g);
  b = clamp(b);
  
  // Alpha compositing
  const alpha = ta + ba * (1 - ta);
  
  if (alpha === 0) {
    return "transparent";
  }
  
  // Blend with opacity
  const finalR = (r * ta + br * ba * (1 - ta)) / alpha;
  const finalG = (g * ta + bg * ba * (1 - ta)) / alpha;
  const finalB = (b * ta + bb * ba * (1 - ta)) / alpha;
  
  return rgbaToHex(finalR, finalG, finalB, alpha);
}

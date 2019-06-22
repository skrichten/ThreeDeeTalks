import React, { useMemo } from 'react';
import { useThree } from 'react-three-fiber';
import { animated as a } from 'react-spring/three';

/** This renders text via canvas and projects it as a sprite */
function CanvasText({ children, position, opacity = 1, color = 'white', fontSize = 50 }) {
  const {
    size: { width, height },
    viewport: { width: viewportWidth, height: viewportHeight }
  } = useThree()
  const scale = viewportWidth > viewportHeight ? viewportWidth : viewportHeight
  const canvas = useMemo(
    () => {
      const canvas = document.createElement('canvas')
      canvas.width = 2048;
      canvas.height = 1024;
      const context = canvas.getContext('2d')
      context.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica, ubuntu, roboto, arial, sans-serif`
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillStyle = color
      context.fillText(children, 1024, 512 - fontSize / 2)
      return canvas
    },
    [children, width, height]
  )
  return (
    <a.sprite scale={[scale, scale * .5, 1]} position={position}>
      <a.spriteMaterial attach="material" transparent depthTest={true} opacity={opacity}>
        <canvasTexture attach="map" image={canvas} premultiplyAlpha onUpdate={s => (s.needsUpdate = true)} />
      </a.spriteMaterial>
    </a.sprite>
  )
}

export default CanvasText;

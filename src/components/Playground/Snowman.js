import React from 'react';
import { useResource } from 'react-three-fiber';
import SimpleSphere from "./SimpleSphere";
import GroundPlane from "./GroundPlane";
import Tree from "./Tree";


function Snowman() {
  const [hatMaterialRef, hatMaterial] = useResource();

  return (
    <group rotation-y={0} /* scene */>
      <meshPhongMaterial
        attach="material"
        color="#000"
        shininess={100}
        ref={hatMaterialRef}
      />
      <group /* snowman */>
        <SimpleSphere
          position={[0, .3, 0]}
          scale={[1.5, 1.5, 1.5]}
          color='#fff'
        />
        <SimpleSphere
          position={[0, 1.6, 0]}
          scale={[1, 1, 1]}
          color='#fff'
        />
        <SimpleSphere
          position={[0, 2.6, 0]}
          scale={[.7, .7, .7]}
          color='#fff'
        />

        {hatMaterial && (
          <group /* hat */>
            <mesh position={[0, 3, 0]} material={hatMaterial} castShadow>
              <cylinderBufferGeometry
                attach="geometry"
                args={[.37, .3, 1, 32]}
              />
            </mesh>
            <mesh position={[0, 3, 0]} material={hatMaterial} castShadow>
              <cylinderBufferGeometry
                attach="geometry"
                args={[.65, .6, .07, 32]}
              />
            </mesh>
          </group>
        )}
        <group /* face */
          scale={[.3, .3, .3]}
          position={[0, 2, .3]}
        >
          <mesh /* Nose */
            position={[0, 2, 1]}
            rotation-x={Math.PI / 2}
            castShadow
          >
            <coneBufferGeometry
              attach="geometry"
              args={[.3, 2, 10]}
            />
            <meshStandardMaterial attach="material" color="#f29913" />
          </mesh>

          <mesh // left eye
            position={[-.4, 2.7, .5]}
            material={hatMaterial}
            rotation-x={Math.PI / 2}
          >
            <cylinderBufferGeometry
              attach="geometry"
              args={[.2, .2, .3, 32]}
            />
          </mesh>
          <mesh // right eye
            position={[.4, 2.7, .5]}
            material={hatMaterial}
            rotation-x={Math.PI / 2}
          >
            <cylinderBufferGeometry
              attach="geometry"
              args={[.2, .2, .3, 32]}
            />
          </mesh>
        </group>
      </group>
      <Tree
        position={[2, 0, -3]}
      />
      <GroundPlane color='#fff' />
    </group>


  )
}

export default Snowman;


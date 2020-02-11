import React from 'react';
import { useResource } from 'react-three-fiber';
import SimpleSphere from "./SimpleSphere";
import GroundPlane from "./GroundPlane";
import TreeLayout from "./TreeLayout";


function Snowman() {
  const [hatMaterialRef, hatMaterial] = useResource();

  return (
    <group rotation-y={-.3} /* scene */>
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
            rotation-x={Math.PI / 2}
            material={hatMaterial}
          >
            <cylinderBufferGeometry
              attach="geometry"
              args={[.2, .2, .3, 32]}
            />
          </mesh>
          <mesh // right eye
            position={[.4, 2.7, .5]}
            rotation-x={Math.PI / 2}
            material={hatMaterial}
          >
            <cylinderBufferGeometry
              attach="geometry"
              args={[.2, .2, .3, 32]}
            />
          </mesh>
          <group // pipe
            rotation={[.1, -.4, 0]}
          >
            <mesh
              position={[0, 1.5, 1]}
              rotation-x={Math.PI / 2}
              castShadow
            >
              <cylinderBufferGeometry
                attach="geometry"
                args={[.07, .07, 2, 8]}
              />
              <meshStandardMaterial attach="material" color="#684a26" />
            </mesh>

            <mesh
              position={[0, 1.6, 2]}
              castShadow
            >
              <cylinderBufferGeometry
                attach="geometry"
                args={[.3, .3, .5, 16]}
              />
              <meshStandardMaterial attach="material" color="#684a26" />
            </mesh>
          </group>

        </group>
      </group>

      <TreeLayout
        position={[-17, 0, -8]}
      />

      <GroundPlane color='#fff' />
    </group>


  )
}

export default Snowman;


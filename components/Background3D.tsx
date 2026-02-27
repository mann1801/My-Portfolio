'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useScroll } from 'framer-motion';
import * as THREE from 'three';

import { useState, useEffect, useMemo } from 'react';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

function ShiningStars(props: any) {
    const { scrollYProgress } = useScroll();
    const groupRef = useRef<THREE.Group>(null);
    const [scale, setScale] = useState(1.2);

    // Generate random points in a sphere for the starfield
    const sphere = useMemo(() => random.inSphere(new Float32Array(5001), { radius: 10 }), []);

    // Responsive scaling
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setScale(0.8); // Mobile scale
            } else if (window.innerWidth < 1024) {
                setScale(1.0); // Tablet scale
            } else {
                setScale(1.2); // Desktop scale
            }
        };

        // Set initial scale
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useFrame((state, delta) => {
        if (groupRef.current) {
            // Ambient slow rotation
            groupRef.current.rotation.x -= delta / 30;
            groupRef.current.rotation.y -= delta / 45;

            const progress = scrollYProgress.get();

            // Dynamic rotation based on scroll to make it interactive
            const targetRotationY = progress * Math.PI * 2;
            const targetPositionZ = progress * 8; // Zoom into the stars on scroll

            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
            groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetPositionZ, 0.05);
        }
    });

    return (
        <group ref={groupRef} scale={scale}>
            <Points positions={sphere as Float32Array} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.08}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>

            {/* Secondary colored starfield for depth */}
            <Points positions={useMemo(() => random.inSphere(new Float32Array(2001), { radius: 12 }), []) as Float32Array} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#3b82f6"
                    size={0.15}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    opacity={0.6}
                />
            </Points>

            {/* Blue glow effect stars */}
            <Points positions={useMemo(() => random.inSphere(new Float32Array(1002), { radius: 15 }), []) as Float32Array} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#8b5cf6"
                    size={0.2}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    opacity={0.4}
                />
            </Points>
        </group>
    );
}

export default function Background3D() {
    return (
        <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none opacity-50">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
                <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <ShiningStars />
            </Canvas>
        </div>
    );
}

import React from 'react';
import Particles from 'react-particles-js';
import particlesConfig from './particle-config';

export default function Particle() {
    return (
        <Particles id='particles' params={particlesConfig} />
    )
}

import { GLSL } from 'gl-react';

export function getShader(numX: number, numY: number) {
    return GLSL`
    #version 300 es
    #define M_PI 3.1415926535897932384626433832795
    
    precision highp float;
    in vec2 uv;
    out vec4 fragColor;
    uniform vec3 colors[${numX * numY}];
  
    const int numX = ${numX};
    const int numY = ${numY};
  
    vec3 linearTosRGB(vec3 linear) {
      vec3 upper = vec3(1.055) * pow(linear, vec3(1.0/2.4)) - vec3(0.055);
      vec3 lower = linear * vec3(12.92);
      bvec3 threshold = lessThan(linear, vec3(0.003131));
      return lower * vec3(threshold) + upper * vec3(not(threshold));
    }
    
    void main() {
      vec3 linear = vec3(0);
      for (int j = 0; j < numY; j++) {
        for (int i = 0; i < numX; i++) {
          float basis = cos(M_PI * uv.x * float(i)) * cos(M_PI * (1.0 - uv.y) * float(j));
          vec3 color = colors[i + j * numX];
          linear += color * basis;
        }
      }
      fragColor = vec4(linearTosRGB(linear), 1.0);
    }
  `;
}

uniform float uTime;

varying vec2 vUv;

void main() {

    vec2 uv = vUv;

    float wave =
        sin((uv.x * 10.0) + uTime) *
        cos((uv.y * 10.0) + uTime);

    float intensity = smoothstep(-1.0, 1.0, wave);

    vec3 color;

    if (intensity < 0.25)
        color = vec3(0.0, 0.0, 1.0);
    else if (intensity < 0.5)
        color = vec3(0.0, 1.0, 1.0);
    else if (intensity < 0.75)
        color = vec3(1.0, 1.0, 0.0);
    else
        color = vec3(1.0, 0.0, 0.0);

    gl_FragColor = vec4(color, 1.0);
}
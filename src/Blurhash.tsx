// eslint-disable-next-line import/default
import React from 'react';
import { Node } from 'gl-react';
import { BlurhashProps } from './BlurhashProps';
import { decode } from './decode';
import { getShader } from './getShader';

export const Blurhash = (props: BlurhashProps) => {
    const decoded = decode(props.hash, props.punch);
    return (
        <Node
            shader={{
                frag: getShader(decoded.numX, decoded.numY)
            }}
            uniforms={{
                colors: decoded.colors
            }}
        />
    );
};

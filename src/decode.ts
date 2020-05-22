import { sRGBToLinear, signPow } from 'blurhash/dist/utils';
import { decode83 } from 'blurhash/dist/base83';

// the following code is copied/extracted from https://github.com/woltapp/blurhash/blob/master/TypeScript/src/decode.ts
// license: MIT
// Author: Olli Mahlamäki https://github.com/omahlama

const decodeDC = (value: number) => {
    const intR = value >> 16;
    const intG = (value >> 8) & 255;
    const intB = value & 255;
    return [sRGBToLinear(intR), sRGBToLinear(intG), sRGBToLinear(intB)];
};

const decodeAC = (value: number, maximumValue: number) => {
    const quantR = Math.floor(value / (19 * 19));
    const quantG = Math.floor(value / 19) % 19;
    const quantB = value % 19;

    const rgb = [
        signPow((quantR - 9) / 9, 2.0) * maximumValue,
        signPow((quantG - 9) / 9, 2.0) * maximumValue,
        signPow((quantB - 9) / 9, 2.0) * maximumValue
    ];

    return rgb;
};

export const decode = (blurhash: string, punch = 1) => {
    const sizeFlag = decode83(blurhash[0]);

    const numY = Math.floor(sizeFlag / 9) + 1;
    const numX = (sizeFlag % 9) + 1;

    const quantisedMaximumValue = decode83(blurhash[1]);
    const maximumValue = (quantisedMaximumValue + 1) / 166;

    const numColors = numX * numY;
    const colors = new Array<number[]>(numX * numY);

    for (let i = 0; i < numColors; i++) {
        if (i === 0) {
            const value = decode83(blurhash.substring(2, 6));
            colors[i] = decodeDC(value);
        } else {
            const value = decode83(blurhash.substring(4 + i * 2, 6 + i * 2));
            colors[i] = decodeAC(value, maximumValue * punch);
        }
    }

    return {
        numX,
        numY,
        colors
    };
};

/// <reference types="react" />
import Shape from './Shape';
export default class ClipPath extends Shape<{
    id?: string;
    clipPath?: string;
    clipRule?: 'evenodd' | 'nonzero';
}> {
    static displayName: string;
    render(): JSX.Element;
}
export declare const RNSVGClipPath: any;

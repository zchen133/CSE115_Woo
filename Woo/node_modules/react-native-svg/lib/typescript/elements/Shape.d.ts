import { Component } from 'react';
import { NativeMethodsMixinStatic } from 'react-native';
import { TransformProps } from '../lib/extract/types';
export default class Shape<P> extends Component<P> {
    [x: string]: unknown;
    root: (Shape<P> & NativeMethodsMixinStatic) | null;
    constructor(props: P, context: {});
    refMethod: (instance: (Shape<P> & NativeMethodsMixinStatic) | null) => void;
    setNativeProps: (props: Object & {
        matrix?: [number, number, number, number, number, number] | undefined;
    } & TransformProps) => void;
}

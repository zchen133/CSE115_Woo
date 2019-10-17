import { Component } from 'react';
declare type StopProps = {
    parent?: Component;
};
export default class Stop extends Component<StopProps, {}> {
    props: StopProps;
    static displayName: string;
    static defaultProps: {
        stopColor: string;
        stopOpacity: number;
    };
    setNativeProps: () => void;
    render(): null;
}
export {};

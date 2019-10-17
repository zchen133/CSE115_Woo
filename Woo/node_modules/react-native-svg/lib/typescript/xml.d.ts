import { Component, ComponentType } from 'react';
export declare const tags: {
    [tag: string]: ComponentType;
};
export interface AST {
    tag: string;
    children: (AST | string)[] | (JSX.Element | string)[];
    props: {};
    Tag: ComponentType;
}
export declare type UriProps = {
    uri: string | null;
    override?: Object;
};
export declare type UriState = {
    xml: string | null;
};
export declare type XmlProps = {
    xml: string | null;
    override?: Object;
};
export declare type XmlState = {
    ast: AST | null;
};
export declare type AstProps = {
    ast: AST | null;
    override?: Object;
};
export declare function SvgAst({ ast, override }: AstProps): JSX.Element | null;
export declare function SvgXml(props: XmlProps): JSX.Element;
export declare function SvgUri(props: UriProps): JSX.Element;
export declare class SvgFromXml extends Component<XmlProps, XmlState> {
    state: {
        ast: null;
    };
    componentDidMount(): void;
    componentDidUpdate(prevProps: {
        xml: string | null;
    }): void;
    parse(xml: string | null): void;
    render(): JSX.Element;
}
export declare class SvgFromUri extends Component<UriProps, UriState> {
    state: {
        xml: null;
    };
    componentDidMount(): void;
    componentDidUpdate(prevProps: {
        uri: string | null;
    }): void;
    fetch(uri: string | null): Promise<void>;
    render(): JSX.Element;
}
declare type Styles = {
    [property: string]: string;
};
export declare function getStyle(string: string): Styles;
export declare function astToReact(value: AST | string, index: number): JSX.Element | string;
export declare function parse(source: string): AST | null;
export {};

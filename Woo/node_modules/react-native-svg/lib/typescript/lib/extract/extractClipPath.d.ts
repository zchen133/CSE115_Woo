import { ClipProps } from './types';
export default function extractClipPath(props: ClipProps): {
    clipPath?: string | undefined;
    clipRule?: number | undefined;
};

export declare const callbacks: {
    dispatchErrorEvent?: (error: any) => void;
};
export declare function dispatchEventImpl(ev: Event, map: Iterable<EventListenerOrEventListenerObject>): boolean;

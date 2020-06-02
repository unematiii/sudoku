import React, { ComponentType, createRef, useCallback, useEffect, useState } from "react";

const baseContainerWidth = 550;
const baseFontSize = 32;
const minFontSize = 16;

export function withDynamicFontSize<P>(Component: ComponentType<P>) {
    return (props: P) => {
        const [containerWidth, setContainerWidth] = useState(0);
        const containerRef = createRef<HTMLDivElement>();

        const updateContainerWidth = useCallback(() => {
            if(containerRef.current) {
                const box = containerRef.current.getBoundingClientRect();
                setContainerWidth(Math.min(box.width, box.height));
            }
        }, [containerRef]);

        useEffect(() => {
            updateContainerWidth();

            window.addEventListener('resize', updateContainerWidth);
            window.addEventListener('orientationchange', updateContainerWidth);

            return () => {
                window.removeEventListener('resize', updateContainerWidth);
                window.removeEventListener('orientationchange', updateContainerWidth);
            };
        }, [updateContainerWidth]);
       

        const fontSize = Math.max(containerWidth / baseContainerWidth * baseFontSize, minFontSize);
        const style = {
            fontSize: `${fontSize}px`,
        };

        return (
            <Component ref={containerRef} style={style} {...props} />
        );
    }
}

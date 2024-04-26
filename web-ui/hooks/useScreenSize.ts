import { ScreenSize } from '@ui/constants';
import { useEffect, useMemo, useState } from 'react';

const getWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

export function useScreenSize() {
    const [width, setWidth] = useState<number>(getWidth());

    useEffect(() => {
        const resizeListener = () => {
            setWidth(getWidth());
        };
        window.addEventListener('resize', resizeListener);

        return () => {
            // remove resize listener
            window.removeEventListener('resize', resizeListener);
        };
    }, []);

    const screenSize = useMemo(() => {
        // Work around https://tailwindcss.com/docs/responsive-design#overview
        // Breakpoint Minimum_width	CSS
        // sm	        640px	        @media (min-width: 640px) { ... }
        // md	        768px	        @media (min-width: 768px) { ... }
        // lg	        1024px	      @media (min-width: 1024px) { ... }
        // xl	        1280px        @media (min-width: 1280px) { ... }
        // 2xl	      1536px	      @media (min-width: 1536px) { ... }
        if (width < 640) return ScreenSize.MOBILE;
        if (640 <= width && width < 768) return ScreenSize.SM;
        if (768 <= width && width < 1024) return ScreenSize.MD;
        if (1024 <= width && width < 1280) return ScreenSize.LG;
        if (1280 <= width && width < 1536) return ScreenSize.XL;
        if (1536 <= width) return ScreenSize.XXL;

        return ScreenSize.MOBILE;
    }, [width]);

    return {
        screenSize
    };
}

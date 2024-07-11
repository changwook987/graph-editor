import { LayoutForceAtlas2Control, useWorkerLayoutForceAtlas2 } from "@react-sigma/layout-forceatlas2";
import { FC, useEffect } from "react";

export const Fa2: FC = () => {
    const { start, kill } = useWorkerLayoutForceAtlas2({
        settings: {
            slowDown: 10,
        },
    });

    useEffect(() => {
        start();

        return () => {
            kill();
        };
    }, [start, kill]);

    return null;
};

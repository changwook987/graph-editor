import { useRegisterEvents, useSigma } from "@react-sigma/core";
import { useWorkerLayoutForceAtlas2 } from "@react-sigma/layout-forceatlas2";
import { useEffect, useState } from "react";

export const DragNDrop: React.FC = () => {
    const registerEvents = useRegisterEvents();
    const sigma = useSigma();
    const [draggedNode, setDraggedNode] = useState<string | null>(null);

    const { start, stop, kill, isRunning } = useWorkerLayoutForceAtlas2({
        settings: {
            slowDown: 10,
        },
    });

    useEffect(() => {
        // Register the events
        registerEvents({
            downNode: (e) => {
                setDraggedNode(e.node);
                sigma.getGraph().setNodeAttribute(e.node, "highlighted", true);
            },
            // On mouse move, if the drag mode is enabled, we change the position of the draggedNode
            mousemovebody: (e) => {
                if (!draggedNode) return;
                // Get new position of node
                const pos = sigma.viewportToGraph(e);
                sigma.getGraph().setNodeAttribute(draggedNode, "x", pos.x);
                sigma.getGraph().setNodeAttribute(draggedNode, "y", pos.y);

                // Prevent sigma to move camera:
                e.preventSigmaDefault();
                e.original.preventDefault();
                e.original.stopPropagation();
            },
            // On mouse up, we reset the autoscale and the dragging mode
            mouseup: () => {
                if (draggedNode) {
                    setDraggedNode(null);
                    sigma
                        .getGraph()
                        .removeNodeAttribute(draggedNode, "highlighted");
                    if (isRunning) {
                        start();
                    }
                }
            },
            // Disable the autoscale at the first down interaction
            mousedown: () => {
                if (!sigma.getCustomBBox())
                    sigma.setCustomBBox(sigma.getBBox());
                if (isRunning) {
                    stop();
                }
            },
        });
    }, [registerEvents, sigma, draggedNode, start, stop, isRunning]);

    useEffect(() => {
        start();
        return () => {
            kill();
        };
    }, [start, kill]);

    return null;
};

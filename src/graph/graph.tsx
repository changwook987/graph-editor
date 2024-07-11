import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import Graph from "graphology";
import { CSSProperties, FC, useEffect } from "react";
import { DragNDrop } from "./dragndrop";

import "@react-sigma/core/lib/react-sigma.min.css";

export const LoadGraph: FC<DisplayGraphProps> = (props) => {
    const loadGraph = useLoadGraph();

    useEffect(() => {
        const graph = new Graph();

        const g = props.graph ?? [];

        const nodes = new Set<any>();

        for (const row of g) {
            for (const col of row) {
                if (col) nodes.add(col);
            }
        }

        nodes.forEach((i) => {
            graph.addNode(i, {
                x: Math.random(),
                y: Math.random(),
                size: 15,
                label: i,
            });
        });

        for (const row of g) {
            const [a, b] = row.map((item) => item);
            if (!(a && b)) continue;
            graph.addEdge(a, b, {
                size: 10,
                label: 1,
            });
        }

        loadGraph(graph);
    }, [loadGraph, props]);

    return null;
};

export interface DisplayGraphProps {
    graph?: any[][];
}

export const DisplayGraph = (
    props: DisplayGraphProps & { style?: CSSProperties }
) => {
    const { graph, style } = props;

    return (
        <SigmaContainer
            style={style}
            settings={{ allowInvalidContainer: true }}
        >
            <LoadGraph graph={graph} />
            <DragNDrop />
        </SigmaContainer>
    );
};

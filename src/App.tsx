import { useState } from "react";
import { DisplayGraph } from "./graph";

import "./styles/main.css";

const decode = (s: string) => s.split("\n").map((line) => line.split(" "));

export const App = () => {
    const [data, setData] = useState("");

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                height: "100%",
                width: "100%",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: "2",
                    height: "100%",
                }}
            >
                <div
                    style={{
                        flex: "2",
                        padding: 10,
                    }}
                >
                    <h1 style={{ margin: 0 }}>Graph Editor</h1>
                    <h3>used library</h3>
                    <ul>
                        <li>
                            <a href="https://github.com/sim51/react-sigma">
                                @react-sigma
                            </a>
                        </li>
                    </ul>
                </div>
                <textarea
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    style={{
                        flex: "8",
                        resize: "none",
                        borderRadius: 0,
                        padding: 0,
                    }}
                ></textarea>
            </div>
            <DisplayGraph
                graph={decode(data)}
                style={{
                    flex: "8",
                    height: "100%",
                    border: "1px solid black",
                }}
            />
        </div>
    );
};

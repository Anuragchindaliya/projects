"use client";

import { IconCheck, IconCopy } from "@tabler/icons-react";
import { Highlight, themes } from "prism-react-renderer";
import { useState } from "react";

type TabItem = {
    name: string;
    code: string;
    language?: string;
    highlightLines?: number[];
};

type CodeBlockProps =
    | {
        filename?: string;
        code: string;
        language: string;
        highlightLines?: number[];
        tabs?: never;
    }
    | {
        filename?: never;
        code?: never;
        language?: string;
        highlightLines?: never;
        tabs: TabItem[];
    };

export const CodeBlock = ({
    filename,
    code,
    language = "tsx",
    highlightLines = [],
    tabs = [],
    ...props
}: CodeBlockProps) => {
    const isTabbed = tabs.length > 0;
    const [activeTab, setActiveTab] = useState(0);
    const [copied, setCopied] = useState(false);

    const activeCode = isTabbed ? tabs[activeTab].code : code!;
    const activeLanguage = isTabbed
        ? tabs[activeTab].language || language
        : language;

    const activeHighlightLines = isTabbed
        ? tabs[activeTab].highlightLines || []
        : highlightLines;

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(activeCode || "");
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
    };

    return (
        <div className="relative w-full rounded-lg bg-[#0D0D0D] p-4 font-mono text-sm border border-zinc-800">
            {/* Tabs */}
            {isTabbed && (
                <div className="flex gap-4 overflow-x-auto mb-3 border-b border-zinc-700 pb-2">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            className={`px-3 py-1 text-xs transition-colors ${activeTab === index
                                ? "text-white border-b border-white"
                                : "text-zinc-400 hover:text-zinc-200"
                                }`}
                            onClick={() => setActiveTab(index)}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>
            )}

            {/* Filename + Copy Button */}
            {filename && (
                <div className="flex justify-between items-center mb-3">
                    <span className="text-xs text-zinc-500">{filename}</span>

                    <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
                    >
                        {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                    </button>
                </div>
            )}

            {/* Code Rendering */}
            <Highlight
                {...props}
                code={activeCode.trim()}
                language={activeLanguage as any}
                theme={themes.dracula}
            >
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre
                        className={`${className} rounded-lg p-4 overflow-x-auto text-sm`}
                        style={{
                            ...style,
                            background: "transparent",
                            margin: 0,
                        }}
                    >
                        {tokens.map((line, i) => {
                            const lineNumber = i + 1;
                            const isHighlighted = activeHighlightLines.includes(lineNumber);

                            return (
                                <div
                                    key={i}
                                    {...getLineProps({
                                        line,
                                        key: i,
                                    })}
                                    className="whitespace-pre flex"
                                    style={{
                                        backgroundColor: isHighlighted
                                            ? "rgba(255,255,255,0.1)"
                                            : "transparent",
                                    }}
                                >
                                    {/* Line numbers */}
                                    <span className="select-none text-zinc-500 w-8 text-right pr-4">
                                        {lineNumber}
                                    </span>

                                    {/* Code tokens */}
                                    <span>
                                        {line.map((token, key) => (
                                            <span
                                                key={key}
                                                {...getTokenProps({
                                                    token,
                                                    key,
                                                })}
                                            />
                                        ))}
                                    </span>
                                </div>
                            );
                        })}
                    </pre>
                )}
            </Highlight>

            {/* Copy button for tabs */}
            {isTabbed && (
                <button
                    onClick={copyToClipboard}
                    className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                    {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                </button>
            )}
        </div>
    );
};

import React, { useEffect, useRef, useState } from 'react';
import { useCinematicAudio } from './useCinematicAudio';

const COMMANDS: Record<string, string> = {
    help: 'Available commands: about, email, github, clear, contact',
    about: 'I am a creative developer building antigravity experiences.',
    email: 'hello@example.com (Click to copy)',
    github: 'github.com/anurag (Opening...)',
    contact: 'Reach me at hello@example.com',
    clear: 'Clearing...',
};

export const Terminal = () => {
    const [history, setHistory] = useState<string[]>(['Welcome to the V2 Terminal. Type "help" to start.']);
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { playClick } = useCinematicAudio();

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (cmd: string) => {
        const trimmed = cmd.trim().toLowerCase();
        const output = COMMANDS[trimmed] || `Command not found: ${trimmed}. Type "help".`;

        if (trimmed === 'clear') {
            setHistory([]);
        } else {
            setHistory(prev => [...prev, `> ${cmd}`, output]);
        }

        if (trimmed === 'github') {
            setTimeout(() => window.open('https://github.com', '_blank'), 1000);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            playClick();
            handleCommand(input);
            setInput('');
        }
    };

    return (
        <div
            className="w-full max-w-2xl bg-black/80 backdrop-blur-md rounded-lg border border-white/20 p-4 font-mono text-sm text-green-400 shadow-2xl h-96 flex flex-col"
            onClick={() => inputRef.current?.focus()}
        >
            <div className="flex gap-2 mb-4 border-b border-white/10 pb-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-auto text-xs text-white/30">bash -- v2</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-white/20" ref={scrollRef}>
                {history.map((line, i) => (
                    <div key={i} className="break-words">{line}</div>
                ))}
            </div>

            <div className="flex items-center pt-4 mt-2 border-t border-white/10">
                <span className="mr-2 text-blue-400">➜</span>
                <span className="mr-2 text-pink-400">~</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none border-none text-white focus:ring-0"
                    autoFocus
                    spellCheck={false}
                />
            </div>
        </div>
    );
};

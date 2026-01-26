import { cn } from "@/lib/utils";
import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSound } from "./SoundContext";

const AudioController = ({ className }: { className?: string }) => {
    const { isMuted, toggleMute, volume, setVolume, isPlaying, setIsPlaying, playSFX } = useSound();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Simple visualizer simulation since we can't easily analyze cross-origin audio
    // without CORS issues. We'll just animate random bars if playing.
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        const bars = 20;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = isMuted ? "#555" : "#0ea5e9"; // cyan-500

            if (isPlaying && !isMuted) {
                for (let i = 0; i < bars; i++) {
                    const h = Math.random() * canvas.height;
                    const x = (i * canvas.width) / bars;
                    ctx.fillRect(x, canvas.height - h, canvas.width / bars - 2, h);
                }
            } else {
                // Flat line
                ctx.fillRect(0, canvas.height / 2, canvas.width, 1);
            }

            animationId = requestAnimationFrame(draw);
        };

        // Slow down animation for chill vibe
        const loop = () => {
            setTimeout(() => {
                draw();
            }, 100);
        }
        draw();

        return () => cancelAnimationFrame(animationId);
    }, [isPlaying, isMuted]);

    if (!mounted) return null;

    return (
        <div className={cn("fixed bottom-5 left-5 z-[9999] flex items-center gap-2 rounded-full border border-gray-200/20 bg-white/10 p-2 backdrop-blur-md dark:bg-black/40", className)}>
            <button
                onClick={() => { toggleMute(); playSFX("click") }}
                className="rounded-full p-2 text-white hover:bg-white/20 transition-colors"
            >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>

            <div className="hidden sm:block w-24">
                <canvas ref={canvasRef} width={100} height={20} className="w-full h-5 rounded" />
            </div>

            <div className="flex flex-col gap-1 w-20 sm:w-24">
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-primary-500 dark:bg-gray-700"
                />
            </div>

            {/* Start Button if not started (browser policy) */}
            {!isPlaying && (
                <button
                    onClick={() => setIsPlaying(true)} className="text-[10px] text-white underline decoration-dashed">
                    Start Audio
                </button>
            )}
        </div>
    );
};

export default AudioController;

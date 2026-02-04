import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";

// Audio Assets
const SOUNDS = {
    spaceHum: "https://res.cloudinary.com/dmx6fffxi/video/upload/v1769450807/space-hum_l71gyv.mp3",
    click: 'https://res.cloudinary.com/dmx6fffxi/video/upload/v1769360257/computer-mouse-click-02-383961_iz2ue0.mp3',
    whoosh: 'https://res.cloudinary.com/dmx6fffxi/video/upload/v1769360686/short-woosh-109592_tbsfvz.mp3',
    longWoosh: "https://res.cloudinary.com/dmx6fffxi/video/upload/v1769444893/long-woosh.mp3",
    //static: "https://assets.mixkit.co/sfx/preview/mixkit-static-buzz-1118.mp3",
};

type SoundType = keyof typeof SOUNDS;

interface SoundContextType {
    isMuted: boolean;
    toggleMute: () => void;
    isMusicEnabled: boolean;
    toggleMusic: () => void;
    isSFXEnabled: boolean;
    toggleSFX: () => void;
    playSFX: (type: SoundType) => void;
    isPlaying: boolean;
    setIsPlaying: (playing: boolean) => void;
    volume: number;
    setVolume: (audio: number) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
    const [isMuted, setIsMuted] = useLocalStorage("sound-muted", false);
    const [isMusicEnabled, setIsMusicEnabled] = useLocalStorage("sound-music-enabled", true);
    const [isSFXEnabled, setIsSFXEnabled] = useLocalStorage("sound-sfx-enabled", true);

    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5); // 0 to 1

    const ambientRef = useRef<HTMLAudioElement | null>(null);
    const sfxRef = useRef<{ [key in SoundType]?: HTMLAudioElement }>({});

    const isMutedRef = useRef(isMuted);
    const isSFXEnabledRef = useRef(isSFXEnabled);
    const volumeRef = useRef(volume);

    useEffect(() => {
        isMutedRef.current = isMuted;
    }, [isMuted]);

    useEffect(() => {
        isSFXEnabledRef.current = isSFXEnabled;
    }, [isSFXEnabled]);

    useEffect(() => {
        volumeRef.current = volume;
    }, [volume]);

    // Initialize ambient sound
    useEffect(() => {
        const audio = new Audio(SOUNDS.spaceHum);
        audio.loop = true;
        audio.volume = isMuted ? 0 : volume * 0.3; // Ambient is quieter
        ambientRef.current = audio;

        // Preload SFX
        Object.entries(SOUNDS).forEach(([key, src]) => {
            if (key !== "spaceHum") {
                sfxRef.current[key as SoundType] = new Audio(src);
            }
        });

        return () => {
            audio.pause();
            audio.src = "";
        };
    }, []);

    useEffect(() => {
        if (ambientRef.current) {
            if (isPlaying && !isMuted && isMusicEnabled) {
                // Check if already playing to avoid Promise errors
                const playPromise = ambientRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Audio play prevented:", error);
                    });
                }
            } else {
                ambientRef.current.pause();
            }
        }
    }, [isPlaying, isMuted, isMusicEnabled]);

    useEffect(() => {
        if (ambientRef.current) {
            ambientRef.current.volume = (isMuted || !isMusicEnabled) ? 0 : volume * 0.3;
        }
    }, [volume, isMuted, isMusicEnabled]);


    const toggleMute = React.useCallback(() => {
        setIsMuted((prev) => !prev);
    }, [setIsMuted]);

    const toggleMusic = React.useCallback(() => {
        setIsMusicEnabled((prev) => !prev);
    }, [setIsMusicEnabled]);

    const toggleSFX = React.useCallback(() => {
        setIsSFXEnabled((prev) => !prev);
    }, [setIsSFXEnabled]);

    const playSFX = React.useCallback((type: SoundType) => {
        if (isMutedRef.current || !isSFXEnabledRef.current) return;
        const audio = sfxRef.current[type];
        if (audio) {
            // Clone for overlapping sounds (esp clicks)
            const clone = audio.cloneNode() as HTMLAudioElement;
            clone.volume = volumeRef.current;
            clone.play().catch(e => console.warn("SFX play error", e));
        }
    }, []);

    const value = React.useMemo(() => ({
        isMuted, toggleMute,
        isMusicEnabled, toggleMusic,
        isSFXEnabled, toggleSFX,
        playSFX, isPlaying, setIsPlaying, volume, setVolume
    }), [isMuted, toggleMute, isMusicEnabled, toggleMusic, isSFXEnabled, toggleSFX, playSFX, isPlaying, volume]);

    return (
        <SoundContext.Provider value={value}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSound = () => {
    const context = useContext(SoundContext);
    if (!context) throw new Error("useSound must be used within SoundProvider");
    return context;
};

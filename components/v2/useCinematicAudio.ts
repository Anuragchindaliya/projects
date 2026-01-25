import { Howl } from 'howler';
import { useCallback, useEffect, useRef } from 'react';
import { useV2Audio } from './V2AudioProvider';

const SOUNDS = {
    hover: '/sounds/hover.mp3',
    click: 'https://res.cloudinary.com/dmx6fffxi/video/upload/v1769360257/computer-mouse-click-02-383961_iz2ue0.mp3',
    whoosh: 'https://res.cloudinary.com/dmx6fffxi/video/upload/v1769360686/short-woosh-109592_tbsfvz.mp3',
    scifiHum: '/sounds/scifi-hum.mp3',
};

export const useCinematicAudio = (componentEnabled: boolean = true) => {
    const { isBgMuted, isSfxMuted } = useV2Audio();

    const humRef = useRef<Howl | null>(null);
    const hoverRef = useRef<Howl | null>(null);
    const clickRef = useRef<Howl | null>(null);
    const whooshRef = useRef<Howl | null>(null);

    useEffect(() => {
        // Background Hum
        humRef.current = new Howl({
            src: [SOUNDS.scifiHum],
            loop: true,
            volume: 0.05,
            html5: true,
            preload: true,
        });

        // SFX
        hoverRef.current = new Howl({ src: [SOUNDS.hover], volume: 0.1 });
        clickRef.current = new Howl({ src: [SOUNDS.click], volume: 0.2 });
        whooshRef.current = new Howl({ src: [SOUNDS.whoosh], volume: 0.15 });

        return () => {
            humRef.current?.unload();
            hoverRef.current?.unload();
            clickRef.current?.unload();
            whooshRef.current?.unload();
        };
    }, []);

    // Handle BG Mute State
    useEffect(() => {
        if (humRef.current) {
            if (isBgMuted) {
                humRef.current.mute(true);
            } else {
                humRef.current.mute(false);
                // If meant to be playing but was muted, ensure it's playing
                if (!humRef.current.playing()) {
                    // Only auto-play if we actually started it previously or if this is global re-enable
                    // For now, we rely on startHum to trigger initial play
                }
            }
        }
    }, [isBgMuted]);

    const startHum = useCallback(() => {
        if (componentEnabled && humRef.current && !humRef.current.playing()) {
            humRef.current.fade(0, 0.05, 2000);
            humRef.current.play();
        }
    }, [componentEnabled]);

    const playHover = useCallback(() => {
        if (componentEnabled && !isSfxMuted && hoverRef.current) {
            hoverRef.current.stop();
            hoverRef.current.play();
        }
    }, [componentEnabled, isSfxMuted]);

    const playClick = useCallback(() => {
        if (componentEnabled && !isSfxMuted && clickRef.current) {
            clickRef.current.play();
        }
    }, [componentEnabled, isSfxMuted]);

    const playWhoosh = useCallback(() => {
        if (componentEnabled && !isSfxMuted && whooshRef.current) {
            whooshRef.current.stop();
            whooshRef.current.play();
        }
    }, [componentEnabled, isSfxMuted]);

    return { startHum, playHover, playClick, playWhoosh };
};

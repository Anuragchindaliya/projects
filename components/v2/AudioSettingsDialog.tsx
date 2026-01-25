import { AnimatePresence, motion } from 'framer-motion';
import { GlassCard } from './GlassCard';
import { useV2Audio } from './V2AudioProvider';

interface AudioSettingsDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AudioSettingsDialog({ isOpen, onClose }: AudioSettingsDialogProps) {
    const { isBgMuted, isSfxMuted, toggleBgMute, toggleSfxMute } = useV2Audio();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Dialog */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
                    >
                        <GlassCard className="w-full max-w-sm p-6 pointer-events-auto border-v2-primary/20 shadow-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-white">Audio Settings</h3>
                                <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Background Hum Toggle */}
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-v2-foreground font-medium">Ambient Hum</span>
                                        <span className="text-xs text-v2-foreground/50">Cinematic background drone</span>
                                    </div>
                                    <button
                                        onClick={toggleBgMute}
                                        className={`w-12 h-6 rounded-full p-1 transition-colors ${!isBgMuted ? 'bg-v2-primary' : 'bg-white/10'
                                            }`}
                                    >
                                        <div
                                            className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${!isBgMuted ? 'translate-x-6' : 'translate-x-0'
                                                }`}
                                        />
                                    </button>
                                </div>

                                {/* SFX Toggle */}
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-v2-foreground font-medium">Sound Effects</span>
                                        <span className="text-xs text-v2-foreground/50">Clicks, hover, and feedback</span>
                                    </div>
                                    <button
                                        onClick={toggleSfxMute}
                                        className={`w-12 h-6 rounded-full p-1 transition-colors ${!isSfxMuted ? 'bg-v2-secondary' : 'bg-white/10'
                                            }`}
                                    >
                                        <div
                                            className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${!isSfxMuted ? 'translate-x-6' : 'translate-x-0'
                                                }`}
                                        />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10 text-center">
                                <p className="text-xs text-v2-foreground/30">
                                    Designed for an immersive experience.
                                </p>
                            </div>
                        </GlassCard>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

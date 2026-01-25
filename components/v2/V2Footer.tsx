import { TextReveal } from './TextReveal';

export const V2Footer = () => {
    return (
        <footer className="w-full py-20 text-center relative z-10">
            <div className="mb-4">
                <TextReveal
                    text="Thank you for visiting"
                    className="text-3xl md:text-5xl font-bold text-white justify-center"
                    duration={1}
                />
            </div>
            <p className="text-v2-foreground/40 text-sm">
                © {new Date().getFullYear()} Anurag Chindaliya. All rights reserved.
            </p>
        </footer>
    );
};

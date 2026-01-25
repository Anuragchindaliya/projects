import { Terminal } from '../../components/v2/Terminal';
import { TextReveal } from '../../components/v2/TextReveal';
import { V2Layout } from '../../components/v2/V2Layout';

export default function ContactPage() {
    return (
        <V2Layout>
            <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-8">
                <div className="text-center">
                    <TextReveal
                        text="Initialize Connection"
                        className="text-3xl md:text-5xl font-bold text-white mb-2 justify-center"
                    />
                    <p className="text-v2-foreground/60">Use the terminal to reach the mainframe.</p>
                </div>

                <Terminal />
            </div>
        </V2Layout>
    );
}

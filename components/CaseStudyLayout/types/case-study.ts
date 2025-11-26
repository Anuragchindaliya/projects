export interface CodeBlock {
  title: string;
  filePath?: string;
  language?: string;
  code?: string;
  highlightLines?: number[];
}

export interface CaseStudy {
  title: string;
  subtitle?: string;
  description: string;

  problem: string;

  demo?: string; // This will hold HTML or a component name

  installation?: CodeBlock;

  codeBlocks?: CodeBlock[];

  usage?: string;

  howItWorks?: string[];

  devNotes?: string[];

  impact?: string[];

  // You can add more fields later easily
}

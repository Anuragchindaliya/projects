export interface CodeBlock {
  title?: string;
  filePath?: string;
  language?: string;
  code?: string;
  highlightLines?: number[];
  tabs?: {
    name: string;
    code: string;
    language?: string;
    highlightLines?: number[];
  }[];
}

export interface CaseStudy {
  slug: string;
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
  tabs?: {
    name: string;
    code: string;
    language?: string;
    highlightLines?: number[];
  }[];

  // You can add more fields later easily
}

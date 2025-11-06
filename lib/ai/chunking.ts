import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

/**
 * Optimized chunking for resume/CV documents
 * - Smaller chunks (300-400 chars) for better semantic precision
 * - Strategic separators to respect document structure
 * - Sufficient overlap to maintain context
 */
export async function chunkContent(content: string, chunkSize = 350) {
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize,
    chunkOverlap: 50, // 15% overlap for context continuity
    separators: [
      "\n\n", // Paragraph breaks (highest priority)
      "\n", // Line breaks
      ". ", // Sentence endings
      ", ", // Clause breaks
      " ", // Word breaks
      "", // Character fallback
    ],
    keepSeparator: false,
    lengthFunction: (text) => text.length,
  });

  return await textSplitter.splitText(content.trim());
}

/**
 * Alternative: Adaptive chunking based on content type
 * Use this if you want different strategies for different sections
 */
export async function chunkContentAdaptive(content: string) {
  // Detect if content has clear section markers
  const hasStructuredSections =
    /^(Professional Experience|Education|Core Competencies|Certifications)/m.test(
      content
    );

  if (hasStructuredSections) {
    // For structured resumes: smaller chunks to isolate skills/achievements
    return chunkContent(content, 300);
  } else {
    // For unstructured content: slightly larger chunks
    return chunkContent(content, 400);
  }
}

/**
 * Pre-processing: Clean and normalize text before chunking
 */
export function preprocessResumeText(text: string): string {
  return (
    text
      // Normalize whitespace
      .replace(/\r\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      // Preserve section headers by ensuring they have breathing room
      .replace(/^([A-Z][A-Za-z\s&/]+)$/gm, "\n$1\n")
      // Clean up bullet points and list markers
      .replace(/^[•\-\*]\s+/gm, "")
      .trim()
  );
}

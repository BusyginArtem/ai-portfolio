import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

// export const textSplitter = new RecursiveCharacterTextSplitter({
//   chunkSize: 500,
//   chunkOverlap: 20,
//   separators: [" "],
// });

export async function chunkContent(content: string, chunkSize = 300) {
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize,
    chunkOverlap: 20,
    separators: [" "],
  });

  return await textSplitter.splitText(content.trim());
}

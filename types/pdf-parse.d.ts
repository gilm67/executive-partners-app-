declare module 'pdf-parse' {
  const pdfParse: (data: Buffer | Uint8Array | ArrayBuffer, options?: any) => Promise<{ text?: string }>;
  export default pdfParse;
}

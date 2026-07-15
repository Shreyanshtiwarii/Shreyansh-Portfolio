import React from 'react';

// Deliberately tiny and dependency-free: wraps a native <iframe> so the
// browser's own PDF renderer is used. Kept as its own chunk (imported via
// React.lazy from any section that needs a PDF preview — e.g. Resume,
// Academic Journey) so the viewer, and the PDF file it points to, is only
// fetched once the person actually asks to preview it.
const PDFViewer = ({ src, title, className }) => (
  <iframe
    src={`${src}#toolbar=1&navpanes=0`}
    title={title}
    className={className}
    loading="lazy"
  />
);

export default PDFViewer;

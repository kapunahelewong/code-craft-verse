import React from 'react';
import { useCodeStore } from '@/stores/codeStore';

const Editor = () => {
  const { currentFile, updateFileContent } = useCodeStore();

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (currentFile) {
      updateFileContent(currentFile.path, e.target.value);
    }
  };

  const lines = currentFile?.content.split('\n') || [''];
  const lineNumbers = lines.map((_, index) => index + 1);

  return (
    <div className="flex-1 overflow-hidden bg-editor-bg relative">
      <div className="absolute top-0 left-0 right-0 bottom-0 flex">
        <div className="flex-none py-4">
          {lineNumbers.map((num) => (
            <div
              key={num}
              className="text-editor-number text-right pr-4 select-none w-12 text-sm font-mono"
            >
              {num}
            </div>
          ))}
        </div>
        <textarea
          value={currentFile?.content || ''}
          onChange={handleCodeChange}
          placeholder={currentFile ? '' : 'Select a file to start editing'}
          className="flex-1 bg-transparent text-editor-text p-4 font-mono text-sm resize-none outline-none"
          spellCheck="false"
          style={{
            lineHeight: '1.5',
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );
};

export default Editor;
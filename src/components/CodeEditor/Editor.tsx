import React, { useState } from 'react';

const Editor = () => {
  const [code, setCode] = useState(`function greeting(name) {
  return \`Hello, \${name}!\`;
}

const message = greeting('World');
console.log(message);`);

  const lines = code.split('\n');
  const lineNumbers = lines.map((_, index) => index + 1);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

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
          value={code}
          onChange={handleCodeChange}
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
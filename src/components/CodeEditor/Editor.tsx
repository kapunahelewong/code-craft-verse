import React from 'react';

const sampleCode = `function greeting(name) {
  return \`Hello, \${name}!\`;
}

const message = greeting('World');
console.log(message);`;

const Editor = () => {
  const lines = sampleCode.split('\n');

  return (
    <div className="flex-1 overflow-auto bg-editor-bg">
      <div className="font-mono text-sm">
        {lines.map((line, index) => (
          <div key={index} className="flex">
            <div className="w-12 text-right pr-4 text-editor-number select-none border-r border-editor-border">
              {index + 1}
            </div>
            <pre className="pl-4 text-editor-text">{line}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Editor;
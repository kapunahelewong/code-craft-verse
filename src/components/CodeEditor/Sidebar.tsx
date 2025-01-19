import React from 'react';
import { File, Folder } from 'lucide-react';

const files = [
  { name: 'index.html', type: 'file' },
  { name: 'styles', type: 'folder', files: ['main.css', 'utils.css'] },
  { name: 'app.js', type: 'file' },
];

const Sidebar = () => {
  return (
    <div className="w-64 bg-editor-sidebar border-r border-editor-border">
      <div className="p-2 text-sm text-editor-text">
        <h2 className="px-4 py-2 uppercase text-xs font-semibold">Explorer</h2>
        <div className="space-y-1">
          {files.map((item) => (
            <div key={item.name}>
              <div className="flex items-center px-4 py-1 hover:bg-editor-hover cursor-pointer rounded">
                {item.type === 'folder' ? (
                  <Folder className="w-4 h-4 mr-2" />
                ) : (
                  <File className="w-4 h-4 mr-2" />
                )}
                {item.name}
              </div>
              {item.type === 'folder' && item.files?.map((file) => (
                <div
                  key={file}
                  className="flex items-center px-8 py-1 hover:bg-editor-hover cursor-pointer rounded"
                >
                  <File className="w-4 h-4 mr-2" />
                  {file}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
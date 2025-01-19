import React from 'react';
import { File, Folder } from 'lucide-react';
import { useCodeStore } from '@/stores/codeStore';

const Sidebar = () => {
  const { files, setCurrentFile, currentFile } = useCodeStore();

  const handleFileClick = (path: string) => {
    setCurrentFile(path);
  };

  return (
    <div className="w-64 bg-editor-sidebar border-r border-editor-border">
      <div className="p-2 text-sm text-editor-text">
        <h2 className="px-4 py-2 uppercase text-xs font-semibold">Explorer</h2>
        <div className="space-y-1">
          {files.map((item) => (
            <div key={item.path}>
              <div 
                className={`flex items-center px-4 py-1 hover:bg-editor-hover cursor-pointer rounded ${
                  currentFile?.path === item.path ? 'bg-editor-hover' : ''
                }`}
                onClick={() => handleFileClick(item.path)}
              >
                {item.type === 'folder' ? (
                  <Folder className="w-4 h-4 mr-2" />
                ) : (
                  <File className="w-4 h-4 mr-2" />
                )}
                {item.name}
              </div>
              {item.type === 'folder' && item.children?.map((child) => (
                <div
                  key={child.path}
                  className={`flex items-center px-8 py-1 hover:bg-editor-hover cursor-pointer rounded ${
                    currentFile?.path === child.path ? 'bg-editor-hover' : ''
                  }`}
                  onClick={() => handleFileClick(child.path)}
                >
                  <File className="w-4 h-4 mr-2" />
                  {child.name}
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
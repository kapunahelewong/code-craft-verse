import React from 'react';
import { File, Settings, GitBranch } from 'lucide-react';

const TopBar = () => {
  return (
    <div className="h-12 bg-editor-bg border-b border-editor-border flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <File className="w-5 h-5 text-editor-text" />
        <GitBranch className="w-5 h-5 text-editor-text" />
      </div>
      <Settings className="w-5 h-5 text-editor-text cursor-pointer hover:text-white transition-colors" />
    </div>
  );
};

export default TopBar;
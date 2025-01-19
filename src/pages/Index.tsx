import React from 'react';
import TopBar from '@/components/CodeEditor/TopBar';
import Sidebar from '@/components/CodeEditor/Sidebar';
import Editor from '@/components/CodeEditor/Editor';

const Index = () => {
  return (
    <div className="h-screen flex flex-col bg-editor-bg text-editor-text">
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <Editor />
      </div>
    </div>
  );
};

export default Index;
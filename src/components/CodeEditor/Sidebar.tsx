import React, { useState } from 'react';
import { File, Folder, Plus, FolderPlus } from 'lucide-react';
import { useCodeStore } from '@/stores/codeStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const Sidebar = () => {
  const { files, setCurrentFile, currentFile, createFile, createFolder } = useCodeStore();
  const [isNewFileDialogOpen, setIsNewFileDialogOpen] = useState(false);
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [selectedParentPath, setSelectedParentPath] = useState<string | undefined>();

  const handleFileClick = (path: string) => {
    setCurrentFile(path);
  };

  const handleCreateFile = () => {
    if (newItemName) {
      createFile(newItemName, selectedParentPath);
      setNewItemName('');
      setIsNewFileDialogOpen(false);
      setSelectedParentPath(undefined);
    }
  };

  const handleCreateFolder = () => {
    if (newItemName) {
      createFolder(newItemName, selectedParentPath);
      setNewItemName('');
      setIsNewFolderDialogOpen(false);
      setSelectedParentPath(undefined);
    }
  };

  const renderFileTree = (items: typeof files, level = 0) => {
    return items.map((item) => (
      <div key={item.path} style={{ marginLeft: `${level * 16}px` }}>
        <div 
          className={`flex items-center px-4 py-1 hover:bg-editor-hover cursor-pointer rounded ${
            currentFile?.path === item.path ? 'bg-editor-hover' : ''
          }`}
          onClick={() => {
            if (item.type === 'file') {
              handleFileClick(item.path);
            }
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            setSelectedParentPath(item.type === 'folder' ? item.path : undefined);
          }}
        >
          {item.type === 'folder' ? (
            <Folder className="w-4 h-4 mr-2" />
          ) : (
            <File className="w-4 h-4 mr-2" />
          )}
          {item.name}
        </div>
        {item.children && renderFileTree(item.children, level + 1)}
      </div>
    ));
  };

  return (
    <div className="w-64 bg-editor-sidebar border-r border-editor-border">
      <div className="p-2 text-sm text-editor-text">
        <div className="flex justify-between items-center px-4 py-2">
          <h2 className="uppercase text-xs font-semibold">Explorer</h2>
          <div className="flex gap-1">
            <Dialog open={isNewFileDialogOpen} onOpenChange={setIsNewFileDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Plus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New File</DialogTitle>
                </DialogHeader>
                <Input
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="Enter file name"
                  className="mt-4"
                />
                <Button onClick={handleCreateFile} className="mt-4">
                  Create File
                </Button>
              </DialogContent>
            </Dialog>
            
            <Dialog open={isNewFolderDialogOpen} onOpenChange={setIsNewFolderDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <FolderPlus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Folder</DialogTitle>
                </DialogHeader>
                <Input
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="Enter folder name"
                  className="mt-4"
                />
                <Button onClick={handleCreateFolder} className="mt-4">
                  Create Folder
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="space-y-1">
          {renderFileTree(files)}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
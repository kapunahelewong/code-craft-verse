import { create } from 'zustand';

interface FileItem {
  name: string;
  path: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileItem[];
}

interface CodeStore {
  files: FileItem[];
  currentFile: FileItem | null;
  setCurrentFile: (path: string) => void;
  updateFileContent: (path: string, content: string) => void;
}

const initialFiles: FileItem[] = [
  {
    name: 'index.html',
    path: '/index.html',
    type: 'file',
    content: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>My App</title>\n  </head>\n  <body>\n    <div id="root"></div>\n  </body>\n</html>'
  },
  {
    name: 'styles',
    path: '/styles',
    type: 'folder',
    children: [
      {
        name: 'main.css',
        path: '/styles/main.css',
        type: 'file',
        content: 'body {\n  margin: 0;\n  padding: 0;\n  font-family: sans-serif;\n}'
      },
      {
        name: 'utils.css',
        path: '/styles/utils.css',
        type: 'file',
        content: '.container {\n  max-width: 1200px;\n  margin: 0 auto;\n}'
      }
    ]
  },
  {
    name: 'app.js',
    path: '/app.js',
    type: 'file',
    content: 'function greeting(name) {\n  return `Hello, ${name}!`;\n}\n\nconst message = greeting("World");\nconsole.log(message);'
  }
];

export const useCodeStore = create<CodeStore>((set, get) => ({
  files: initialFiles,
  currentFile: null,
  setCurrentFile: (path) => {
    const findFile = (items: FileItem[]): FileItem | null => {
      for (const item of items) {
        if (item.path === path) return item;
        if (item.children) {
          const found = findFile(item.children);
          if (found) return found;
        }
      }
      return null;
    };
    
    const file = findFile(get().files);
    if (file && file.type === 'file') {
      set({ currentFile: file });
    }
  },
  updateFileContent: (path, content) => {
    set((state) => {
      const updateFileInArray = (items: FileItem[]): FileItem[] => {
        return items.map((item) => {
          if (item.path === path) {
            return { ...item, content };
          }
          if (item.children) {
            return {
              ...item,
              children: updateFileInArray(item.children),
            };
          }
          return item;
        });
      };

      const newFiles = updateFileInArray(state.files);
      const newCurrentFile = state.currentFile?.path === path
        ? { ...state.currentFile, content }
        : state.currentFile;

      return {
        files: newFiles,
        currentFile: newCurrentFile,
      };
    });
  },
}));
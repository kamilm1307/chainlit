import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      // To prevent conflicts with packages in @chainlit/components, we need to specify the resolution paths for these dependencies.
      react: path.resolve(__dirname, './node_modules/react'),
      '@mui/material': path.resolve(__dirname, './node_modules/@mui/material'),
      '@mui/icons-material': path.resolve(
        __dirname,
        './node_modules/@mui/icons-material'
      ),
      '@emotion/react': path.resolve(__dirname, './node_modules/@emotion/react')
    }
  }
});

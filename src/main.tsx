import React from 'react';
import ReactDOM from 'react-dom/client';
import { Center, ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';

import { router } from './router';

const root: HTMLElement = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ChakraProvider>
      <Center w="100vw" h="100vh" p="10rem" style={{ overflowY: 'scroll' }}>
        <RouterProvider router={router} />
      </Center>
    </ChakraProvider>
  </React.StrictMode>,
);

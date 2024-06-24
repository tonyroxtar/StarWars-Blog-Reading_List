import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa createRoot en lugar de ReactDOM.render
import App from './App';
import injectContext from './store/appContext';

const AppWithContext = injectContext(App);

const container = document.getElementById('root');
const root = createRoot(container); // Crear una raíz de renderizado
root.render(<AppWithContext />); // Renderiza el componente

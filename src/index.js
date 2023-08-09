import 'react-app-polyfill/ie11';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import Panel from './Panel';


async function init() {
  
  // Create div wrapper
  const body = document.body;

  // create react app
  const app = document.createElement('div');
  app.id = 'side-bar-extension-root';


  const linkElement1 = document.createElement('link');

  linkElement1.rel = 'stylesheet';

  // Set the href attribute to the Google Fonts URL
  linkElement1.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap';

  const linkElement2 = document.createElement('link');

  linkElement2.rel = 'stylesheet';

  // Set the href attribute to the Google Fonts URL
  linkElement2.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@500;600&display=swap';

  // Append the link element to the head of the document
  document.head.appendChild(linkElement1);
  document.head.appendChild(linkElement2);
  body.appendChild(app);

  const root = createRoot(app);
  root.render(
    <MemoryRouter>
      <Panel />
    </MemoryRouter>
  );
}

init();

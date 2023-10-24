import 'react-app-polyfill/ie11';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import Panel from './Panel';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Toaster } from 'react-hot-toast';
import { SkeletonTheme } from 'react-loading-skeleton';

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

  //   const floatingIcon = document.createElement('div');
  //   floatingIcon.id = 'floatingIcon';
  //   floatingIcon.style.cssText = `
  //   width: 50px;
  //   height: 50px;
  //   background-color: blue;
  //   position: fixed;
  //   bottom: 20px;
  //   right: 20px;
  //   z-index:999999999 !important;
  //   cursor: pointer;
  // `;

  // Append the link element to the head of the document
  document.head.appendChild(linkElement1);
  document.head.appendChild(linkElement2);
  // body.appendChild(floatingIcon);
  body.appendChild(app);

  const root = createRoot(app);
  // todo
  chrome.storage.local.get(null, (data) => {
    // console.log(data, 'dasjhdgsj');
    root.render(
      <Provider store={store}>
        <MemoryRouter>
          <Toaster
          // position="bottom-right"
          // toastOptions={{
          //   // Define default options
          //   className: '',
          //   duration: 10000,
          //   style: {
          //     zIndex: 100000,
          //   },

          //   // Default options for specific types
          //   // success: {
          //   //   duration: 3000,
          //   //   theme: {
          //   //     primary: 'green',
          //   //     secondary: 'black',
          //   //   },
          //   // },
          // }}
          />
           <SkeletonTheme baseColor="#F3F4F8" highlightColor="#F9F9FB" borderRadius="2px">
            <Panel local={data} />
          </SkeletonTheme>
        </MemoryRouter>
      </Provider>
    );
  });
}

init();

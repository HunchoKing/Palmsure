// src/app/app.routes.server.ts

import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Define the route with the parameter first
  {
    path: 'services/:id',
    renderMode: RenderMode.Prerender,
    // This function now returns the data in the exact format required by the build process.
    getPrerenderParams: async () => {
      const serviceIds = ['property', 'vehicle', 'business', 'personal'];

      // Transform the array of strings into an array of objects, e.g., [{ id: 'property' }, { id: 'vehicle' }, ...]
      return serviceIds.map(id => ({ id: id }));
    },
  },
  // The wildcard route handles all other static pages
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];

# Palmsure Insurance Brokers - Corporate Website

This repository contains the full source code for the official corporate website for Palmsure Insurance Brokers. The project is built with a modern Angular framework, featuring Server-Side Rendering (SSR) for optimal performance and SEO.

The website has been professionally developed with a focus on user experience, responsiveness across all devices, and a strong commitment to web accessibility (a11y) standards.

---

### Key Features

*   **Modern Framework:** Built with Angular 17+ and TypeScript.
*   **Server-Side Rendering (SSR):** Prerendered static pages for fast load times and excellent search engine visibility.
*   **Fully Responsive Design:** A seamless experience on desktops, tablets, and mobile devices.
*   **Accessibility Compliant (a11y):** Audited for keyboard navigation and screen reader compatibility (NVDA), ensuring the site is usable by everyone.
*   **Interactive UI/UX:** Features engaging animations, interactive elements, and a multi-location Google Maps integration to enhance user experience.
*   **Component-Based Architecture:** A clean, maintainable, and scalable codebase.

---

### Running the Project (For Development)

1.  **Install Dependencies:**
    ```bash
    pnpm install
    ```
    (Or `npm install` if you prefer)

2.  **Run the Development Server:**
    ```bash
    ng serve
    ```
    Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

---

### Building for Production

To create an optimized build that includes both the SSR server bundle and the static prerendered output, run:

```bash
ng build --configuration production
```

If you only need the static site output (for traditional static hosting), build with:

```bash
ng build --configuration production --output-mode static
```

The static files will be generated in `dist/palmsure-corp-v2/browser/`.

---

### Deployment (DigitalOcean App Platform)

The project is configured to deploy as a *Static Site* on DigitalOcean App Platform using the `main` branch.

**Build command:**
```bash
npm install -g pnpm && pnpm install && ng build --configuration production --output-mode static
```

**Output directory:**
```
dist/palmsure-corp-v2/browser
```

Every push to the `main` branch triggers DigitalOcean App Platform to rebuild and redeploy automatically.

If you need to run a manual deployment, you can also execute:
```bash
./deploy-static.sh
```
and then upload the contents of `dist/palmsure-corp-v2/browser/` to your hosting service.

---

### Additional Notes

- The repository previously included a GitHub Action to deploy to Xneelo via FTP. This pipeline has been disabled in favour of DigitalOcean’s automatic deployments.
- A `web.config` file is provided for IIS-based hosting environments (e.g., Xneelo) to ensure Angular routes work correctly. It is not required for DigitalOcean App Platform.
- Footer credit now reads “Developed by coderom.co.za – berrydeep project,” and the portal button in the header links to `berrysure.co.za`.

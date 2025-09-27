# PE1 - Project Exam 1 - NOROFF OCT24

## Project Documentation: E.CO

![E.CO Text Logo](public/assets/img/logo/E-CO.png)

## See full Kanban in GitHub [projects](https://github.com/users/larstp/projects/8)

### Contents:

[1. Project Overview](#1-project-overview)

- [Project Links](#project-links)
- [Figma Links](#figma-prototypes)

[2. Setup & Installation](#2-setup--installation)

[3. Admin User & Registering your own](#3-admin-user-and-registering-your-own)

- [Admin User](#admin-user)
- [Create User](#creating-your-own-user)

[4. Technologies Used](#4-technologies-used)

[5. Folder Structure](#5-folder-structure)

[6. Features](#6-features)

[7. API Usage](#7-api-usage)

[8. Accessibility and SEO](#8-accessibility--seo)

[9. Known Issues & Limitations](#9-known-issues--limitations)

[10. Credits](#10-credits)

[11. Inspiration](#11-inspiration)

[12. Contact](#12-contact)

---

## 1. Project Overview

E.CO simulates a real responsive, accessible e-commerce web application focused on sustainable and affordable shopping. Users can browse products, view details, register, log in, manage a cart, and complete a mock checkout process.

This page is meant to show my progress in designing and creating a front end product using what we have learned of web design, Figma, HTML, CSS and JavaScript during our first year.

### Brand Story

E-co is a modern, sustainability-focused e-commerce brand founded in 2018 to simplify online shopping by offering a curated selection of high-quality products across electronics, lifestyle, home, and wellness—all in one place. Committed to environmental responsibility, E-co combines data-driven product choices, eco-friendly logistics, and carbon offset initiatives to deliver a seamless, climate-conscious shopping experience for today’s discerning consumers.

See the [brand client profile](docs/brand-client.md) for more details.

### Project Links:

- GitHub Repo: [https://github.com/larstp/larstp.github.io](https://github.com/larstp/larstp.github.io)
- GitHub Project: [https://github.com/users/larstp/projects/8/views/1](https://github.com/users/larstp/projects/8/views/1)
- Live Site (GitHub Pages): [https://larstp.github.io](https://larstp.github.io)

### Figma:

<table>
  <tr>
    <th>Style Guide</th>
    <th>Mobile Prototype</th>
    <th>Desktop Prototype</th>
  </tr>
  <tr>
    <td><a href="https://www.figma.com/proto/iqyOtjJ0QlyAbuGwsgfPdK/Project-Exam-1?node-id=375-15624&t=E74DIbgaMJAGSgOJ-1">View Style Guide</a></td>
    <td><a href="https://www.figma.com/proto/iqyOtjJ0QlyAbuGwsgfPdK/Project-Exam-1?node-id=1-6&t=E74DIbgaMJAGSgOJ-1">View Mobile Prototype</a></td>
    <td><a href="https://www.figma.com/proto/iqyOtjJ0QlyAbuGwsgfPdK/Project-Exam-1?node-id=129-431&t=E74DIbgaMJAGSgOJ-11">View Desktop Prototype</a></td>
  </tr>
</table>

Or visit the entire Figma [Project](https://www.figma.com/design/iqyOtjJ0QlyAbuGwsgfPdK/Project-Exam-1?node-id=0-1&t=E74DIbgaMJAGSgOJ-1)
###Password: PE1

You can also see screenshots of every design page located in the [Figma](docs\figma) folder

## 2. Setup & Installation

- Clone repo and open `index.html` in your browser using Live Server or NPM, or visit the deployed site: [larstp.github.io](https://larstp.github.io) (available until exam is graded)
- No build steps required; all code is static and client-side.

## 3. Admin User and Registering Your Own

### Admin User:

<table>
  <tr>
    <th>E-Mail</th>
    <th>Username</th>
    <th>Password</th>
  </tr>
  <tr>
    <td>eco-admin@stud.noroff.no</td>
    <td>eco_admin</td>
    <td>Password123</td>
  </tr>
</table>

### Creating your own user:

<table>
  <tr>
    <th>E-Mail</th>
    <th>Username</th>
    <th>Password</th>
  </tr>
  <tr>
    <td>Email does not need to be real. Must end in @stud.noroff.no</td>
    <td>Make your own username. Username can only contain letters, numbers, and underscores!</td>
    <td>Password must contain 8 characters or more.</td>
  </tr>
</table>

## 4. Technologies Used

- HTML5, CSS3 (no frameworks)
- JavaScript (ES6 modules, no frameworks)
- Figma (design & style guide)
- GitHub Projects (planning)
- NOROFF E-commerce API (online-shop)

## 5. Folder Structure

- `/public/` — Static assets (images, icons, etc.)
- `/src/` — Source code
  - `/css/` — Stylesheets
  - `/script/` — JavaScript modules
  - `/pages/` — HTML pages
  - `/components/` — JSON files for mockup storage
- `/docs/` — Documentation, Figma- and assignment files

## 6. Features

- Product feed with carousel and grid
- Product detail page with shareable link
- User registration and login (with validation)
- Cart management (add, remove, adjust quantity)
- Checkout flow (address, shipping, payment selection)
- Success/confirmation page
- Responsive design for desktop and mobile
- Accessibility features (labels, contrast, keyboard navigation)
- SEO meta tags and semantic HTML
- Loader overlay for async actions
- Wishlist is working (mocked)

## 7. API Usage

- Fetches product data from the NOROFF online-store API
- Uses endpoints for registration and login

## 8. Accessibility & SEO

- All forms have labels and validation feedback
- Visually hidden labels for screen readers
- Sufficient color contrast and focus states
- Semantic HTML structure
- Meta tags for SEO and social sharing
- Error handling

See screenshots of validation-tools used in the [validation](docs/validation) folder

## 9. Known Issues / Limitations

- Checkout/payment is a mockup (no real transactions)
- No persistent user address/payment storage (mocked in localStorage or JSON)
- Some features (e.g., wishlist, colour filters) are non-functional or for demo only
- The "Wishlist", "About" and "Contact" page is hastily added to not have empty links in the header, and should not be considered a real part of the overall design.

## 10. Credits

- Icons: [Iconify](https://iconify.design) License: MIT. No attribution required. Commercial use is allowed
- Stars: [W3.org](http://www.w3.org/2000/svg)
- Images: [Unsplash](https://unsplash.com) and [Pixabay](https://pixabay.com). Free to use under the [Unsplash License](https://unsplash.com/license) and Free for use under the [Pixabay Content License](https://pixabay.com/service/license-summary/)
  - [clean-living.webp](https://unsplash.com/photos/a-bottle-of-cleaner-next-to-a-yellow-towel--OsOqpGXku0)
  - [summer-sale.webp](https://pixabay.com/no/photos/g%C3%A5-p%C3%A5-sk%C3%B8yter-rullebrett-7403432/)
  - [newsletter.webp](https://unsplash.com/photos/woman-in-yellow-tracksuit-standing-on-basketball-court-side-nimElTcTNyY)
  - [technology.webp](https://unsplash.com/photos/black-jbl-corded-headphones-on-white-panel-cDrIiiptFqE)
  - [fashion.webp](https://unsplash.com/photos/a-pair-of-black-shoes-hanging-on-a-wall-zadrrJWgUDQ)
  - [cleaning.webp](https://unsplash.com/photos/a-bottle-of-cleaner-next-to-a-yellow-towel--OsOqpGXku0)
- Loader CSS: [Pure CSS Loaders - loading.io](https://loading.io/css/)
- Only other code resource I've used is help from [GitHub Copilot](https://github.com/features/copilot) (AI coding assistant) for code suggestions and explanations.

## 11. Inspiration

- Design: The majority of the inspiration for my websites design comes from [this](https://chop-co.netlify.app) netlify example page. I really liked the layout of the product page, and the simple yet stylish design of the landing page. I did not, however, like the animations as much. They became too... much, so you'll se little of that in my design.

## 12. Contact

- Author: [larstp](https://github.com/larstp)

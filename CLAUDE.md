# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bakery party app for managing cake topper orders and audio captures. Built on Angular 21 using the Inspinia v5.0 StarterKit boilerplate. All Angular application code lives in `angular-frontend/`. The `boilerplate-template/` directory is a reference copy — do not modify it.

## Commands (run from `angular-frontend/`)

```bash
# Install dependencies (use npm, not bun)
npm install

# Dev server (http://localhost:4200)
ng serve

# Production build
ng build

# Run all tests (Karma + Jasmine)
ng test

# Run a single test file
ng test --include src/app/path/to/file.spec.ts
```

## Architecture

**Angular 21 with zoneless change detection** (`provideZonelessChangeDetection()`). All state is managed via Angular `signal()`. No NgModules — standalone components only.

**Working directory:** `angular-frontend/src/app/`

**Path aliases** (`tsconfig.json`):
- `@core/*` → `src/app/core/*`
- `@layouts/*` → `src/app/layouts/*`
- `@app/components/*` → `src/app/components/*`
- `@/*` → `src/*`

### Routing

All protected views are lazy-loaded children of the root `MainLayout` route, guarded by `[AuthGuard, LayoutService]`. Auth/error pages are outside `MainLayout` and unguarded. Add new feature routes as children of the `MainLayout` block in `app.routes.ts`.

### Layout system

`LayoutService` (`core/services/layout.service.ts`) manages all visual state — theme, skin, sidenav size/color, topbar color, orientation, RTL/LTR, monochrome — via a single `signal<LayoutState>`. State persists to `sessionStorage` under `__THEME_CONFIG__` and is applied as `data-*` attributes on `<html>`. It also doubles as `CanActivate` to reload layout state on navigation.

`MainLayout` delegates to `VerticalLayout` or `HorizontalLayout` based on `LayoutService.orientation`. Shell pieces (sidenav, topbar, navbar, footer, customizer offcanvas) live in `layouts/components/`.

**Nav menu** is defined in `layouts/components/data.ts` as a `MenuItemType[]` array. Labels are i18n keys (e.g. `'nav.dashboard'`). Add menu sections there when building new features.

### i18n

`@ngx-translate/core` v18 configured in `app.config.ts` via `provideTranslateService`. Translation files: `src/assets/i18n/en.json` and `es.json`. Use `TranslatePipe` in templates. Status values are stored as English canonical strings; use the `statusKey()` helper to convert them to i18n lookup keys (e.g. `'In Design'` → `'status.In_Design'`).

### Auth

`AuthService` is a stub with hardcoded credentials (`admin@example.com` / `password`) and a `sessionStorage` token. Replace before any production use.

### CakeToppers feature

`CakeToppersService` (`views/cake-toppers/cake-toppers.service.ts`, `providedIn: 'root'`) is the single source of truth for:
- `captures` — `signal<AudioCapture[]>`: voice capture history with transcript and processing status
- `orders` — `signal<CakeToppersOrder[]>`: topper orders with client, theme, price, delivery, and payment info

`processCapture(id)` transitions a capture from `'Audio Captured'` to `'Processed'` and creates a new `'Confirmed'` order. All data is currently hardcoded in-memory (resets on reload).

Routes: `/cake-toppers/quick-capture` and `/cake-toppers/orders` are sibling child routes sharing service state.

## Key Libraries

| Library | Use |
|---------|-----|
| `@ng-bootstrap/ng-bootstrap` | Modals, offcanvas, dropdowns, tooltips |
| `ngx-echarts` | Charts |
| `angularx-flatpickr` | Date/time pickers |
| `ngx-daterangepicker-bootstrap` | Date range picker |
| `simplebar-angular` | Custom scrollbars |
| `iconify-icon` | Icon system |
| `@ngx-translate/core` + `http-loader` | i18n (EN/ES) |

## SCSS

Custom variables: `src/assets/scss/_variables.scss` (light) and `_variables-dark.scss`. Theme skin variants live in `src/assets/scss/config/`. Do not edit files under `src/assets/scss/bootstrap/`.

## dotnet-backend/

ASP.NET Core 10 Web API solution (`BakeryParty.slnx`). Project: `BakeryParty.Api`.

```bash
# Run from dotnet-backend/BakeryParty.Api/
dotnet run

# Run tests (from solution root)
dotnet test
```

## work-plans/

Reserved for implementation planning documents (WP_001, WP_002, …).

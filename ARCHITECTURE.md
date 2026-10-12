# ARCHITECTURE: IndiNiger BizHub — Global Business Marketplace

## System Architecture

```
                               ┌──────────────────────────────────────────────┐
                               │           Next.js 16 App Router              │
                               │      (TypeScript + React 19 + Tailwind)      │
                               └──────────────────────┬───────────────────────┘
                                                      │
         ┌──────────────────┬─────────────────────────┼─────────────────────────┬──────────────────┐
         │                  │                         │                         │                  │
         ▼                  ▼                         ▼                         ▼                  ▼
    ┌──────────┐      ┌────────────┐            ┌───────────┐             ┌───────────┐      ┌───────────┐
    │  Header  │      │ 7 Core     │            │ Data      │             │  Client   │      │  Global   │
    │ & Sticky │      │ Routes     │            │ Providers │             │  Modals   │      │  Footer   │
    │  Nav     │      │ (A - N)    │            │ (17+ Cat, │             │ (Enquiry, │      │ & Legal   │
    └──────────┘      └────────────┘            │ 57 Cntry, │             │ Details,  │      └───────────┘
                            │                   │ Businesses│             │ Demo Box) │
                            ▼                   └───────────┘             └───────────┘
               ┌───────────────────────────┐          │
               │   Demo Persistence Layer  │◄─────────┘
               │ (LocalStorage Lead Hub    │
               │  + Toast Feedback)        │
               └───────────────────────────┘
```

## Route Map
- `/` - Master Homepage (Sections A to N: Announcement, Nav, Hero, 4 Highlights, 17+ Categories, Global Network, Buy/Sell/Trade/Connect/Grow, Industries We Serve, Events Showcase, How It Works, About Snippet, Partnership CTA, Contact Form, Footer)
- `/industries` - Searchable, filterable directory of business sectors with stats & drilldown
- `/directory` - Global business directory with multi-faceted search (Keyword, Industry, Country), verified business profile cards, and enquiry action
- `/global-network` - 57-country international trade directory, regional filters, country trade dossier modal
- `/events` - International exhibitions, B2B trade expos, event details & booth enquiry
- `/about` - Corporate overview, founder Kumud Gameti bio, vision roadmap (62 categories / 57 countries)
- `/contact` - Business partnership enquiry form, corporate contact coordinates, live demo submission reviewer drawer

## State & Data Flow
1. **Mock Structured Data**: Kept in modular TypeScript files with strict typing (`Category`, `Business`, `Country`, `EventItem`).
2. **Interactive Filtering**: Client-side memoized search and multi-select filtering for zero-latency instant feedback.
3. **Form Handling & Persistence**: Clean client-side form validation with stateful submission feedback and LocalStorage persistence in `indiniger_enquiries` and `indiniger_leads`.
4. **Client Feedback**: Realtime toast notifications + floating Demo Inquiries Drawer allowing the user to view all their test submissions.

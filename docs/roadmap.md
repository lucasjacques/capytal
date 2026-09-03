# Capytal Roadmap

This roadmap defines the planned evolution of Capytal, from its
engineering foundation phase to future product expansions.

The roadmap may evolve as the project grows.

---

# Phase 0 — Engineering Foundation

Goal:
Establish the technical foundation of the platform while showcasing
software engineering and QA practices.

## Objectives

- Create initial project architecture
- Configure development environment
- Establish testing strategy
- Implement authentication flow
- Configure CI/CD workflows
- Prepare scalable project structure

## Planned Features

### Infrastructure

- [x] Next.js project setup
- [x] PostgreSQL + Drizzle configuration
- [x] Environment configuration
- [x] Vercel deployment setup

### Authentication

- [x] User registration
- [x] Login/logout flow
- [x] Session management
- [x] Protected routes

### QA & Testing

- [x] Unit testing setup
- [x] Integration testing setup
- [x] End-to-end testing setup
- [x] CI testing pipeline
- [x] Linting and formatting rules

### Frontend Foundation

- [x] UI component structure
- [x] Layout system
- [x] Theme setup
- [x] Responsive base design

---

## Scope Additions

- [x] Test plan document
- [x] Auth login flow test cases
- [x] Auth register flow test cases
- [x] Auth sign-out flow test cases
- [x] Auth error handling (wrong email, wrong password)
- [x] Password confirmation field on register
- [ ] README polish
- [ ] Public launch

---

# Backlog

Small improvements with no committed timeline — polish items that are nice-to-have but don't block any phase.

- [ ] Inline password confirmation validation on register (real-time, without requiring form submit)
- [ ] Show/hide toggle on password fields (login and register)
- [ ] Logo click redirects to home page
- [ ] Register page: add "Already have an account? Login" link (mirrors login page's "Don't have an account? Register")
- [ ] Test coverage tracking script — scan `docs/tests/**` for `Coverage:` status markers and report percentage of covered vs uncovered test cases
- [ ] Test coverage by area — extend the script with `Area:` tags per test case to map QA effort across app features and identify under-tested critical areas
- [ ] Logo: add "Capytal" text to the logo image for better brand recognition in the README
- [ ] Add `test:all` script to package.json running unit + integration + E2E in sequence for local pre-PR validation

---

# Phase 1 — MVP

Goal:
Deliver the first functional version of Capytal focused on investment
wallet management and allocation tracking.

## Objectives

- Allow users to create investment wallets
- Manage holdings and assets
- Visualize allocation distribution
- Calculate buy targets
- Support long-term investment tracking

## Planned Features

### Wallet Management

- [ ] Create wallet
- [ ] Edit wallet
- [ ] Delete wallet
- [ ] Wallet overview page

### Asset Management

- [ ] Add asset to wallet
- [ ] Edit holdings
- [ ] Remove holdings
- [ ] Asset quantity tracking

### Allocation & Insights

- [ ] Allocation visualization
- [ ] Percentage distribution
- [ ] Buy target calculations
- [ ] Investment summary

### Supported Assets

- [ ] Stocks
- [ ] REITs

---

# Phase 2 — Product Expansion

Goal:
Expand Capytal with analytics, automation and advanced investment tools.

## Potential Features

### Analytics

- [ ] Performance tracking
- [ ] Historical charts
- [ ] Profit/loss visualization
- [ ] Dividend tracking

### Automation

- [ ] Broker integrations
- [ ] Automatic asset sync
- [ ] Import/export tools

### User Experience

- [ ] Advanced dashboard
- [ ] Custom themes
- [ ] Mobile optimization
- [ ] Notification system

### Intelligence Features

- [ ] Allocation suggestions
- [ ] Rebalancing recommendations
- [ ] AI-assisted insights

---

# Long-Term Vision

Capytal aims to become a modern and accessible investment wallet
management platform focused on helping users organize investments,
understand allocations and make long-term financial decisions more
clearly and confidently.

## Infrastructure Evolution

As the platform scales, the current Vercel + Neon architecture may be
replaced by self-hosted infrastructure to reduce costs and increase
control:

- [ ] Kubernetes orchestration for app and database workloads
- [ ] Self-hosted PostgreSQL with managed backups
- [ ] CI/CD pipeline targeting a self-hosted cluster

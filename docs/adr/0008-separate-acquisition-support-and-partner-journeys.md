# ADR 0008 — Separate prospect, customer-support and partner journeys

- **Status:** Accepted
- **Date:** 2026-08-08

## Context

Prospects, existing customers and partners arrive with different intent. Mixing product marketing, manuals, license renewal, downloads and partner resources in the same primary navigation increases cognitive load and makes each audience work harder.

## Decision

The site has three distinct experience layers.

### 1. Public acquisition

Primary journey for prospects:

`Solutions -> Applications -> Products / Customer Stories / Knowledge -> Contact or Demo`

### 2. Existing-customer support

Task-oriented support area containing or eventually connecting:

- support contact/tickets;
- manuals;
- downloads;
- release notes;
- licenses;
- technical requirements.

Support pages must optimize task completion rather than cross-selling.

### 3. Partner Area

A dedicated partner experience is planned. In the current prototype it is a mockup only. Future capabilities may include authenticated access to documents, sales material, technical resources, price information, training or partner-specific support.

The mock must not pretend that authentication or protected data is already implemented.

## Consequences

Navigation becomes simpler and audience intent becomes clearer. Future authentication can be introduced behind Support/Partner boundaries without restructuring the public acquisition site.

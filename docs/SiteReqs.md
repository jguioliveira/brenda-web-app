# Brenda Mello — Frontend Developer Handoff

A content and structure specification for building the Brenda Mello website. This document defines page structure, section order, headings, CTAs, reusable components, and implementation notes. No code is included.

**Brand:** Brenda Mello — Makeup & Hair Artist (6+ years), specializing in weddings, events, and graduation.  
**Voice/tone:** Premium but approachable; warm, personal, confidence-building.  
**Audience:** Brides, event clients, and graduates seeking professional makeup and hair.

---

## 1. Site Map & Navigation

### Page hierarchy

- **Home** `/`

  - **About** `/about/`

  - **Services** `/services/`

    - Weddings `/services/weddings/`
    - Events `/services/events/`
    - Graduation `/services/graduation/`

  - **Portfolio** `/portfolio/`

  - **Contact** `/contact/`

### Primary navigation (header)

| Order | Label      | Type          | Links to                |
| ----- | ---------- | ------------- | ----------------------- |
| 1     | Home       | Link          | `/`                     |
| 2     | About      | Link          | `/about/`               |
| 3     | Services   | Dropdown      | `/services/`            |
| 3a    | Weddings   | Dropdown item | `/services/weddings/`   |
| 3b    | Events     | Dropdown item | `/services/events/`     |
| 3c    | Graduation | Dropdown item | `/services/graduation/` |
| 4     | Portfolio  | Link          | `/portfolio/`           |
| 5     | Contact    | Link          | `/contact/`             |

**Notes**

- Keep five top-level items; nest Weddings/Events/Graduation under the Services dropdown.
- Add a persistent header CTA button: **Book Now** → `/contact/`.
- Logo (top-left) links to `/`.

### Footer navigation

- Column 1 — Pages: Home, About, Services, Portfolio, Contact
- Column 2 — Services: Weddings, Events, Graduation
- Column 3 — Contact: email, phone, social links (Instagram primary)
- Footer bottom: copyright line, e.g., `© {{current_year}} Brenda Mello`

---

## 2. Page-by-Page Structure

Each page below lists its section order, section headings, purpose notes, and CTAs. Content copy already exists in separate page assets; this spec defines placement and structure for build.

### 2.1 Home — `/`

| Order | Section           | Purpose                                                | Notes                                           |
| ----- | ----------------- | ------------------------------------------------------ | ----------------------------------------------- |
| 1     | Hero              | First impression; headline + subheadline + primary CTA | Full-width background image, single primary CTA |
| 2     | Welcome / Intro   | Short personal intro from Brenda                       | Optional portrait image, left or right aligned  |
| 3     | Services Overview | Preview the 3 core services                            | Use **Service Card** component (×3)             |
| 4     | Why Choose Brenda | Trust-building bullets                                 | 3–5 short value points                          |
| 5     | Portfolio Teaser  | Visual proof; preview gallery                          | 4–6 images, link to `/portfolio/`               |
| 6     | Testimonials      | Social proof                                           | Use **Testimonial Block** component             |
| 7     | Closing CTA       | Drive booking/inquiry                                  | Use **Inquiry CTA Section** component           |

**CTAs:**  
Hero → `Book Your Appointment`; Services cards → `Learn More`; Portfolio teaser → `View Portfolio`; Closing → `Book a Service`.

---

### 2.2 About — `/about/`

| Order | Section                     | Purpose                          | Notes                                   |
| ----- | --------------------------- | -------------------------------- | --------------------------------------- |
| 1     | Page Header                 | Set context                      | H1 + supporting line, optional portrait |
| 2     | Brand Story                 | Connect through Brenda's journey | Body copy, single column                |
| 3     | Experience & Specialization | Establish credibility            | Body copy; may include a stat/highlight |
| 4     | Philosophy                  | Communicate values and approach  | Body copy                               |
| 5     | Closing CTA                 | Invite booking                   | Use **Inquiry CTA Section** component   |

**CTAs:**  
Closing → `Book a Service` and `Send an Inquiry`.

---

### 2.3 Services — `/services/` (parent/overview)

| Order | Section             | Purpose                     | Notes                                 |
| ----- | ------------------- | --------------------------- | ------------------------------------- |
| 1     | Page Header         | Introduce service range     | H1 + short intro                      |
| 2     | Services Grid       | Route to 3 service pages    | Use **Service Card** component (×3)   |
| 3     | Custom Inquiry Note | Catch non-standard requests | Short line + inquiry link             |
| 4     | Closing CTA         | Drive action                | Use **Inquiry CTA Section** component |

**CTAs:**  
Each card → `Learn More`; Closing → `Book a Service` and `Send an Inquiry`.

---

### 2.4 Weddings — `/services/weddings/`

| Order | Section            | Purpose                        | Notes                                 |
| ----- | ------------------ | ------------------------------ | ------------------------------------- |
| 1     | Page Header        | Service-specific hero          | H1 + intro line, supporting image     |
| 2     | The Experience     | Describe the bridal experience | Body copy                             |
| 3     | What's Included    | Set expectations               | Bulleted list                         |
| 4     | Why Choose Brenda  | Service-specific credibility   | Body copy                             |
| 5     | Gallery (optional) | Wedding-specific visuals       | Use **Gallery Grid** component        |
| 6     | Closing CTA        | Convert to inquiry             | Use **Inquiry CTA Section** component |

**CTAs:**  
Closing → `Book Your Bridal Consultation` and `Send an Inquiry`.

---

### 2.5 Events — `/services/events/`

| Order | Section            | Purpose                       | Notes                                 |
| ----- | ------------------ | ----------------------------- | ------------------------------------- |
| 1     | Page Header        | Service-specific hero         | H1 + intro line, supporting image     |
| 2     | The Experience     | Describe the event experience | Body copy                             |
| 3     | What to Expect     | Set expectations              | Bulleted list                         |
| 4     | Why Choose Brenda  | Service-specific credibility  | Body copy                             |
| 5     | Gallery (optional) | Event-specific visuals        | Use **Gallery Grid** component        |
| 6     | Closing CTA        | Convert to inquiry            | Use **Inquiry CTA Section** component |

**CTAs:**  
Closing → `Book a Service` and `Send an Inquiry`.

---

### 2.6 Graduation — `/services/graduation/`

| Order | Section            | Purpose                            | Notes                                 |
| ----- | ------------------ | ---------------------------------- | ------------------------------------- |
| 1     | Page Header        | Service-specific hero              | H1 + intro line, supporting image     |
| 2     | The Experience     | Describe the graduation experience | Body copy                             |
| 3     | What to Expect     | Set expectations                   | Bulleted list                         |
| 4     | Why Choose Brenda  | Service-specific credibility       | Body copy                             |
| 5     | Gallery (optional) | Graduation-specific visuals        | Use **Gallery Grid** component        |
| 6     | Closing CTA        | Convert to inquiry                 | Use **Inquiry CTA Section** component |

**CTAs:**  
Closing → `Book Your Graduation Look` and `Send an Inquiry`.

---

### 2.7 Portfolio — `/portfolio/`

| Order | Section          | Purpose                      | Notes                                                                           |
| ----- | ---------------- | ---------------------------- | ------------------------------------------------------------------------------- |
| 1     | Page Header      | Introduce the gallery        | H1 + short intro                                                                |
| 2     | Style & Approach | Frame what visitors will see | Body copy + bullets                                                             |
| 3     | Gallery Grid     | Showcase work                | Use **Gallery Grid** component; filter by category (Weddings/Events/Graduation) |
| 4     | Closing CTA      | Convert interest             | Use **Inquiry CTA Section** component                                           |

**CTAs:**  
Closing → `Book a Service` and `Send an Inquiry`.

---

### 2.8 Contact — `/contact/`

| Order | Section           | Purpose                  | Notes                              |
| ----- | ----------------- | ------------------------ | ---------------------------------- |
| 1     | Page Header       | Invite contact           | H1 + short intro line              |
| 2     | Inquiry Form      | Capture leads            | See **Inquiry/Booking Form** notes |
| 3     | How Booking Works | Set process expectations | Numbered steps (1–4)               |
| 4     | What to Include   | Improve inquiry quality  | Bulleted list                      |
| 5     | Reassurance       | Personal-service message | Body copy                          |
| 6     | Closing CTA       | Reinforce action         | Buttons + contact details          |

**CTAs:**  
Primary → `Send an Inquiry` (form submit); secondary → direct email/phone links.

---

## 3. Reusable Components

### 3.1 Service Card

- **Fields:** image, service name (H3), one-line description, link/button.
- **Button label:** `Learn More`.
- **Used on:** Home (Services Overview), Services (grid).
- **Behavior:** entire card clickable; links to the matching service page.
- **Char guidance:** service name ≤ 30 chars; description ≤ 90 chars.

### 3.2 Testimonial Block

- **Fields:** quote text, client name/first name, optional context (e.g., "Bride, 2025"), optional photo.
- **Layout:** single rotating slider or static grid of 2–3.
- **Char guidance:** quote ≤ 220 chars for layout consistency.
- **Fallback:** if no photo, show initials avatar.

### 3.3 Gallery Grid

- **Fields:** image, alt text (required), optional category tag.
- **Layout:** responsive masonry or equal-grid; lightbox on click.
- **Categories:** Weddings, Events, Graduation (for filtering on Portfolio).
- **Notes:** lazy-load images; maintain consistent aspect ratios per row where possible.

### 3.4 Inquiry CTA Section

- **Fields:** short heading, one supporting line, 1–2 buttons.
- **Button labels:** primary `Book a Service`; secondary `Send an Inquiry`.
- **Used on:** all pages as closing section (labels may vary per service page — see page specs).
- **Behavior:** buttons link to `/contact/` (or scroll to form on Contact page).

### 3.5 Inquiry/Booking Form (Contact page)

- **Fields:** Name (required), Email (required), Phone (optional), Service type (dropdown: Weddings / Events / Graduation / Other), Event date (date picker, optional), Location (text), Message (textarea), Submit.
- **Submit label:** `Send Inquiry`.
- **Validation:** required-field checks on Name and Email; valid email format.
- **Success state:** confirmation message after submit (e.g., "Thanks — I'll be in touch soon.").
- **Error state:** inline field-level errors.

---

## 4. CTA Label Reference

| Location           | Primary CTA                   | Secondary CTA   |
| ------------------ | ----------------------------- | --------------- |
| Header (global)    | Book Now                      | —               |
| Home hero          | Book Your Appointment         | —               |
| Service cards      | Learn More                    | —               |
| Portfolio teaser   | View Portfolio                | —               |
| About closing      | Book a Service                | Send an Inquiry |
| Services closing   | Book a Service                | Send an Inquiry |
| Weddings closing   | Book Your Bridal Consultation | Send an Inquiry |
| Events closing     | Book a Service                | Send an Inquiry |
| Graduation closing | Book Your Graduation Look     | Send an Inquiry |
| Portfolio closing  | Book a Service                | Send an Inquiry |
| Contact form       | Send Inquiry                  | —               |

**Rule:** Use sentence-style title case for buttons. Keep button labels ≤ 30 characters.

---

## 5. Implementation Notes

### URL slugs

- Use lowercase, hyphen-separated slugs exactly as listed in Section 1.
- Service pages live under `/services/` as children.
- Avoid trailing inconsistencies — pick one convention (trailing slash recommended) and apply site-wide.

### Portfolio images

- Source images go in the **Gallery Grid** on `/portfolio/`.
- Tag each image by category (Weddings/Events/Graduation) to support filtering.
- Optional service-page galleries pull a filtered subset by category.
- Every image requires descriptive **alt text** (e.g., "Bridal makeup and soft updo").
- Optimize/compress all images; serve responsive sizes.

### Booking forms

- Primary form lives on `/contact/`.
- All `Book a Service` / `Send an Inquiry` / `Book Now` CTAs route to `/contact/` (or anchor to the form).
- Service-page closing CTAs may pass the service type as a pre-filled value into the Contact form dropdown (e.g., `?service=weddings`).

### Global elements

- Header and footer persist across all pages.
- Maintain consistent section spacing and heading hierarchy (one H1 per page).
- Header CTA button (`Book Now`) appears on every page.

### Content formatting rules

- One **H1** per page (the page header).
- Section titles use **H2**; sub-items (e.g., service names in cards) use **H3**.
- Body copy as rich text; bulleted lists allowed where specified.
- Sentence case for headings; consistent US English spelling and punctuation.

---

## 6. Acceptance Checklist

- [ ] All 8 pages built with correct slugs (Section 1).
- [ ] Navigation matches header/footer specs; Services dropdown functions.
- [ ] Global `Book Now` header button present on every page.
- [ ] Each page follows its defined section order (Section 2).
- [ ] One H1 per page; heading hierarchy consistent.
- [ ] Reusable components implemented: Service Card, Testimonial Block, Gallery Grid, Inquiry CTA Section, Inquiry/Booking Form.
- [ ] CTA labels match the reference table (Section 4).
- [ ] Portfolio gallery supports category filtering (Weddings/Events/Graduation).
- [ ] All images have alt text and are optimized.
- [ ] Contact form fields, validation, success, and error states work.
- [ ] Service-page CTAs route to the Contact form (with pre-filled service type where applicable).
- [ ] Spelling, grammar, and US English terminology verified across all copy.

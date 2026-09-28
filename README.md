# DHAI Outpatient X-ray Protocols

A fast, client-side searchable reference for diagnostic radiography (plain film) imaging protocols and exam descriptions across Dignity Health Advanced Imaging (DHAI) centers.

🔗 **Live Tool:** [https://patrickdo.github.io/xrayprotocols/](https://patrickdo.github.io/xrayprotocols/)

---

## Overview

The **DHAI X-ray Protocols** guide provides technologists, medical assistants, and referring providers with quick, unambiguous access to standard radiographic positioning series and acquisition requirements. Each entry pairs the anatomical region and standard exam description with the required views and specific protocol parameters.

---

## Features

- **Instant Search:** Real-time text filtering across anatomical body parts, exam descriptions, and protocol contents powered by [List.js](https://listjs.com/).
- **Sticky Column Headers:** Fixed table header navigation ensures clarity when scrolling through long protocol series.
- **Protocol Quick-Links:** Direct cross-navigation between companion DHAI tools:
  - [Referral Guide](https://patrickdo.github.io/referralbinder/)
  - [Ultrasound Protocols](https://patrickdo.github.io/usprotocols/)
  - [CT & MRI Protocols](https://apps.mrgschedule.com/ctprotocols/)
- **Zero Build Dependencies:** Pure static HTML, vanilla CSS, and JavaScript designed for instant hosting via GitHub Pages.

---

## File Structure

```text
xrayprotocols/
├── index.html          # Main application markup and protocol table structure
├── style.css           # Brand typography, table styling, and compact nav rules
├── script.js           # List.js configuration, data binding, and DOM template removal
├── list.min.js         # Client-side indexing and search library
└── Resources/
    ├── hashtag_icon.png            # Application favicon
    ├── magnifying-glass-128.png    # Input search icon
    └── trade-gothic-lt-std.otf     # Primary font asset
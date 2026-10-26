# Oasis Infobyte Web Development Internship - Task 3
## ThermoCraft Pro - Advanced Temperature Converter & Thermal Gauge

A high-precision temperature conversion web application designed with a visual physical thermometer mercury gauge, real-time algebraic formula explanation, dynamic thermal state themes, unit swapping, validation against physical Absolute Zero, and conversion history logging.

---

### 🌟 Project Highlights
- **Multi-Unit Thermal Engine**: Convert seamlessly between **Celsius (°C)**, **Fahrenheit (°F)**, **Kelvin (K)**, and **Rankine (°R)**.
- **Physical Thermometer Animation**: Interactive mercury column and bulb that dynamically rises, falls, and shifts color according to the converted temperature.
- **Dynamic Thermal States**:
  - ❄️ *Sub-Zero Frigid (< 0°C)*: Ice Blue atmosphere
  - 🍃 *Cool / Chilly (0°C to 18°C)*: Mint Teal atmosphere
  - 🌿 *Room Temperature (18°C to 27°C)*: Emerald Green atmosphere
  - ☀️ *Warm / Summer (27°C to 45°C)*: Amber Orange atmosphere
  - 🔥 *Extreme Heat (> 45°C)*: Radiant Crimson atmosphere
- **Step-by-Step Algebraic Formula Breakdown**: Displays the exact mathematical equation executed for each conversion.
- **Physical Law Validation**: Enforces boundaries against Absolute Zero (-273.15°C / 0 K / -459.67°F) with clear user feedback.
- **Quick Scientific Presets**: One-click inputs for *Absolute Zero*, *Water Freezing*, *Room Temperature*, *Human Body Temperature*, and *Boiling Point*.
- **Recent Conversion History**: Stores the last 6 conversions with timestamps and allows one-click restoration of previous values.
- **Precision Selector**: Switch precision between 0, 1, 2, 3, and 4 decimal places.
- **One-Click Clipboard Copy**: Instantly copy results with feedback toasts.

---

### 📐 Conversion Mathematical Formulas

| From Unit | To Unit | Mathematical Formula |
|---|---|---|
| **Celsius (°C)** | **Fahrenheit (°F)** | $F = (C \times 9/5) + 32$ |
| **Fahrenheit (°F)** | **Celsius (°C)** | $C = (F - 32) \times 5/9$ |
| **Celsius (°C)** | **Kelvin (K)** | $K = C + 273.15$ |
| **Kelvin (K)** | **Celsius (°C)** | $C = K - 273.15$ |
| **Fahrenheit (°F)** | **Kelvin (K)** | $K = (F - 32) \times 5/9 + 273.15$ |
| **Kelvin (K)** | **Fahrenheit (°F)** | $F = (K - 273.15) \times 9/5 + 32$ |
| **Celsius (°C)** | **Rankine (°R)** | $R = (C + 273.15) \times 9/5$ |
| **Rankine (°R)** | **Celsius (°C)** | $C = (R - 491.67) \times 5/9$ |

---

### 📂 Directory Structure

```plaintext
OIBSIP_TASK_3_Temperature_Converter/
├── index.html        # Semantic HTML5 layout with gauge & controls
├── style.css         # Glassmorphic dark styling & thermal variables
├── script.js        # Mathematical conversions, gauge physics, history
└── README.md         # Documentation & mathematical formulas
```

---

### 🛠️ Technologies Used
- **HTML5**: Form controls, accessible labeling, custom selects.
- **CSS3**: Custom properties (`--current-thermal`), Flexbox, CSS Grid, Mercury column keyframe transitions.
- **JavaScript**: ES6+, mathematical precision mapping, clipboard API, array history state, DOM reactive rendering.
- **Typography & Icons**: Google Fonts (*Outfit*, *Plus Jakarta Sans*, *JetBrains Mono*) & Font Awesome 6.

---

### 💻 How to Run
1. Navigate into `OIBSIP_TASK_3_Temperature_Converter`.
2. Open `index.html` in any web browser.
3. Type in any temperature, switch or swap units, click presets, and observe the live mercury column!

---

### 👩‍💻 Author
- **Intern Name**: Dhanashri Vikas Chandane
- **Internship**: Oasis Infobyte Web Development and Designing Internship (OIBSIP)
- **Task**: Task 3 - Temperature Converter

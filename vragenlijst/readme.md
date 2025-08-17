# Expert Lab Herkansing - Interactieve Privacy Installatie

Deze installatie nodigt bezoekers uit om bewust na te denken over hun online privacy. Via een interactieve quiz ontwerpen deelnemers een eigen visual door persoonlijke vragen te beantwoorden. De installatie gebruikt deze antwoorden vervolgens om een rapport te genereren dat inzicht geeft in wat er allemaal over hen bekend is.

---

## Doel

Het doel van deze installatie is bezoekers bewust maken van de onzichtbare digitale sporen die ze dagelijks achterlaten, de impact hiervan op hun privacy, en hoe bedrijven deze gegevens kunnen misbruiken.

---

## Thema

**Online privacy** – bewustwording creëren over persoonlijke gegevens en hun gebruik online.

---

## Technische Analyse

### 1. Webapp

- **Frontend:** Gebouwd met JavaScript, JSX en React.
- **Backend:** Draait op Node.js met WebSocket voor communicatie tussen frontend, TouchDesigner en hardware.

### 2. Visuals

- Gemaakt in **TouchDesigner**.
- Ontvangt gebruikersdata via de backend (WebSocket).
- Output:
  `TouchDesigner NDI Out → NDI Monitor → OBS (met NDI-plugin) → Virtuele webcam → Frontend`.

### 3. Hardware-interactie

- **Arduino** met fysieke knoppen.
- Arduino-code stuurt serial data naar de backend.
- Backend stuurt de data door naar de frontend.

---

## Installatie & Setup

1. **Frontend:**

   ```bash
   npm install
   npm run dev
   ```

2. **Backend:**

   ```bash
   node server.js
   ```

3. **TouchDesigner:**

   - Zorg dat NDI Out actief is.
   - Koppel TouchDesigner aan backend via WebSocket.

4. **OBS:**

   - Gebruik NDI-plugin om de visuals te ontvangen.
   - Activeer virtuele webcam om naar frontend te streamen.

---

## Bronnen & Referenties

Algemene hulp

- [ChatGPT Conversatie 689e06ca-7238-832c-bd47-566a44a4eb89](https://chatgpt.com/c/689e06ca-7238-832c-bd47-566a44a4eb89)
- [ChatGPT Conversatie 6895cf47-f628-832f-8015-2ba6c235f335](https://chatgpt.com/c/6895cf47-f628-832f-8015-2ba6c235f335)

* WebSockets React Tutorial: [Ably](https://ably.com/blog/websockets-react-tutorial)
* getUserMedia API: [MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
* WebSocket & React tutorials:

  - [YouTube 1](https://www.youtube.com/watch?v=1BfCnjr_Vjg)
  - [YouTube 2](https://www.youtube.com/watch?v=ZpfseYy5Hxg)
  - [YouTube 3](https://www.youtube.com/watch?v=GVQ2gXGGREM)
  - [YouTube 4](https://www.youtube.com/watch?v=7fJbYh-9uMI)
  - [YouTube 5](https://www.youtube.com/watch?v=p9mv-u8DhxM)
  - [YouTube 6](https://www.youtube.com/watch?v=UO8jNP7JfSs)
  - [YouTube 7](https://www.youtube.com/watch?v=4Uwq0xB30JE)

* Arduino button debouncing:

  - [Medium article](https://milanachintha.medium.com/understanding-mechanical-push-button-debouncing-with-arduino-example-002d4c3aac1e)
  - [Programming Electronics](https://www.programmingelectronics.com/debouncing-a-button-with-arduino)

---

## Repository

[Expert Lab Herkansing - Infographic branch](https://github.com/TuurVanBergen/Expert-Lab-Herkansing-/tree/feat/infographic)

---

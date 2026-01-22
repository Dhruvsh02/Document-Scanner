# 📄 Document Scanner Pro

A full-stack document scanning web application inspired by **CamScanner**, built using **React + FastAPI + OpenCV**.
It allows users to upload images or PDFs, automatically detects the document, applies **perspective correction**, and shows a **before/after preview** with zoom, pan, cropping, and download support.

## Live Demo
* **Public App URL (Firebase Hosting):**
  👉 *Add after deployment*

* **Test Credentials:**

  ```
  Email: testuser@example.com
  Password: test@123
  ```

---

## Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* pdfjs-dist (PDF first-page preview)
* react-dropzone (drag & drop upload)
* react-easy-crop (client-side crop preview)
* react-zoom-pan-pinch (zoom & pan)
* Firebase Auth (Email/Password)
* Firebase Hosting

### Backend

* FastAPI
* OpenCV (cv2)
* NumPy
* Python 3.11

### Testing

* pytest (unit tests for image processing logic)

All libraries used are **open-source (OSS compliant)**

---

## Architecture Overview

```
┌────────────┐        ┌──────────────┐        ┌─────────────┐
│   Browser  │  --->  │   React App  │  --->  │  FastAPI     │
│            │ Upload │              │ Image  │  Backend     │
└────────────┘        └──────────────┘        └─────────────┘
        │                     │                       │
        │                     ▼                       ▼
        │            PDF → Image (pdf.js)      OpenCV Processing
        │                     │                       │
        │                     ▼                       ▼
        │             Before Preview          Auto-crop & Warp
        │                                             │
        └────────────── After Preview ◀──────────────┘
```

---

## Data Flow

1. User **registers / logs in**
2. Protected route allows access to `/dashboard`
3. User uploads:

   * **Image** → sent to backend
   * **PDF** → first page rendered on frontend
4. Optional **client-side crop preview**
5. Image sent to FastAPI `/scan`
6. Backend:

   * Detects edges
   * Finds 4-point contour
   * Applies perspective transform
7. Processed image returned
8. App shows **side-by-side Before / After**
9. User can **zoom, pan, download**
10. Upload metadata stored locally (and ready for DB extension)

---

## Auto-Crop Algorithm (Backend)

1. Convert image to grayscale
2. Apply Gaussian blur
3. Run Canny edge detection
4. Find contours
5. Select the largest 4-point contour
6. Order points (top-left → bottom-left)
7. Apply perspective warp (`four_point_transform`)
8. Enhance image (CLAHE, denoise, normalize)
9. Return clean scanned image

Fail-safe:

* If no 4-point contour found → original image returned

---

## Features Implemented

### Required

* Email/password authentication
* Upload PNG / JPG / PDF
* PDF → first page preview
* Auto-crop & perspective correction
* Before / After comparison
* Zoom & pan
* Per-user protected routes
* Gallery of previous uploads
* Download processed image
* Error & loading states

### Bonus / Nice-to-Have

* Drag & drop upload
* Client-side crop preview
* Local persistence (localStorage)
* Unit tests for image processing

---

## Unit Tests

### Tested Logic

* `order_points`
* `four_point_transform`

### Run Tests

```bash
cd backend
pip install pytest
pytest
```

---

## Setup Instructions

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Mac/Linux
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs at:

```
http://localhost:8000
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

### Firebase Setup

1. Create Firebase project
2. Enable **Email/Password Auth**
3. Create `firebase.js` in frontend
4. Add Firebase config
5. Deploy hosting

```bash
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

---

## Protected Routes

* `/dashboard` is protected
* Redirects to `/login` if not authenticated
* Auth state handled via `AuthContext`

---

## Persistence

Each upload stores:

* `userId`
* `filename`
* `timestamp`
* `status`
* `beforeImageURL`
* `afterImageURL`

(Currently stored in localStorage; ready for Firestore integration)

---

## Known Trade-offs

* PDF backend processing not enabled (frontend-only preview)
* No cloud storage yet (local URLs)
* Single-document detection only
* No OCR (future scope)

---

## Future Improvements

* Firestore + Firebase Storage integration
* OCR text extraction
* Multi-document detection in one image
* Background job queue
* Mobile optimization
* Advanced edge detection (ML based)

---

## Repository Structure

```
document-scanner/
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── firebase.js
├── backend/
│   ├── main.py
│   ├── utils.py
│   ├── tests/
│   └── requirements.txt
└── README.md
```

---

##  Author

**Dhruv Sharma**
Full-Stack Developer


---


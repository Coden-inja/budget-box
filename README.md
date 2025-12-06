# BudgetBox 📦

**BudgetBox** is an Offline-First personal budgeting application designed to work seamlessly without an internet connection. It prioritizes local data persistence and synchronizes with the server only when network connectivity is available, mimicking the reliability of tools like Google Docs.

## 🚀 Features

* **Local-First Architecture:** Data is saved to `localStorage`/`IndexedDB` immediately. The app works perfectly with 0% internet connectivity.
* **Instant Auto-Save:** Every keystroke is captured and persisted. No "Save" button required.
* **Smart Sync Engine:** Background synchronization handles network flakiness automatically.
    * `Local Only`: Data created while offline.
    * `Sync Pending`: Changes waiting for network.
    * `Synced`: Safe on server.
* **Real-time Analytics:** Auto-calculated Burn Rate, Savings Potential, and Month-End Predictions.
* **Anomaly Detection:** Rule-based warnings for overspending (e.g., "Subscriptions > 30% of income").

## 🛠 Tech Stack

* **Frontend:** Next.js 15 (App Router), React 18, TypeScript
* **State Management:** Zustand (with Persist Middleware for Local-First behavior)
* **Styling:** TailwindCSS
* **Visualization:** Recharts
* **Backend:** Next.js API Routes (Node.js)

## 🏗 Architecture

The application follows a **Local-First** pattern:
1.  **User Input** → Updates Global Store (Zustand) & Persists to Browser Storage immediately.
2.  **UI Layer** → Reflects changes instantly (Zero Latency).
3.  **Sync Engine** → Listens for `online` events and pushes "dirty" state to the Backend API in the background.

## ⚙️ Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/budget-box.git](https://github.com/your-username/budget-box.git)
    cd budget-box
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 How to Test Offline Mode

1.  Open the app and ensure the Sync Status top-right says **"Saved"** or **"Synced"**.
2.  Open Chrome DevTools (`F12`) -> Go to the **Network** tab.
3.  Change the network throttling dropdown from "No throttling" to **"Offline"**.
4.  Edit any budget field (e.g., increase "Food" by $100).
    * *Observation:* The UI updates instantly. The status changes to **"Offline"** or **"Unsaved"**. The data is safe in your browser.
5.  Refresh the page (while still offline).
    * *Observation:* Your changes persist. Data is not lost.
6.  Turn the Network back to **"No throttling"** (Online).
    * *Observation:* The app detects the connection, the status pulses **"Syncing..."**, and finally settles on **"Saved"**.

## 🔑 Demo Login

For review purposes, use the following hardcoded credentials:
* **Email:** `hire-me@anshumat.org`
* **Password:** `HireMe@2025!`

---
*Built for the BudgetBox Frontend/Fullstack Assignment.*
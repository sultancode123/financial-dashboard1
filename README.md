# WealthPro – Financial Dashboard

A responsive financial dashboard built with **Next.js 14, TypeScript, TailwindCSS, and Recharts**.  
This project demonstrates a modern frontend dashboard with charts, mock APIs, PDF export, and dark mode support.  

---

## 🚀 Features

- **Top Navigation Bar** with icons (CRM, Utilities, Insurance, Assets, Mutual, Research, Transact Online, Goal GPS, Financial Planning, Wealth Report, Other).  
- **Two Main KPI Cards**  
  - AUM: Value, MoM % change, and “View Report” button.  
  - SIP: Value, MoM % change, and “View Report” button.  
- **Time Range Filter** (3 Days, 7 Days, 10 Days, 30 Days).  
- **Stat Cards**: Purchases, Redemptions, Rejected Transactions, SIP Rejections, New SIP.  
- **Charts** (powered by Recharts):  
  - Clients Bubble Chart  
  - SIP Business (Bar + Line Combo) Chart  
  - Monthly MIS Multi-line Chart  
- **Responsive Design** → Works across mobile, tablet, and desktop.  
- **Dark Mode Toggle** 🌙  
- **Loading Animations** while fetching data.  
- **Dynamic Filter Buttons** (data reloads on range change).  
- **Export Dashboard to PDF** using `html2canvas` + `jsPDF`.  

---

## 📂 Tech Stack

- **Next.js 14 (App Router)**
- **TypeScript**
- **TailwindCSS**
- **Recharts**
- **Lucide React (Icons)**
- **html2canvas + jsPDF** (PDF export)

---

## 📊 Data

Mock API endpoints are served from JSON files inside `/public/data/`:

- `metrics.json`  
- `stats.json`  
- `clients.json`  
- `sipBusiness.json`  
- `monthlyMis.json`  

The app fetches and filters data dynamically based on the selected time range.

---

## 🛠️ Setup & Run

Clone the repository:

```bash
git clone https://github.com/sultancode123/wealthpro-dashboard.git
cd wealthpro-dashboard

## 📸 Screenshots

### Dashboard – Light Mode
![Dashboard Light](./screenshots/dashboard-light.png)

### Dashboard – Dark Mode
![Dashboard Dark](./screenshots/dashboard-dark.png)

### Dashboard – Mobile View
![Dashboard Mobile](/Users/sultankhot/Documents/financial-dashboard/1.png)
/Users/sultankhot/Documents/financial-dashboard/1.png


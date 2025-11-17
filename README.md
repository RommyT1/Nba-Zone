# NBA Zone 🏀

NBA Zone is a Spring Boot web application that displays NBA player statistics for the **2024–2025 season**.

The app loads data from `nba_stats_utf8.csv`, exposes it through a backend API, and displays it on a simple frontend.  
Right now, the project runs **locally only** — just start the app and visit it in your browser.

---

## Features

- 📊 View NBA player statistics for the 24/25 season  
- 🔍 Search or filter players (depending on your UI)
- ⚙️ Spring Boot backend with:
  - `Player` model  
  - `PlayerController`  
  - `PlayerRepository`  
  - `PlayerService`
- 🌐 Static frontend with:
  - `index.html`
  - `script.js`
  - `styles.css`
- 📁 CSV-based data source: `nba_stats_utf8.csv` from kaggle

---

## Tech Stack

- **Backend:** Java, Spring Boot  
- **Build Tool:** Maven (`pom.xml`, `mvnw`, `mvnw.cmd`)  
- **Frontend:** HTML, CSS, JavaScript  
- **Data:** CSV file  

---

## Getting Started

### Prerequisites

- Java **17+**
- Maven **(optional)** — the Maven Wrapper (`mvnw` / `mvnw.cmd`) is already included  
- A browser  
- Git (only for cloning the repo)

---

## 1. Clone the Repository

git clone https://github.com/RommyT1/Nba-Zone.git

cd Nba-Zone

## 2. Run the Application

The application will start on http://localhost:8080 unless changed in application.properties.

## 3. Usage
Run the app

Open your browser and go to: http://localhost:8080

You will see the NBA Zone interface displaying stats for NBA players in the 2024–2025 season

## Project Structure
css
Copy code
Nba-Zone/
├─ .idea/
├─ .vscode/
├─ .gitattributes
├─ .gitignore
├─ HELP.md
├─ pom.xml
├─ mvnw / mvnw.cmd
├─ nba_stats_utf8.csv
├─ src
│  └─ main
│     ├─ java
│     │  └─ com.n.nba_zone
│     │     ├─ config/
│     │     ├─ player/
│     │     │  ├─ Player.java
│     │     │  ├─ PlayerController.java
│     │     │  ├─ PlayerRepository.java
│     │     │  └─ PlayerService.java
│     │     └─ NbaZoneApplication.java
│     └─ resources
│        ├─ static/
│        │  ├─ index.html
│        │  ├─ script.js
│        │  └─ styles.css
│        ├─ templates/
│        └─ application.properties
└─ src/test/java/com/n/nba_zone
   └─ NbaZoneApplicationTests.java


## Future Improvements (Ideas)

- Deploy the app online (Render, Railway, etc.)

- Add charts or advanced analytics

- Improve UI styling

- Add authentication to save user favorites


# Get Started

This tutorial provides a concise introduction to the **Automatic Case Investigator (ACI)** project, along with detailed setup instructions.

---

## What is ACI?

**ACI (Automatic Case Investigator)** is an on-premise software stack designed to automate common SOC investigation tasks using AI agents. It performs automated investigations in **Security Information and Event Management (SIEM)** systems by:

- Ingesting security case information  
- Generating investigation tasks  
- Performing relevant automated investigations  

The system leverages:

- **LLMs** for generation tasks  
- **Custom classifier models** for security event correlation  

---

## The Problem

A single attacker can trigger a security incident, but incident response often requires **multiple SOC analysts**. Analysts face challenges such as:

- **Information fatigue:** Reviewing large volumes of security logs risks missed evidence and reduces effectiveness  
- **Limited specialization:** Analysts may lack expertise across all areas  
- **High effort:** Correlating security logs is a **labor-intensive** task  

---

## Features

### Investigation Procedures Generation

- Automatically generates investigation plans from security case data  
- Reduces time and effort to structure effective incident responses  

### Automatic Investigation

- Generates SIEM queries from case data  
- Automatically evaluates query results for relevance  
- Helps SOC analysts quickly locate critical logs  
- Serves as a knowledge base, potentially uncovering missed evidence  

---

## Component Overview

### 1. ACI Backend

The main local backend responsible for communicating with the frontend and AI server.  

#### Installation

1. Clone the repository:  
    ```bash
    git clone https://github.com/Automatic-Case-Investigator/ACI_Backend.git
    ```

2. Copy the sample environment file and customize it:  
    ```bash
    cp sample.env .env
    ```

3. Build and run using Docker Compose:  

   **Linux / Mac:**  
    ```bash
    sudo docker compose -f docker-compose.yml build
    sudo docker compose -f docker-compose.yml up
    ```

   **Windows:**  
    ```bash
    sudo docker compose -f docker-compose-windows.yml build
    sudo docker compose -f docker-compose-windows.yml up
    ```

---

### 2. ACI AI Backend

The backend for hosting, managing, and training models.  

#### Installation

1. Clone the repository:  
    ```bash
    git clone https://github.com/Automatic-Case-Investigator/ACI_AI_Backend.git
    ```

2. Copy the sample environment file and customize it:  
    ```bash
    cp sample.env .env
    ```

3. Build and run using Docker Compose:  

   **Linux / Mac:**  
    ```bash
    sudo docker compose -f docker-compose.yml build
    sudo docker compose -f docker-compose.yml up
    ```

   **Windows:**  
    ```bash
    sudo docker compose -f docker-compose-windows.yml build
    sudo docker compose -f docker-compose-windows.yml up
    ```

---

### 3. ACI Dashboard

The frontend for the entire application.  

#### Installation

1. Clone the repository:  
    ```bash
    git clone https://github.com/Automatic-Case-Investigator/ACI_Dashboard.git
    ```

2. Copy the sample environment file and customize it:  
    ```bash
    cp sample.env .env
    ```

3. Install dependencies and run the server:  
    ```bash
    npm install
    npm start
    ```

---

### 4. Docker (Optional)

To build and run all components with Docker:  
```bash
sudo docker compose build
sudo docker compose up

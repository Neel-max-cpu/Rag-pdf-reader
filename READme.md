# ✨ PDF Reader RAG MODEL✨

## Check the video for the brief of the project without running here  -> [Link]() ⭐
## Deployed Link  -> [Link](https://rag-pdf-reader.vercel.app/) ⭐

![Demo App Image 1](/frontend/public/readMeImg/1.png)
![Demo App Image 2](/frontend/public/readMeImg/2.png)
![Demo App Image 3](/frontend/public/readMeImg/3.png)

## Table of Contents
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [How to Run](#how-to-run)



## Technologies Used
- **Frontend**: Nextjs, 
- **Backend**: Python, ChromDB, Docker
- **Styling**: Shadcn, React Hot Toast, and custom Tailwind CSS for responsive design
- **Version Control**: Git & GitHub
- **Hosting**: Vecel & Render
- **Apis/Models**: Google Gemini



## Installation

### Step 1: Clone the Repository
```bash
git clone https://github.com/Neel-max-cpu/Rag-pdf-reader.git
```


### Step 2: Navigate to the Project Directory
Change into the project directory:
```
cd frontend
```

```
cd backend
```

### Step 3: Install Dependencies
Run the following command to install the necessary dependencies for the frontend:
```shell
npm install
```
or 

```shell
npm i
```

Run backend 

- create virtual env
```shell
python -m venv venv
```
- activate it
```shell
venv\Scripts\activate
```

```shell
python -m pip install --upgrade pip setuptools wheel
pip install -r requirements.txt
```

### Step 4: Setup .env file
backend
```js
GEMINI_API_KEY=...

```
frontend
```js
NEXT_PUBLIC_API_URL=...
```

### Usage
After setting up the environment variables, you can start the application.

### Start the app
Run the frontend

```shell
npm run dev
```
Run the backend 
```shell
uvicorn app.main:app --reload
```

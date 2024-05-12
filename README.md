Open 3 terminals.

1st Terminal
cd frontend
npm run dev

2nd Terminal
cd backend
npm run dev

3rd Terminal
cd model
poetry run uvicorn model.main:app --host localhost --port 8000

import uvicorn
import logging
import sys

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler("uvicorn_error.log"),
        logging.StreamHandler(sys.stdout)
    ]
)

if __name__ == "__main__":
    print("Starting uvicorn server...")
    try:
        uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=False)
    except Exception as e:
        logging.exception("Server crashed")

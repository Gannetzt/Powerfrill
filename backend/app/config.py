from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    SECRET_KEY: str = "your-secret-key-keep-it-safe"  # Should be set via env variable in production
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    DATABASE_URL: str = "sqlite:///./powerfill.db"

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()

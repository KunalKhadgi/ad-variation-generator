from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import datetime

# SQLite setup for storing A/B preferences
engine = create_engine('sqlite:///preferences.db', connect_args={'check_same_thread': False})
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class Preference(Base):
    __tablename__ = 'preferences'
    id = Column(Integer, primary_key=True, index=True)
    product = Column(String, index=True)
    prompt_hash = Column(String, index=True)
    selected_index = Column(Integer)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

Base.metadata.create_all(bind=engine)
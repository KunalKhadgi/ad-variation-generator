FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY server.py .
ENV REPLICATE_API_TOKEN="<YOUR_REPLICATE_TOKEN>"
CMD ["python", "server.py"]
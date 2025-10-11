# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
# More specific CORS configuration
CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:3000"])  # React default ports

financial_terms = ["loan", "budget", "investment", "crypto", "tax", "credit", "interest", "debt", "bank", "stock", "stocks"
                   "bond", "dividend", "portfolio", "asset", "liability", "equity", "inflation", "deflation",
                   "recession", "bull market", "bear market", "mutual fund", "ETF", "hedge fund", "derivative", 
                   "futures", "options", "forex", "liquidity", "yield", "capital gain", "net worth", "cash flow", 
                   "amortization"]

@app.route("/api/extract", methods=["POST", "OPTIONS"])
def extract_keywords():
    try:
        # Handle preflight OPTIONS request
        if request.method == "OPTIONS":
            return jsonify({"status": "ok"}), 200
            
        data = request.get_json()
        app.logger.info(f"Received data: {data}")
        
        if not data or "text" not in data:
            return jsonify({"error": "No text provided"}), 400
            
        text = data.get("text", "").lower()
        app.logger.info(f"Processing text: {text}")
        
        detected = [word for word in financial_terms if word in text]
        app.logger.info(f"Detected keywords: {detected}")
        
        response_data = {
            "keywords": detected if detected else ["No financial terms detected"],
            "original_text": text
        }
        
        return jsonify(response_data)
        
    except Exception as e:
        app.logger.error(f"Error in extract_keywords: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy", "message": "Flask server is running"})

if __name__ == "__main__":
    print("Starting Flask server on http://localhost:5001")
    print("Available endpoints:")
    print("  POST /api/extract - Extract financial keywords")
    print("  GET  /health - Health check")
    app.run(host="0.0.0.0", port=5001, debug=True)
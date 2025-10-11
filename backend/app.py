# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from stockgro_api import fetch_tesla_stock_data, search_stocks
import logging
import os

# Configure logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
# More specific CORS configuration
CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:3000"])

financial_terms = ["loan", "budget", "investment", "crypto", "tax", "credit", "interest", "debt", "bank", "stock", "stocks",
                   "bond", "dividend", "portfolio", "asset", "liability", "equity", "inflation", "deflation",
                   "recession", "bull market", "bear market", "mutual fund", "ETF", "hedge fund", "derivative", 
                   "futures", "options", "forex", "liquidity", "yield", "capital gain", "net worth", "cash flow", 
                   "amortization"]

@app.route("/api/extract", methods=["POST", "OPTIONS"])
def extract_keywords():
    try:
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

@app.route("/api/tesla", methods=["GET"])
def get_tesla():
    try:
        app.logger.info("Fetching Tesla stock data...")
        data = fetch_tesla_stock_data()
        app.logger.info(f"Successfully fetched Tesla data: {data}")
        return jsonify(data)
    except Exception as e:
        app.logger.error(f"Error fetching Tesla data: {str(e)}")
        return jsonify({"error": f"Failed to fetch Tesla data: {str(e)}"}), 500

@app.route("/api/stocks/search", methods=["GET"])
def search_stocks_route():
    try:
        search_term = request.args.get('q', '')
        page = request.args.get('page', 1, type=int)
        limit = request.args.get('limit', 50, type=int)
        
        app.logger.info(f"Searching stocks with term: {search_term}")
        data = search_stocks(search_term, page, limit)
        app.logger.info(f"Successfully searched stocks: found {data.get('data', {}).get('count', 0)} results")
        return jsonify(data)
    except Exception as e:
        app.logger.error(f"Error searching stocks: {str(e)}")
        return jsonify({"error": f"Failed to search stocks: {str(e)}"}), 500

@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({
        "status": "healthy", 
        "message": "Flask server is running",
        "stockgro_creds_available": bool(os.getenv("CLIENT_ID") and os.getenv("CLIENT_SECRET"))
    })

if __name__ == "__main__":
    print("Starting Flask server on http://localhost:5001")
    print("Available endpoints:")
    print("  POST /api/extract - Extract financial keywords")
    print("  GET  /api/tesla - Get Tesla stock data")
    print("  GET  /api/stocks/search?q=term - Search stocks")
    print("  GET  /health - Health check")
    app.run(host="0.0.0.0", port=5001, debug=True)
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allows React frontend to call this API

financial_terms = ["loan", "budget", "investment", "crypto", "tax", "credit", "interest", "debt", "bank", "stock",
                     "bond", "dividend", "portfolio", "asset", "liability", "equity", "inflation", "deflation",
                        "recession", "bull market", "bear market", "mutual fund", "ETF", "hedge fund", "derivative", "futures", "options",
                            "forex", "liquidity", "yield", "capital gain", "net worth", "cash flow", "amortization"
                   ]

@app.route("/api/extract", methods=["POST"])
def extract_keywords():
    data = request.get_json()
    text = data.get("text", "").lower()
    detected = [word for word in financial_terms if word in text]
    return jsonify({"keywords": detected if detected else ["No financial terms detected"]})

if __name__ == "__main__":
    app.run(port=5000, debug=True)

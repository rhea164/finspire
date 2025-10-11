# stockgro_api.py
import os
import time
import random
import string
import hmac
import hashlib
import requests
from dotenv import load_dotenv

# Load .env file
env_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(env_path)

def get_stockgro_creds():
    client_id = os.getenv("CLIENT_ID")
    client_secret = os.getenv("CLIENT_SECRET")
    tenant_id = int(os.getenv("TENANT_ID", "3"))
    
    if not client_id or not client_secret:
        raise ValueError("CLIENT_ID and CLIENT_SECRET must be set in .env file")
    
    print(f"Using Client ID: {client_id}")
    print(f"Using Tenant ID: {tenant_id}")
    
    return client_id, client_secret, tenant_id

def generate_nonce():
    # According to docs: Date.now().toString() + random string
    return f"{int(time.time() * 1000)}{''.join(random.choices(string.ascii_lowercase + string.digits, k=9))}"

def get_signature(client_id, client_secret, nonce):
    # According to docs: message = `${clientId}:${nonce}`
    message = f"{client_id}:{nonce}"
    print(f"Signature message: {message}")
    
    # Use HMAC-SHA256
    signature = hmac.new(
        client_secret.encode('utf-8'), 
        message.encode('utf-8'), 
        hashlib.sha256
    ).hexdigest()
    
    print(f"Generated signature: {signature}")
    return signature

def fetch_tesla_stock_data():
    client_id, client_secret, tenant_id = get_stockgro_creds()
    nonce = generate_nonce()
    signature = get_signature(client_id, client_secret, nonce)
    
    headers = {
        "X-Client-Id": client_id,
        "X-Signature": signature,
        "X-Nonce": nonce,
        "Content-Type": "application/json"
    }
    
    # Note: The documentation shows lowercase headers in some examples
    # Let's try both versions to be safe
    headers_lowercase = {
        "x-client-id": client_id,
        "x-signature": signature,
        "x-nonce": nonce,
        "content-type": "application/json"
    }
    
    body = {
        "tenant_id": tenant_id,
        "sections": [
            {
                "type": "stock_info"
            }
        ]
    }
    
    url = "https://prod.stockgro.com/public/api/v1/stock/details/TSLA"
    
    print(f"Making request to: {url}")
    print(f"Body: {body}")
    
    try:
        # Try with lowercase headers first (as shown in curl examples)
        response = requests.post(url, headers=headers_lowercase, json=body, timeout=30)
        print(f"Response status: {response.status_code}")
        
        if response.status_code == 401:
            # If lowercase fails, try with uppercase
            print("Trying with uppercase headers...")
            response = requests.post(url, headers=headers, json=body, timeout=30)
            print(f"Response status (uppercase): {response.status_code}")
        
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"Response status: {e.response.status_code}")
            print(f"Response body: {e.response.text}")
        raise

def search_stocks(search_term="", page=1, limit=50):
    client_id, client_secret, tenant_id = get_stockgro_creds()
    nonce = generate_nonce()
    signature = get_signature(client_id, client_secret, nonce)
    
    headers = {
        "x-client-id": client_id,
        "x-signature": signature,
        "x-nonce": nonce,
        "content-type": "application/json"
    }
    
    params = {
        "tenant_id": tenant_id,
        "page": page,
        "limit": limit
    }
    
    if search_term:
        params["search_param"] = search_term
    
    url = "https://prod.stockgro.com/public/api/v1/stocks/search"
    
    try:
        response = requests.get(url, headers=headers, params=params, timeout=30)
        print(f"Search response status: {response.status_code}")
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Search request error: {e}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"Response status: {e.response.status_code}")
            print(f"Response body: {e.response.text}")
        raise
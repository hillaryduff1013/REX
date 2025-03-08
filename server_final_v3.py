import logging
from flask import Flask, request, jsonify, send_from_directory
import sqlite3
import hashlib

def hash_password(password):
    """Hash a password using SHA-256"""
    return hashlib.sha256(password.encode()).hexdigest()

app = Flask(__name__)

# Initialize the database
def init_db():
    # Database initialization logic here
    pass

@app.route('/api/vendors', methods=['GET'])
def get_vendors():
    try:
        conn = sqlite3.connect('vendor.db')
        c = conn.cursor()
        
        # Dictionary to store vendors by category
        categorized_vendors = {
            "Real Estate Agent": {"recommended": [], "cheapest": [], "general": []},
            "Mortgage Agent": {"recommended": [], "cheapest": [], "general": []},
            "Insurance Agent": {"recommended": [], "cheapest": [], "general": []},
            "Photographer": {"recommended": [], "cheapest": [], "general": []},
            "Property Manager": {"recommended": [], "cheapest": [], "general": []}
        }

        # Process each category
        for category in categorized_vendors.keys():
            # Get vendors for this category, ordered by price
            c.execute('''
                SELECT name, company, price 
                FROM vendors 
                WHERE category = ? 
                ORDER BY price DESC
            ''', (category,))
            
            vendors = c.fetchall()
            if vendors:
                # Most expensive vendor goes to recommended
                categorized_vendors[category]["recommended"].append({
                    "name": vendors[0][0],
                    "company": vendors[0][1],
                    "price": vendors[0][2]
                })
                
                # Cheapest vendor goes to cheapest
                categorized_vendors[category]["cheapest"].append({
                    "name": vendors[-1][0],
                    "company": vendors[-1][1],
                    "price": vendors[-1][2]
                })
                
                # Middle vendors go to general
                for vendor in vendors[1:-1]:
                    categorized_vendors[category]["general"].append({
                        "name": vendor[0],
                        "company": vendor[1],
                        "price": vendor[2]
                    })
        
        return jsonify({"vendors": categorized_vendors}), 200
        
    except Exception as e:
        logging.error('Error fetching vendors: %s', str(e))
        return jsonify({'error': str(e)}), 500
    finally:
        if conn:
            conn.close()

@app.route('/api/customer/login', methods=['POST'])
def customer_login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not all([email, password]):
        return jsonify({'error': 'Missing required fields'}), 400

    hashed_password = hash_password(password)

    try:
        conn = sqlite3.connect('customers.db')
        c = conn.cursor()
        c.execute('SELECT * FROM customers WHERE email = ? AND password = ?', (email, hashed_password))
        user = c.fetchone()
        conn.close()

        if user:
            return jsonify({'message': 'Login successful', 'name': user[3]}), 200
        else:
            return jsonify({'error': 'Invalid credentials'}), 401
    except Exception as e:
        logging.error('Error during customer login: %s', str(e))
        return jsonify({'error': str(e)}), 500

@app.route('/api/vendor/login', methods=['POST'])
def vendor_login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    category = data.get('category')

    if not all([email, password, category]):
        return jsonify({'error': 'Missing required fields'}), 400

    hashed_password = hash_password(password)

    try:
        conn = sqlite3.connect('vendors.db')
        c = conn.cursor()
        c.execute('SELECT * FROM vendors WHERE email = ? AND password = ? AND category = ?', (email, hashed_password, category))
        user = c.fetchone()
        conn.close()

        if user:
            return jsonify({'message': 'Login successful', 'name': user[3], 'company': user[4]}), 200
        else:
            return jsonify({'error': 'Invalid credentials'}), 401
    except Exception as e:
        logging.error('Error during vendor login: %s', str(e))
        return jsonify({'error': str(e)}), 500

@app.route('/')
def root():
    return send_from_directory('', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('', path)

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000)  # Bind to all interfaces

import logging
from flask import Flask, request, jsonify, send_from_directory
import sqlite3

app = Flask(__name__)

# Initialize the database
def init_db():
    # Database initialization logic here
    pass

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
    return send_from_directory('', 'index_final_corrected.html')  # Updated to serve the new file

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('', path)

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=8000)  # Bind to all interfaces

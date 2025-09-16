#!/usr/bin/env python3
"""
Startup script for AgriSmart Backend API
This script installs dependencies and starts the Flask server
"""

import subprocess
import sys
import os

def install_requirements():
    """Install required Python packages"""
    print("Installing Python dependencies...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Dependencies installed successfully!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Error installing dependencies: {e}")
        return False

def start_server():
    """Start the Flask development server"""
    print("Starting AgriSmart Backend API server...")
    print("Server will be available at: http://localhost:5000")
    print("API endpoints:")
    print("  - GET  /health")
    print("  - POST /predict/soil-health")
    print("  - POST /predict/crop-yield")
    print("  - POST /predict/pest-risk")
    print("  - POST /predict/rainfall")
    print("\nPress Ctrl+C to stop the server")
    print("-" * 50)
    
    try:
        # Set environment variables for Flask
        os.environ['FLASK_APP'] = 'app.py'
        os.environ['FLASK_ENV'] = 'development'
        
        # Start the Flask app
        subprocess.run([sys.executable, "app.py"])
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except Exception as e:
        print(f"❌ Error starting server: {e}")

def main():
    """Main startup function"""
    print("🌾 AgriSmart Backend API Startup")
    print("=" * 40)
    
    # Check if we're in the right directory
    if not os.path.exists("app.py"):
        print("❌ Error: app.py not found. Make sure you're in the backend directory.")
        return
    
    if not os.path.exists("requirements.txt"):
        print("❌ Error: requirements.txt not found.")
        return
    
    # Install dependencies
    if install_requirements():
        print("\n" + "=" * 40)
        start_server()
    else:
        print("❌ Failed to install dependencies. Please check the error messages above.")

if __name__ == "__main__":
    main()

#!/bin/bash

# Birthday Website Launcher
echo "🎉 Starting Birthday Website Server..."
echo "💝 Happy Birthday, My Love!"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 found"
    echo "🌐 Starting server on http://localhost:8070"
    echo "📱 Open this URL in your browser"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "----------------------------------------"
    
    # Start the server
    python3 -m http.server 8070
else
    echo "❌ Python 3 not found"
    echo "Please install Python 3 to run this server"
    echo ""
    echo "Alternative: Open index.html directly in your browser"
fi
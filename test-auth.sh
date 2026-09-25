#!/bin/bash

# Target server URL configuration
SERVER_URL="http://localhost:3000"
TOKEN="compass_secret_secure_key_2026"

echo "=================================================="
echo " Starting Token Authentication Verification Loops "
echo "=================================================="
echo ""

# Test 1: Verify the public system status endpoint (No token needed)
echo "[TEST 1] Verifying Public Status Endpoint..."
curl -s -X GET "$SERVER_URL/api/status"
echo -e "\n\n--------------------------------------------------"

# Test 2: Attempt access to the gateway without a token (Should be blocked)
echo "[TEST 2] Verifying Blocked Access (Missing Token)..."
curl -s -X POST "$SERVER_URL/api/gateway" \
  -H "Content-Type: application/json" \
  -d '{"test": "unauthorized"}'
echo -e "\n\n--------------------------------------------------"

# Test 3: Attempt access to the gateway with a valid token (Should pass)
echo "[TEST 3] Verifying Authenticated Access (Valid Token)..."
curl -s -X POST "$SERVER_URL/api/gateway" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"system_command": "verify_pipeline", "payload": "active"}'
echo -e "\n\n--------------------------------------------------"

# Test 4: Verify the direct auth-test endpoint loop check
echo "[TEST 4] Verifying Direct Auth Test Route..."
curl -s -X GET "$SERVER_URL/api/auth-test" \
  -H "Authorization: Bearer $TOKEN"
echo -e "\n\n=================================================="
echo " Authentication Check Complete.                  "
echo "=================================================="

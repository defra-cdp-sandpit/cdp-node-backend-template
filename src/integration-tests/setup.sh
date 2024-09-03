#!/bin/bash

echo "Setting up Integration tests environment"

# Remove any previously generated files
rm mongo/ssl/mongodb*

# Generate a new CA certificate
openssl req -newkey rsa:2048 -new -x509 -days 365 -nodes -out mongodb-cert.crt -keyout mongodb-cert.key \
-subj "/C=UK/ST=STATE/L=CITY/O=ORG_NAME/OU=OU_NAME/CN=mongodb" \
-addext "subjectAltName = DNS:localhost, DNS:mongodb, IP:127.0.0.1"
# CommonName (CN) needs to be the same as the hostname to avoid cert alt name errors

# Create PEM file
cat mongodb-cert.key mongodb-cert.crt > mongodb.pem

# Base64 encode the pem
mongodbTestCaPem="$(cat mongodb.pem | base64)"
export MONGODB_TEST_CA_PEM=$mongodbTestCaPem

# Move the generated keys to the ssl folder
mv mongodb* mongo/ssl/

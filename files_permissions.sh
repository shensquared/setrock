#!/bin/bash

echo "Setting up SetRock server environment..."

# Create necessary directories
mkdir -p /home/setrock/logs
mkdir -p /home/setrock/satosa-config/saml_attributes

# Set proper permissions
chmod 755 /home/setrock/logs
chmod 755 /home/setrock/satosa-config
chmod 755 /home/setrock/satosa-config/saml_attributes

# Set permissions for certificates
chmod 600 /home/setrock/keys/saml/*.pem
chmod 644 /home/setrock/keys/saml/*.pem
chmod 600 /home/setrock/keys/oidc/*.pem

# Create log files with proper permissions
touch /home/setrock/logs/satosa-debug.log
touch /home/setrock/logs/satosa-error.log
touch /home/setrock/logs/satosa-info.log
chmod 644 /home/setrock/logs/*.log

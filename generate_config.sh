#!/bin/bash

# Script to generate the actual SATOSA configuration with real encryption keys
# This script reads the template and replaces placeholders with actual values

echo "Generating SATOSA configuration with real encryption keys..."

# Check if required files exist
if [ ! -f "keys/state_encryption_key.txt" ]; then
    echo "Error: keys/state_encryption_key.txt not found. Run generate_certs.sh first."
    exit 1
fi

if [ ! -f "keys/sub_hash_salt.txt" ]; then
    echo "Error: keys/sub_hash_salt.txt not found. Run generate_certs.sh first."
    exit 1
fi

# Read the encryption keys
STATE_ENCRYPTION_KEY=$(cat keys/state_encryption_key.txt)
SUB_HASH_SALT=$(cat keys/sub_hash_salt.txt)

# Set default MIT Touchstone metadata URL (will be updated after approval)
MIT_TOUCHSTONE_METADATA_URL="https://okta.mit.edu/app/exkfuqmlzchKIVXFZ697/sso/saml/metadata"

# Generate the main configuration file
sed "s/\${SATOSA_STATE_ENCRYPTION_KEY}/$STATE_ENCRYPTION_KEY/g" satosa-config/proxy_conf.yaml.template > satosa-config/proxy_conf.yaml

# Generate the OIDC frontend configuration
sed "s/\${SATOSA_SUB_HASH_SALT}/$SUB_HASH_SALT/g" satosa-config/plugins/openid_connect_frontend.yaml.template > satosa-config/plugins/openid_connect_frontend.yaml

# Generate the SAML backend configuration
sed "s/\${MIT_TOUCHSTONE_METADATA_URL}/$MIT_TOUCHSTONE_METADATA_URL/g" satosa-config/plugins/saml2_backend.yaml.template > satosa-config/plugins/saml2_backend.yaml

echo "Configuration files generated successfully!"
echo "Files generated:"
echo "- satosa-config/proxy_conf.yaml"
echo "- satosa-config/plugins/openid_connect_frontend.yaml"
echo "- satosa-config/plugins/saml2_backend.yaml"
echo ""
echo "IMPORTANT: Do not commit these files to version control!"
echo "Only commit the template files:"
echo "- satosa-config/proxy_conf.yaml.template"
echo "- satosa-config/plugins/openid_connect_frontend.yaml.template"
echo "- satosa-config/plugins/saml2_backend.yaml.template"
echo ""
echo "After getting MIT Touchstone approval, update the metadata URL in:"
echo "satosa-config/plugins/saml2_backend.yaml" 
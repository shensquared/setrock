#!/usr/bin/env python3
import os
import sys

# Add the satosa package to the path
sys.path.insert(0, '/home/setrock/satosa-env/lib/python3.11/site-packages')

from satosa.satosa_config import SATOSAConfig
from satosa.proxy_server import SATOSA

# Load the configuration
config_file = '/home/setrock/setrock/satosa-config/proxy_conf.yaml'
config = SATOSAConfig(config_file)

# Create the SATOSA application
app = SATOSA(config)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
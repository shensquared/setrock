# see:
# https://nickx.hu/posts/2020-07-13-matrix-synapse-shibboleth-saml.html
# https://pysaml2.readthedocs.io/en/latest/howto/config.html#attribute-map-dir

# If this can be any Python code, then let us compute the inverse instead of rewriting

__map_to = {
    'eduPersonPrincipalName': 'urn:oid:1.3.6.1.4.1.5923.1.1.1.6',
    'mail': 'urn:oid:0.9.2342.19200300.100.1.3',
    'displayName': 'urn:oid:2.16.840.1.113730.3.1.241',
    'givenName': 'urn:oid:2.5.4.42', # first name
    'sn': 'urn:oid:2.5.4.4', # last name
    'eduPersonAffiliation': 'urn:oid:1.3.6.1.4.1.5923.1.1.1.1',
    'eduPersonPrimaryAffiliation': 'urn:oid:1.3.6.1.4.1.5923.1.1.1.5',
    'eduPersonScopedAffiliation': 'urn:oid:1.3.6.1.4.1.5923.1.1.1.9',
    'eduPersonNickname': 'urn:oid:1.3.6.1.4.1.5923.1.1.1.2', # legacy, should point to displayName
    
    # these are custom for MIT, and the reason why we are specifying the attribute map
    'mitDisplayFirstMiddle': 'urn:oid:1.2.840.113554.1.4.1.1.24',
    'mitDisplayLastSuffix': 'urn:oid:1.2.840.113554.1.4.1.1.25'
}

MAP = {
    'identifier': 'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
    'to': __map_to,
    'fro': {v:k for k,v in __map_to.items()},
}
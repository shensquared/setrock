# PetRock

[Petrock](https://petrock.mit.edu/) is an authentication service that allows for MIT students to quickly add Touchstone authentication to their website. It is an student-made replacement for the now defunct MIT OIDC Pilot ([oidc.mit.edu](https://oidc.mit.edu)) service.

## Who is this service for?

- MIT students creating web services for the MIT community
- MIT clubs and organizations that want to add Touchstone authentication to their backend services

## Why not use other MIT auth services?

Currently if you are a student developer creating individual web applications at MIT, the main way of getting user authentication for your website is through [Shibboleth](http://kb.mit.edu/confluence/display/istcontrib/Touchstone+FAQ). 

Most official MIT applications do use Shibboleth, but the [set up guide](https://wikis.mit.edu/confluence/display/TOUCHSTONE/Provisioning+Steps) for Shibboleth can be cumbersome and confusing if you are not familiar with the protocol. Also, the simplest way to set it up requires using Apache or building a custom version of Nginx from source, which may not always be preferable.

**So why OIDC?**

Petrock models itself after `oidc.mit.edu`, which was an another MIT authentication service that uses the [OpenID Connect](https://www.pingidentity.com/en/resources/identity-fundamentals/authentication-authorization-standards/openid-connect.html) protocol. OIDC is an open-source protocol that has widespread library support across many different programming languages. In addition, we believe it's easier to use and understand for student web developers. OIDC is also used in other authentication services like [Shimmer](https://shimmer.csail.mit.edu/) (operated by CSAIL) that powers most of Course 6 websites and CSAIL services.

In addition, the Petrock project will be continually supported by **SIPB**, which is a student club responsible for other dependable services like: [Hydrant](http://hydrant.mit.edu/), [Courseroad](https://courseroad.mit.edu/road/$defaultroad$), and [Scripts](https://scripts.mit.edu/).

## I'm currently using `oidc.mit.edu`, how do I switch to Petrock?

Depending on what library/ custom code you're using to support the OpenID Connect protocol, the main changes would be with editing your configuration to use Petrock endpoints instead of the old OIDC Pilot endpoints.

First, you'll need to email us at `petrock@mit.edu`, and provide the following information:

- Name of your web service
- List of redirect URL(s) that can receive successful authentication response
  - These should be the server endpoint(s) that is able to receive the authentication `code` after a successful user login
  - We allow for multiple in case you have multiple servers (e.g., a testing + production) running the same service

For example, given a service like [SIPB DormDigest](https://dormdigest.mit.edu/), we would have:

- Name of your web service: `DormDigest`
- List of redirect URL(s):
  - `https://dormdigest.mit.edu/oidc-response`,
  - `https://dormdigest.xvm.mit.edu/oidc-response`


We'll then email you back with:

- a `client_id` (safe to store in Github + publicly)
- a `client_secret` (MUST BE KEPT SECRET)


With this information, you should edit your configuration such that:

1. `client_id` and `client_secret`:
   1. Replace with corresponding values we gave you
2. OIDC Authority URI:
   1. Replace `https://oidc.mit.edu` with `https://petrock.mit.edu`
3. Token Issuer:
   1. Replace `https://oidc.mit.edu/` with `https://petrock.mit.edu` (no trailing slash)
4. Auth endpoint:
   1. Replace `/authorize` with `/touchstone/oidc/authorization`
5. Token endpoint:
   1. Replace `/token` wit `/oidc/token`
6. Public key endpoint:
   1. Replace `/jwk` with `/oidc/jwks`

For step 4-6, you might need to specify the full URL, so for example you might be going from:

 - `https://oidc.mit.edu/authorize` 
 - to `https://petrock.mit.edu/touchstone/oidc/authorization`

Once you restart your services with these changes, you should now be able to authenticate using Petrock.

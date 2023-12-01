# Petrock

[Petrock](https://petrock.mit.edu/) is an authentication service that allows for MIT students to quickly add Touchstone authentication to their website. It is an student-made replacement for the now defunct MIT OIDC Pilot ([oidc.mit.edu](https://oidc.mit.edu)) service.

## Who is this service for?

- MIT students creating web services for the MIT community
- MIT clubs and organizations that want to add Touchstone authentication to their services

## Why not use other MIT auth services?

Currently if you are a student developer creating individual web applications at MIT, the main way of getting user authentication for your website is through [Shibboleth](http://kb.mit.edu/confluence/display/istcontrib/Touchstone+FAQ). 

Most official MIT applications do use Shibboleth, but the [set up guide](https://wikis.mit.edu/confluence/display/TOUCHSTONE/Provisioning+Steps) for Shibboleth can be cumbersome and confusing if you are not familiar with the protocol. Also, the simplest way to set it up requires using Apache or building a custom version of Nginx from source, which may not always be preferable.

**So why OIDC?**

Petrock models itself after `oidc.mit.edu`, which was an another MIT authentication service that uses the [OpenID Connect](https://www.pingidentity.com/en/resources/identity-fundamentals/authentication-authorization-standards/openid-connect.html) protocol. OIDC is an open-source protocol that has widespread library support across many different programming languages. In addition, we believe it's easier to use and understand for student web developers. OIDC is also used in other authentication services like [Shimmer](https://shimmer.csail.mit.edu/) (operated by CSAIL) that powers most of Course 6 websites and CSAIL services.

In addition, the Petrock project will be continually supported by **SIPB**, which is a student club responsible for other dependable services like: [Hydrant](http://hydrant.mit.edu/), [Courseroad](https://courseroad.mit.edu/road/$defaultroad$), and [Scripts](https://scripts.mit.edu/).

## I'm currently using `oidc.mit.edu`, how do I switch to Petrock?

Depending on what library/ custom code you're using to support the OpenID Connect protocol, the main changes would be with editing your configuration to use Petrock endpoints instead of the old OIDC Pilot endpoints.

First, you'll need to fill out a Google Form [here](https://forms.gle/ErvvM91sh2DVTgEg7), and provide the following information:

- Name of your web service
- The purpose of your web service
- A primary contact email
- List of redirect URL(s) that can receive successful authentication response
  - These should be the server endpoint(s) that is able to receive the authentication `code` after a successful user login
  - We allow for multiple in case you have multiple servers (e.g., a testing + production) running the same service

For example, given a service like [SIPB DormDigest](https://dormdigest.mit.edu/), we would have:

- Name: `DormDigest`
- Purpose: `DormDigest automatically parses dormspam emails by type onto a web calendar, and we require authentication to login to protect the privacy of students emails.`
- Contact email: `sipb-dormdigest-admin@mit.edu`
- List of redirect URL(s):
  - `https://dormdigest.mit.edu/oidc-response`,
  - `https://dormdigest.xvm.mit.edu/oidc-response`

We'll then email you at your contact email with:

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
   1. Replace `/token` with `/oidc/token`
6. User Info endpoint:
   1. Replace `/userinfo` with `/oidc/userinfo`
7. Public key endpoint:
   1. Replace `/jwk` with `/oidc/jwks`
8. OIDC scopes
   1. Make sure it includes `openid`, `email`, and `profile` 
   2. Ex. `openid email profile`

For step 4-6, you might need to specify the full URL, so for example you might be going from:

 - `https://oidc.mit.edu/authorize` 
 - to `https://petrock.mit.edu/touchstone/oidc/authorization`

Once you restart your services with these changes, you should now be able to authenticate using Petrock.

## I'm creating a new web application, how can I start?

Depending on your choice of language/web frameworks, there are a number of official and non-official [OIDC libraries](https://openid.net/developers/certified-openid-connect-implementations/) that you can use. Because OIDC is built on top of OAuth 2.0 protocol, for Next.js projects, you can even try to use the built-in [OAuth support](https://next-auth.js.org/configuration/providers/oauth) and add some custom handler functions to make it work with OpenID Connect.

For Petrock, we provide a **web application template** (found at [`auth_client`](./auth_client/)) that implements support for OIDC protocol, and is comprised of two components:

1. A React.js frontend (running Node 16)
2. A Express.js backend

An example website running this web template can be found at: <https://unofficial-oidc-client.xvm.mit.edu/>

This web application template was designed with security and flexibility in mind (see the [Security Design](https://github.com/sipb/petrock/blob/main/auth_client/README.md#security-design) section). It is intended to be used by MIT students who wants to quickly spin up a web project that has built-in support for MIT Touchstone authentication via Petrock. It has minimal design choices baked-in as to allow students ease-of-use in adapting the template to their needs.

The template README also provides guidance + information on important aspects of building a secure web application (such as session management, certificates, hosting) that will be important to *all* web projects that want to support OIDC authentication. 

For example, a version of this template is used in the [SIPB DormDigest](https://dormdigest.mit.edu/login) project ([Source Code](https://github.com/sipb/dormdigest-frontend)).

## What information do I get about a user?

Given a user's access token (see [this guide](https://developer.okta.com/blog/2019/10/21/illustrated-guide-to-oauth-and-oidc) if you're unsure what that is), you can query Petrock's user info endpoint at `https://petrock.mit.edu/oidc/userinfo`. The access token will need to be provided in the HTTP Authorization header using the Bearer scheme ([see](https://swagger.io/docs/specification/authentication/bearer-authentication/)).

Assuming you set your OIDC scopes as described above (with `openid`, `email`, and `profile`), you will be able to get back a JSON with the following keys:

- `sub` - Unique user ID (equivalent to `email`)
- `email` - Student email
- `affiliation` - MIT primary affiliation (ex. `student`) 
- `name` - Full name
- `given_name` - First name
- `family_name` - Surname or family name

For example, it may look something like this:

```json
{
   "sub":"ben@mit.edu",
   "email":"ben@mit.edu",
   "affiliation":"student",
   "name":"Ben Bunsen Bitdiddle",
   "given_name":"Ben",
   "family_name":"Bitdiddle"
}
```


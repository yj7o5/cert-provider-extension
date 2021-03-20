## Raven Studio Manager

Raven studio to link all clusters under one app and removing the need for requiring certificates

> Note: The code isn't the best. Right now in the process of writing a POC and prototype.

### Goal

Act as a proxy-in-the-middle self-signed certificate to authenticate between client and raven-studio while use the actual certificate between raven studio and the server.

### High Level Items
- [ ] User database access managment
- [ ] External login extension points (Google oAuth, Azure Active Directory, AWS Directory Service, Windows Active Directory, etc)
- [ ] "A remote desktop manager" like UI but that is as aesthetic looking as possible

### Tasks

- [x] Setup cloud Raven instance for testing
- [x] Setup a proxy service that authenticates client via self-signed and proxy to raven via actual pks certificate

- [x] Setup a dumb https site to use for quick testing with certs i.e. having the browser request for certificate
- [x] Create the proxy service to re-route all the requests to upstream server and tack on the client certificate
- [ ] Create a simple tabbed interface for viewing multiple windows simultanously across different servers and clusters
